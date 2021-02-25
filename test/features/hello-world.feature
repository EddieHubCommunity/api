Feature: Hello World

  Scenario: Say Hello!
    When make a GET Request to "/"
    Then the response status code should be "200"
    And the response should be "Welcome to EddieHub"
