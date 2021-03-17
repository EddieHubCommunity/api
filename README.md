<p align="center">
  <img src="https://socialify.git.ci/EddieJaoudeCommunity/api/image?description=1&font=KoHo&logo=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F66388388%3Fs%3D200%26v%3D4&owner=1&pattern=Signal&theme=Light" alt="api" width="640" height="320" />
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">
<img src="https://img.shields.io/badge/License-MIT-brightgreen" alt="License" />
<img alt="GitHub issues" src="https://img.shields.io/github/issues/EddieJaoudeCommunity/api">
<img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/EddieJaoudeCommunity/api">
<a href="https://discord.gg/jZQs6Wu" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<img alt="GitHub forks" src="https://img.shields.io/github/forks/EddieJaoudeCommunity/api?style=social">
<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/EddieJaoudeCommunity/api?style=social">
</p>

## Description

An API to manage our community data

## Rules

- Commits follow the standard [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/)
- Branches should be named as `issue-<issue no>` (e.g. [NestJs](https://github.com/EddieJaoudeCommunity/api/issues/12) issue number is 12)

## Installation

```bash
$ npm install
```

Create a `.env` file in the project root folder, with the following content

```
MONGODB_CONNECTION_STRING=<Connection URI>
MONGODB_DATABASE=<Database name>
MONGODB_DATABASE_TEST=<Database name>
```

## Running the app locally

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Running the app via Docker

1. `docker run -p 3000:3000 -d ghcr.io/eddiehubcommunity/api:latest`
2. Visit `http://localhost:3000/`

## License

[MIT licensed](LICENSE).
