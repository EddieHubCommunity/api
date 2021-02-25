Feature: Discord Module

  Scenario: Get List of Users
    When make a GET Request to "/Discord"
    Then the response status code should be "200"
    And the response should be "[]"


  Scenario: Add a New User
    When make a POST Request to "/Discord"
    Then the response status code should be "201"
    And the response should be "User added successfully!"

