@discord
Feature: discord module

    Scenario: add a new user
        Given authorisation
        And make a POST request to "/discord" with:
            | bio     | "This is a GitHub Campus Expert"                                                              |
            | author  | {"platform":"discord","uid":"hubber"}                                                         |
            | socials | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
        Then the response status code should be 201
        And the response should contain:
            | documentId | "TYPE:ID" |

    Scenario: get list of users
        Given authorisation
        And make a POST request to "/discord" with:
            | bio     | "This is a GitHub Campus Expert"                                                              |
            | author  | {"platform":"discord","uid":"hubber"}                                                         |
            | socials | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
        Then the response should contain:
            | documentId | "TYPE:ID" |
        When make a GET request to "/discord"
        Then the response status code should be 200
        And the response in item where property "author" has a subobject "uid" which contains a field that is equal to "hubber" should contain:
            | bio       | "This is a GitHub Campus Expert"                                                              |
            | author    | {"platform":"discord","uid":"hubber"}                                                         |
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
            | author should not be empty |

    Scenario: update a user
        Given authorisation
        And make a POST request to "/discord" with:
            | bio     | "This is a GitHub Campus Expert"                                                              |
            | author  | {"platform":"discord","uid":"hubber"}                                                         |
            | socials | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
        Then the response should contain:
            | documentId | "TYPE:ID" |
        When set header "User-Uid" with value "hubber"
        Then make a PUT request to "/discord/{id}" with:
            | author  | {"platform":"discord","uid":"hubby"} |
            | bio     | "Updated user bio"                   |
            | socials | {"discord":"update-user"}            |
        When make a GET request to "/discord/{id}"
        Then the response status code should be 200
        And the response should contain:
            | bio       | "Updated user bio"                                                                             |
            | author    | {"platform":"discord","uid":"hubby"}                                                           |
            | socials   | {"discord":"update-user","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
            | updatedOn | "TYPE:DATE"                                                                                    |
            | createdOn | "TYPE:DATE"                                                                                    |

    Scenario: update a user with wrong author
        Given authorisation
        And make a POST request to "/discord" with:
            | bio     | "This is a GitHub Campus Expert"                                                              |
            | author  | {"platform":"discord","uid":"hubber"}                                                         |
            | socials | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
        Then the response should contain:
            | documentId | "TYPE:ID" |
        When make a PUT request to "/discord/{id}" with:
            | author  | {"platform":"discord","uid":"hubby"} |
            | bio     | "Updated user bio"                   |
            | socials | {"discord":"update-user"}            |
        Then the response status code should be 400
        And the response should contain:
            | statusCode | 400                                   |
            | message    | "update failed: author doesn't match" |

    Scenario: delete a user
        Given authorisation
        And make a POST request to "/discord" with:
            | bio     | "This is a GitHub Campus Expert"                                                              |
            | author  | {"platform":"discord","uid":"hubber"}                                                         |
            | socials | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
        Then the response should contain:
            | documentId | "TYPE:ID" |
        Then set header "User-Uid" with value "hubber"
        When make a DELETE request to "/discord/{id}"
        Then the response status code should be 204

    Scenario: delete a user with wrong author
        Given authorisation
        And make a POST request to "/discord" with:
            | bio     | "This is a GitHub Campus Expert"                                                              |
            | author  | {"platform":"discord","uid":"hubber"}                                                         |
            | socials | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
        Then the response should contain:
            | documentId | "TYPE:ID" |
        When make a DELETE request to "/discord/{id}"
        Then the response status code should be 400
        And the response should contain:
            | statusCode | 400                                     |
            | message    | "deletion failed: author doesn't match" |

    Scenario: delete non-existing user
        Given authorisation
        When make a DELETE request to "/discord/321"
        Then the response status code should be 404
        And the response should contain:
            | statusCode | 404                                |
            | message    | "no discord-profile for 321 found" |

    Scenario: get user with authenticated request
        Given authorisation
        And make a POST request to "/discord" with:
            | bio     | "This is a GitHub Campus Expert"                                                              |
            | author  | {"platform":"discord","uid":"hubber"}                                                         |
            | socials | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
        Then the response should contain:
            | documentId | "TYPE:ID" |
        When make a GET request to "/discord/{id}"
        Then the response status code should be 200
        And the response should contain:
            | bio       | "This is a GitHub Campus Expert"                                                              |
            | author    | {"platform":"discord","uid":"hubber"}                                                         |
            | socials   | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
            | updatedOn | "TYPE:DATE"                                                                                   |
            | createdOn | "TYPE:DATE"                                                                                   |

    Scenario: create a user without authorization
        Given make a POST request to "/discord" with:
            | bio     | "This is a GitHub Campus Expert"                                                              |
            | author  | {"platform":"discord","uid":"hubber"}                                                         |
            | socials | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
        Then the response status code should be 401
        And the response should contain:
            | statusCode | 401            |
            | message    | "Unauthorized" |
