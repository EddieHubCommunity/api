@hello
Feature: hello world

    Scenario: welcome message
        When make a GET request to "/"
        Then the response status code should be 200
        # And the response should be "Welcome to EddieHub! Currently running version: v0.0.0"
