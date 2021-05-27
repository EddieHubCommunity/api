Feature: Standup-module

    Scenario: add a new standup
        Given authorisation
        And make a POST request to "/standup" with:
            | author           | {"platform":"discord","uid":"hubber"} |
            | yesterdayMessage | "Yesterday I did this"                |
            | todayMessage     | "Today I'll do this"                  |
        Then the response status code should be 201
        And the response should contain:
            | documentId | "TYPE:ID" |

    Scenario: search existing standup
        Given authorisation
        And make a POST request to "/standup" with:
            | author           | {"platform":"discord","uid":"hubber"} |
            | yesterdayMessage | "Yesterday I did this"                |
            | todayMessage     | "Today I'll do this"                  |
        Then the response should contain:
            | documentId | "TYPE:ID" |
        Then  make a GET request to "/standup/search?uid=hubber"
        Then the response status code should be 200
        And the response in item where field "todayMessage" is equal to "Today I'll do this" should contain:
            | author           | {"platform":"discord","uid":"hubber"} |
            | todayMessage     | "Today I'll do this"                  |
            | yesterdayMessage | "Yesterday I did this"                |
            | createdOn        | "TYPE:DATE"                           |

    Scenario: search non-existing standup
        Given authorisation
        And make a POST request to "/standup" with:
            | author           | {"platform":"discord","uid":"hubber"} |
            | yesterdayMessage | "Yesterday I did this"                |
            | todayMessage     | "Today I'll do this"                  |
        Then the response should contain:
            | documentId | "TYPE:ID" |
        Then  make a GET request to "/standup/search?uid=benjamin"
        Then the response status code should be 200
        And  the response should be "{}"

    Scenario: provide no search context
        Given authorisation
        And make a POST request to "/standup" with:
            | author           | {"platform":"discord","uid":"hubber"} |
            | yesterdayMessage | "Yesterday I did this"                |
            | todayMessage     | "Today I'll do this"                  |
        Then the response should contain:
            | documentId | "TYPE:ID" |
        Then  make a GET request to "/standup/search"
        Then the response status code should be 400
        And  the response should contain:
            | statusCode | 400                             |
            | message    | "Please provide search context" |

    Scenario: add an empty standup
        Given authorisation
        And make a POST request to "/standup" with:
            | test | "test" |
        Then the response status code should be 400
        And the response should contain:
            | statusCode | 400           |
            | error      | "Bad Request" |
        And the response property "message" has items:
            | author should not be empty           |
            | yesterdayMessage should not be empty |
            | yesterdayMessage must be a string    |
            | todayMessage should not be empty     |
            | todayMessage must be a string        |

    Scenario: delete standup
        Given authorisation
        And make a POST request to "/standup" with:
            | author           | {"platform":"discord","uid":"hubber"} |
            | yesterdayMessage | "Yesterday I did this"                |
            | todayMessage     | "Today I'll do this"                  |
        Then the response should contain:
            | documentId | "TYPE:ID" |
        Then set header "User-Uid" with value "hubber"
        Then set header "Platform" with value "discord"
        Then make a DELETE request to "/standup/{id}"
        Then the response status code should be 204

    Scenario: delete standup with wrong credentials
        Given authorisation
        And make a POST request to "/standup" with:
            | author           | {"platform":"discord","uid":"hubber"} |
            | yesterdayMessage | "Yesterday I did this"                |
            | todayMessage     | "Today I'll do this"                  |
        Then the response should contain:
            | documentId | "TYPE:ID" |
        Then make a DELETE request to "/standup/{id}"
        Then the response status code should be 400
        And the response should contain:
            | statusCode | 400                                     |
            | message    | "deletion failed: author doesn't match" |

    Scenario: delete non-existent standup
        Given authorisation
        And make a POST request to "/standup" with:
            | author           | {"platform":"discord","uid":"hubber"} |
            | yesterdayMessage | "Yesterday I did this"                |
            | todayMessage     | "Today I'll do this"                  |
        Then the response should contain:
            | documentId | "TYPE:ID" |
        Then make a DELETE request to "/standup/66"
        Then the response status code should be 404
        And  the response should contain:
            | statusCode | 404                       |
            | message    | "no standup for 66 found" |

    Scenario: get standup with authenticated request
        Given authorisation
        And make a POST request to "/standup" with:
            | author           | {"platform":"discord","uid":"hubber"} |
            | yesterdayMessage | "Yesterday I did this"                |
            | todayMessage     | "Today I'll do this"                  |
        Then the response should contain:
            | documentId | "TYPE:ID" |
        When make a GET request to "/standup/{id}"
        Then the response status code should be 200
        And the response should contain:
            | author           | {"platform":"discord","uid":"hubber"} |
            | yesterdayMessage | "Yesterday I did this"                |
            | todayMessage     | "Today I'll do this"                  |
            | createdOn        | "TYPE:DATE"                           |

    Scenario: create standup without authorization
        Given make a POST request to "/standup" with:
            | author           | {"platform":"discord","uid":"hubber"} |
            | yesterdayMessage | "Yesterday I did this"                |
            | todayMessage     | "Today I'll do this"                  |
        Then the response status code should be 401
        And the response should contain:
            | statusCode | 401            |
            | message    | "Unauthorized" |
