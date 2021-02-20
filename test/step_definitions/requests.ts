import { When } from '@cucumber/cucumber';

When(/^I make a (GET) request to the API endpoint "([^"]*)" as "([^"]*)"(?: with "([^"]*)" content type)?$/, async function (requestMethod, requestEndpoint, historyName, contentType) {
    this.setHeader('content-type', contentType ? contentType : 'application/json');
    await this.performGet(requestEndpoint, historyName);
});

When(/^I make an empty (POST) request to the API endpoint "([^"]*)" as "([^"]*)"$/, async function (requestMethod, requestEndpoint, historyName) {
    await this.performPost(requestEndpoint, null, historyName);
});

When(/^I append the object "([^"]*)" in the (POST) request to the API endpoint "([^"]*)" as "([^"]*)" using:$/, async function (field, requestMethod, requestEndpoint, historyName, requestData) {
    requestData = this.getHashes(requestData);
    await this.buildPost(field, requestEndpoint, requestData[0], historyName);
});

When(/^I send the (POST) request to the API endpoint "([^"]*)" as "([^"]*)"$/, async function (requestMethod, requestEndpoint, historyName) {
    await this.sendPost(requestEndpoint, historyName);
});

When(/^I make a (POST) request to the API endpoint "([^"]*)" as "([^"]*)" using:$/, async function (requestMethod, requestEndpoint, historyName, requestData) {
    requestData = this.getHashes(requestData);
    await this.performPost(requestEndpoint, requestData[0], historyName);
});
