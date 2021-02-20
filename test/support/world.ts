import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { setWorldConstructor } from '@cucumber/cucumber';

// const history = {};

class World {

    private mocks = [];
    private headers = new Set();
    private body = {};
    private history = {};
    public agent: any;

    constructor() {

        // @TODO: move to Before
        async function fun () {
            const moduleFixture: TestingModule = await Test.createTestingModule({
                imports: [AppModule],
            }).compile();

            const app: INestApplication = moduleFixture.createNestApplication();
            return await app.init();

        }

        new Promise(request(fun().getHttpServer())).then((agent) => this.agent);
        this.mocks = [];
        // this.headers = new Set();
        this.history = history;
        this.body = {};
    }

    setMock(mock) {
        this.mocks = [...this.mocks, mock];
    }

    setHeader(name, value) {
        this.headers.add({ name, value });
    }

    parseTemplateString(string) {
        let template = string.match(/{{\s?(\S*)\s?}}/);

        if (template instanceof Array) {
            let history;
            let target = template[1].split('.');
            let request = target.shift();
            let parts = request.match(/\[(\d+)\]/);

            if (parts) {
                history = this.getHistory(request.replace(parts[0], ''), parts[1] - 1);
            } else {
                history = this.getHistory(request)['response'];
            }

            target.forEach((field) => {
                let subArray = field.match(/\[(\d+)\]/);
                if (subArray) {
                    field = field.replace(subArray[0], '');
                    history = history[field][subArray[1] - 1];
                } else {
                    history = history[field];
                }
            });

            string = string.replace(template[0], history);
            string = this.parseTemplateString(string);
        }
        return string;
    }

    getHashes(data) {
        let cleaned = [];
        let rows = data.hashes();

        for (let row of rows) {
            for (let hash in row) {
                if (!row[hash] || row[hash] === '') {
                    delete row[hash];
                    continue;
                }

                row[hash] = this.parseTemplateString(row[hash]);

                const keywords = row[hash].match(/^([\S\s]*?)(NOW|TODAY|PASSWORD|NULL)(\((\S*)\))?$/);
                const keyword = keywords ? keywords[2] : row[hash];

                switch (keyword) {
                    case 'NULL':
                        delete row[hash];
                        continue;
                }

                try {
                    let parsed = JSON.parse(row[hash]);
                    row[hash] = parsed;
                } catch (ex) {
                }
            }
            cleaned = [...cleaned, row];
        }
        return cleaned;
    }

    getHistory(name, row?) {
        if (row !== undefined) {
            return this.history[name][row];
        }
        return this.history[name];
    }

    processResponse(res, storage) {
        if (this.mocks.length > 0) {
            this.mocks.forEach((mock) => mock.done());
        }

        const data = {
            status: res.statusCode,
            headers: res.headers,
            response: {},
        };

        try {
            data.response = JSON.parse(res.text);
        } catch (ex) {
            data.response = res.text || res.body;
        }

        if (storage) {
            this.history[storage] = data;
        }
    }

    performGet(endpoint, storage) {
        return new Promise((resolve, reject) => {
            const uri = this.parseTemplateString(endpoint);
            const request = this.agent.get(uri);

            this.headers.forEach((header: { name: string, value: string }) => request.set(header.name, header.value));
            request.expect((res) => this.processResponse(res, storage));
            request.end((err, res) => err ? reject(err) : resolve(res));
        });
    }
}

setWorldConstructor(World);
