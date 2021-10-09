@discord
Feature: discord module

    Scenario: add a new user
        Given authorization with "writing" permission
        And make a POST request to "/discord" with:
            | bio     | "This is a GitHub Campus Expert"                                                              |
            | author  | {"platform":"discord","uid":"hubber"}                                                         |
            | socials | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
        Then the response status code should be 201
        And the response should contain:
            | documentId | "hubber" |

    Scenario: get list of users
        Given authorization with "writing" permission
        And make a POST request to "/discord" with:
            | bio     | "This is a GitHub Campus Expert"                                                              |
            | author  | {"platform":"discord","uid":"hubber"}                                                         |
            | socials | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
        Then the response should contain:
            | documentId | "hubber" |
        Given authorization with "reading" permission
        When make a GET request to "/discord"
        Then the response status code should be 200
        And the response in item where property "author" has a subobject "uid" which contains a field that is equal to "hubber" should contain:
            | bio       | "This is a GitHub Campus Expert"                                                              |
            | author    | {"platform":"discord","uid":"hubber"}                                                         |
            | socials   | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
            | updatedOn | "TYPE:DATE"                                                                                   |
            | createdOn | "TYPE:DATE"                                                                                   |

    Scenario: add an empty user
        Given authorization with "writing" permission
        And make a POST request to "/discord" with:
            | test | "test" |
        Then the response status code should be 400
        And the response should contain:
            | statusCode | 400           |
            | error      | "Bad Request" |
        And the response property "message" has items:
            | author should not be empty |

    Scenario: update a user
        Given authorization with "writing" permission
        And make a POST request to "/discord" with:
            | bio     | "This is a GitHub Campus Expert"                                                              |
            | author  | {"platform":"discord","uid":"hubber"}                                                         |
            | socials | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
        Then the response should contain:
            | documentId | "hubber" |
        Given authorization with "writing" permission
        When set header "User-Uid" with value "hubber"
        Then make a Patch request to "/discord/hubber" with:
            | author  | {"platform":"discord","uid":"hubby"} |
            | bio     | "Updated user bio"                   |
            | socials | {"discord":"update-user"}            |
        Given authorization with "reading" permission
        When make a GET request to "/discord/hubber"
        Then the response status code should be 200
        And the response should contain:
            | bio       | "Updated user bio"                                                                             |
            | author    | {"platform":"discord","uid":"hubby"}                                                           |
            | socials   | {"discord":"update-user","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
            | updatedOn | "TYPE:DATE"                                                                                    |
            | createdOn | "TYPE:DATE"                                                                                    |

    Scenario: update a user with wrong author
        Given authorization with "writing" permission
        And make a POST request to "/discord" with:
            | bio     | "This is a GitHub Campus Expert"                                                              |
            | author  | {"platform":"discord","uid":"hubber"}                                                         |
            | socials | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
        Then the response should contain:
            | documentId | "hubber" |
        Given authorization with "writing" permission
        When make a Patch request to "/discord/hubber" with:
            | author  | {"platform":"discord","uid":"hubby"} |
            | bio     | "Updated user bio"                   |
            | socials | {"discord":"update-user"}            |
        Then the response status code should be 400
        And the response should contain:
            | statusCode | 400                                   |
            | message    | "update failed: author doesn't match" |

    Scenario: delete a user
        Given authorization with "writing" permission
        And make a POST request to "/discord" with:
            | bio     | "This is a GitHub Campus Expert"                                                              |
            | author  | {"platform":"discord","uid":"hubber"}                                                         |
            | socials | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
        Then the response should contain:
            | documentId | "hubber" |
        Given authorization with "writing" permission
        Then set header "User-Uid" with value "hubber"
        When make a DELETE request to "/discord/hubber"
        Then the response status code should be 204

    Scenario: delete a user with wrong author
        Given authorization with "writing" permission
        And make a POST request to "/discord" with:
            | bio     | "This is a GitHub Campus Expert"                                                              |
            | author  | {"platform":"discord","uid":"hubber"}                                                         |
            | socials | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
        Then the response should contain:
            | documentId | "hubber" |
        Given authorization with "writing" permission
        When make a DELETE request to "/discord/hubber"
        Then the response status code should be 400
        And the response should contain:
            | statusCode | 400                                     |
            | message    | "deletion failed: author doesn't match" |

    Scenario: delete non-existing user
        Given authorization with "writing" permission
        When make a DELETE request to "/discord/321"
        Then the response status code should be 404
        And the response should contain:
            | statusCode | 404                                |
            | message    | "no discord-profile for 321 found" |

    Scenario: get user with authenticated request
        Given authorization with "writing" permission
        And make a POST request to "/discord" with:
            | bio     | "This is a GitHub Campus Expert"                                                              |
            | author  | {"platform":"discord","uid":"hubber"}                                                         |
            | socials | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
        Then the response should contain:
            | documentId | "hubber" |
        Given authorization with "reading" permission
        When make a GET request to "/discord/hubber"
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

    Scenario: create a user with wrong permissions
        Given authorization with "reading" permission
        And make a POST request to "/discord" with:
            | bio     | "This is a GitHub Campus Expert"                                                              |
            | author  | {"platform":"discord","uid":"hubber"}                                                         |
            | socials | {"discord":"khattakdev","github":"khattakdev","linkedin":"khattakdev","twitter":"khattakdev"} |
        Then the response status code should be 403
        And the response should contain:
            | statusCode | 403         |
            | message    | "Forbidden" |
