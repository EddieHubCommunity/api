Feature: Discord Module

  Scenario: Get List of Users
    Given make a GET request to "/discord"
    Then the response status code should be "200"
    And the response should be "[]"


  Scenario: Add a New User
    Given make a POST request to "/discord"
    Then the response status code should be "201"
    And the response should be "User added successfully!"

  Scenario: Add an Empty User
    Given make a POST request without body to "/discord"
    Then the response status code should be "400"
    And the response should contains:
     | statusCode | message       |
     | 400        | "Incomplete Data"  | 
  
  Scenario: Update a User
    Given make a POST request to "/discord"
    When make a PUT request to "/discord" with an ID
    Then the response status code should be "200"
    And the response should be "User updated successfully!"
  
  Scenario: Delete a User
    Given make a POST request to "/discord"
    When make a DELETE request to "/discord" with an ID
    Then the response status code should be "200"
    And the response should be "User deleted successfully!"

  

