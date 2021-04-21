Feature: discord module

  Scenario: get list of users
    Given make a GET request to "/discord"
    Then the response status code should be 200
    And the response should be "[]"

  Scenario: add a new user
    Given authorisation
    And make a POST request to "/discord" with:
      | bio      | "This is a GitHub Campus Expert"                                                              |
      | username | "khattakdev"                                                                                  |
      | socials  | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
    Then the response status code should be 201
    And the response should contains:
      | bio       | "This is a GitHub Campus Expert"                                                              |
      | id        | 123                                                                                           |
      | username  | "khattakdev"                                                                                  |
      | socials   | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
      | updatedOn | "2021-01-01T00:00:00.000Z"                                                                    |
      | createdOn | "2021-01-01T00:00:00.000Z"                                                                    |

  Scenario: add an empty user
    Given authorisation
    And make a POST request to "/discord" with:
      | test | "test" |
    Then the response status code should be 400
    And the response should contains:
      | statusCode | 400               |
      | message    | "Incomplete Data" |

  Scenario: update a user
    Given authorisation
    And make a POST request to "/discord" with:
      | bio      | "Update user"             |
      | username | "update-user"             |
      | socials  | {"discord":"update-user"} |
    When make a PUT request to "/discord/123" with:
      | bio | "Updated user bio" |
    Then the response status code should be 200
    And the response should contains:
      | id        | 123                        |
      | bio       | "Updated user bio"         |
      | username  | "update-user"              |
      | socials   | {"discord":"update-user"}  |
      | updatedOn | "2021-01-01T00:00:00.000Z" |
      | createdOn | "2021-01-01T00:00:00.000Z" |

  Scenario: delete a user
    Given authorisation
    And make a POST request to "/discord" with:
      | bio      | "Delete user"             |
      | username | "delete-user"             |
      | socials  | {"discord":"delete-user"} |
    When make a DELETE request to "/discord/123"
    Then the response status code should be 200
    And the response should be "{}"

  Scenario: delete non-existing user
    Given authorisation
    And make a POST request to "/discord" with:
      | bio      | "Delete user"             |
      | username | "delete-user"             |
      | socials  | {"discord":"delete-user"} |
    When make a DELETE request to "/discord/321"
    Then the response status code should be 404
    And the response should contains:
      | statusCode | 404              |
      | message    | "User Not Found" |
