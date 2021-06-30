@hello
Feature: hello world

    Scenario: welcome message
        When make a GET request to "/"
        Then the response status code should be 200
        And the response should contain the Version
