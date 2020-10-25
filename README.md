# eddiecommunityapi

> API to manage our community data

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

### Required

- Mongo (can install with Docker using `docker run --name mongo -p 27017:27017 -d mongo`)
- Node & npm

### Getting up and running is as easy as 1, 2, 3

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/eddiecommunityapi
    npm install
    ```

3. Start your app

    ```
    npm run dev
    ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

Using Jest https://jestjs.io/docs/en/getting-started

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npx feathers generate service               # Generate a new Service
$ npx feathers generate hook                  # Generate a new Hook
$ npx feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
