Feature: discord module


    Scenario: add a new user
        Given authorisation
        And make a POST request to "/discord" with:
            | bio      | "This is a GitHub Campus Expert"                                                              |
            | username | "khattakdev"                                                                                  |
            | socials  | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
        Then the response status code should be 201
        And the response should contain:
            | documentId | "TYPE:ID" |

    Scenario: get list of users
        Given authorisation
        And make a POST request to "/discord" with:
            | bio      | "This is a GitHub Campus Expert"                                                              |
            | username | "khattakdev"                                                                                  |
            | socials  | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
        Then the response should contain:
            | documentId | "TYPE:ID" |
        When make a GET request to "/discord"
        Then the response status code should be 200
        And the response in item where field "username" is equal to "khattakdev" should contain:
            | bio       | "This is a GitHub Campus Expert"                                                              |
            | username  | "khattakdev"                                                                                  |
            | socials   | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
            | updatedOn | "TYPE:DATE"                                                                                   |
            | createdOn | "TYPE:DATE"                                                                                   |

    Scenario: add an empty user
        Given authorisation
        And make a POST request to "/discord" with:
            | test | "test" |
        Then the response status code should be 400
        And the response should contain:
            | statusCode | 400           |
            | error      | "Bad Request" |
        And the response property "message" has items:
            | username must be a string    |
            | username should not be empty |

    Scenario: update a user
        Given authorisation
        And make a POST request to "/discord" with:
            | bio      | "This is a GitHub Campus Expert"                                                              |
            | username | "khattakdev"                                                                                  |
            | socials  | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
        Then the response should contain:
            | documentId | "TYPE:ID" |
        When make a PUT request to "/discord/{id}" with:
            | bio      | "Updated user bio"        |
            | username | "updated-user"            |
            | socials  | {"discord":"update-user"} |
        Then the response status code should be 200
        And the response should contain:
            | documentId | "TYPE:ID" |

    Scenario: delete a user
        Given authorisation
        And make a POST request to "/discord" with:
            | bio      | "This is a GitHub Campus Expert"                                                              |
            | username | "khattakdev"                                                                                  |
            | socials  | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
        Then the response should contain:
            | documentId | "TYPE:ID" |
        When make a DELETE request to "/discord/{id}"
        Then the response status code should be 204

    Scenario: delete non-existing user
        Given authorisation
        And make a POST request to "/discord" with:
            | bio      | "This is a GitHub Campus Expert"                                                              |
            | username | "khattakdev"                                                                                  |
            | socials  | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
        Then the response should contain:
            | documentId | "TYPE:ID" |
        When make a DELETE request to "/discord/321"
        Then the response status code should be 404
        And the response should contain:
            | statusCode | 404                                |
            | message    | "no discord-profile for 321 found" |



    Scenario: get users with authenticated request
        Given authorisation
        And make a POST request to "/discord" with:
            | bio      | "This is a GitHub Campus Expert"                                                              |
            | username | "khattakdev"                                                                                  |
            | socials  | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
        Then the response should contain:
            | documentId | "TYPE:ID" |
        When make a GET request to "/discord/{id}"
        Then the response status code should be 200
        And the response should contain:
            | bio       | "This is a GitHub Campus Expert"                                                              |
            | username  | "khattakdev"                                                                                  |
            | socials   | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
            | updatedOn | "TYPE:DATE"                                                                                   |
            | createdOn | "TYPE:DATE"                                                                                   |


    Scenario: create a user without authorization
        Given make a POST request to "/discord" with:
            | bio      | "This is a GitHub Campus Expert"                                                              |
            | username | "khattakdev"                                                                                  |
            | socials  | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
        Then the response status code should be 401
        And the response should contain:
            | statusCode | 401            |
            | message    | "Unauthorized" |
