import { Then } from '@cucumber/cucumber';
import { expect } from 'chai';

import { checkValues } from '../support/compare';

Then(/^there should be a (201|202|204|400|401|403|404) (?:response|error) from the "([^"]*)" request$/, async function (statusCode, historyName) {
    const history = this.getHistory(historyName);
    expect(history.status).to.equal(parseInt(statusCode));
    expect(history.response).to.be.empty;
});

Then(/^there should be a (200|400|413|500|503) (?:response|error) from the "([^"]*)" request that(?: has (?:a|an) "([^"]*)" field and row (\d+))? contains(?: an object called "([^"]*)" with)?:$/, async function (statusCode, historyName, expectedField, expectedRecord, expectedObject, expectedData) {
    const history = this.getHistory(historyName);
    expectedData = this.getHashes(expectedData);

    let targetObject = expectedField && expectedRecord ? history.response[expectedField][expectedRecord - 1] : history.response;

    if (expectedObject) {
        targetObject = targetObject[expectedObject];
    }

    await Promise.all([
        statusCode ? expect(history.status).to.equal(parseInt(statusCode)) : true,
        checkValues(expectedData[0], targetObject),
    ]);
});

Then(/^the response path "([^"]*)" from the "([^"]*)" request contains:/, async function (responsePath, historyName, expectedData) {
    const history = this.getHistory(historyName);
    expectedData = this.getHashes(expectedData);

    let response = history.response;
    response = responsePath.split('.').reduce((response, pathItem) => response[pathItem], response);
    if (response instanceof Array) {
        await Promise.all(expectedData.map((expected, idx) => checkValues(expected, response[idx])));
    } else {
        checkValues(expectedData[0], response);
    }
});

Then(/^the response path "([^"]*)" from the "([^"]*)" request contains rows:$/, async function (responsePath, historyName, expectedData) {
    const history = this.getHistory(historyName);
    expectedData = this.getHashes(expectedData);

    await expectedData.reduce((chain, next, idx) => chain.then(() => checkValues(next, history.response[responsePath][idx], `row "${idx + 1}" does not match`, false)), Promise.resolve());
});
