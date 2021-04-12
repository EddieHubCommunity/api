Feature: discord module

  Scenario: get list of users
    Given make a GET request to "/discord"
    Then the response status code should be 200
    And the response should be "[]"

  Scenario: add a new user
    Given make a POST request to "/discord"
    Then the response status code should be 201
    And the response should be "User added successfully!"

  Scenario: add an empty user
    Given make a POST request without body to "/discord"
    Then the response status code should be 400
    And the response should contains:
      | statusCode | 400               |
      | message    | "Incomplete Data" |

  Scenario: update a user
    Given make a POST request to "/discord"
    When make a PUT request to "/discord" with an ID
    Then the response status code should be 200
    And the response should be "User updated successfully!"

  Scenario: delete a user
    Given make a POST request to "/discord"
    When make a DELETE request to "/discord" with an ID
    Then the response status code should be 200
    And the response should be "User deleted successfully!"



