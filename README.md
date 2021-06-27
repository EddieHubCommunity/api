<p align="center">
  <img src="https://socialify.git.ci/EddieHubCommunity/api/image?description=1&font=KoHo&logo=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F66388388%3Fs%3D200%26v%3D4&owner=1&pattern=Signal&theme=Light" alt="api" width="640" height="320" />
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">
<img src="https://img.shields.io/badge/License-MIT-brightgreen" alt="License" />
<img alt="GitHub issues" src="https://img.shields.io/github/issues/EddieHubCommunity/api">
<img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/EddieHubCommunity/api">
<a href="https://discord.gg/jZQs6Wu" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<img alt="GitHub forks" src="https://img.shields.io/github/forks/EddieHubCommunity/api?style=social">
<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/EddieHubCommunity/api?style=social">
</p>

Stargate - sign up with GitHub login for [FREE on DataStax Stargate](http://links.eddiejaoude.io/t/CiEQRydj4GdT) and get a NoSQL DB up in minutes with approximately `30 million reads, 5 million writes, and 40GB of storage per month for free` (Docker container also available)

## Description

An API to manage our community data

## Rules

- Commits follow the standard [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/)
- Branches should be named as `issue-<issue no>` (e.g. [NestJs](https://github.com/EddieHubCommunity/api/issues/12) issue number is 12)

## Requirements

- docker
- node
- npm

## Installation

```bash
$ npm install
```

## Running the app locally
For connecting to Datastax Astra or a local stargate docker container the `nestjs-astra`-package is required. Its hosted in the Github-Package-Repository. For this reason you need to add the following sample to your local `.npmrc`.
```
//npm.pkg.github.com/:_authToken=<Your personal Token>
```
The Token can be generated in Github and needs the permission `package - read`. After this step you can run `npm install` as usual.

```bash
# database
$ docker-compose up
```

*OR manually with docker `docker pull stargateio/stargate-3_11:v1.0.25`*

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Swagger docs

1. start the app `npm start`
2. visit `http://localhost:3000/swagger`

Official docs at https://docs.nestjs.com/openapi/introduction

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Logging

Logging can be turned on by settings an environmentvariable `DEBUG=true`
If this variables is not true or undefiend no Logs will be made.

When set to `true` the App will Log every incoming request.

## Authentication

Authentication is handled via an environment-variable called `APPROVED_TOKENS`.
The approved tokens which are validated by the API are put there.
In case there should be multiple tokens, for multiple clients, they need to be **comma-seperated**.

To use Authentication the token needs to be passed in the `token`-header of the client-request.

## Docker

### Build the Docker container

1. `docker build -t eddiehub-api .`
1. `docker run -p 3000:3000 -d eddiehub-api`
1. Visit `http://localhost:3000/`

## Running the app via Docker on GitHub Container Registry

1. `docker run -p 3000:3000 -d ghcr.io/eddiehubcommunity/api:latest`
1. Visit `http://localhost:3000/`

## License

[MIT licensed](LICENSE).

## MADE WITH :heart: BY EDDIEHUBBERS :sparkles::sparkles:
