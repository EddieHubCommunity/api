@standup
Feature: Standup module

    Scenario: add a new standup
        Given authorization
        And make a POST request to "/standup" with:
            | author           | {"platform":"discord","uid":"hubber"} |
            | yesterdayMessage | "Yesterday I did this"                |
            | todayMessage     | "Today I'll do this"                  |
        Then the response status code should be 201
        And the response should contain:
            | author           | {"platform":"discord","uid":"hubber"} |
            | todayMessage     | "Today I'll do this"                  |
            | yesterdayMessage | "Yesterday I did this"                |
            | createdOn        | "TYPE:DATE"                           |
            | _id              | "TYPE:ID"                             |
            | __v              | 0                                     |

    Scenario: search existing standup
        Given authorization
        And make a POST request to "/standup" with:
            | author           | {"platform":"discord","uid":"hubber"} |
            | yesterdayMessage | "Yesterday I did this"                |
            | todayMessage     | "Today I'll do this"                  |
        Then the response status code should be 201
        Then  make a GET request to "/standup/search?uid=hubber"
        When remove authorization
        Then the response status code should be 200
        And the response at index "0" should contain:
            | author           | {"platform":"discord","uid":"hubber"} |
            | todayMessage     | "Today I'll do this"                  |
            | yesterdayMessage | "Yesterday I did this"                |
            | createdOn        | "TYPE:DATE"                           |
            | _id              | "TYPE:ID"                             |
            | __v              | 0                                     |

    Scenario: search non-existing standup
        Given authorization
        And make a POST request to "/standup" with:
            | author           | {"platform":"discord","uid":"hubber"} |
            | yesterdayMessage | "Yesterday I did this"                |
            | todayMessage     | "Today I'll do this"                  |
        Then the response status code should be 201
        When remove authorization
        Then  make a GET request to "/standup/search?uid=benjamin"
        Then the response status code should be 200
        And  the response should be "[]"

    Scenario: provide no search context
        Given authorization
        And make a POST request to "/standup" with:
            | author           | {"platform":"discord","uid":"hubber"} |
            | yesterdayMessage | "Yesterday I did this"                |
            | todayMessage     | "Today I'll do this"                  |
        Then the response status code should be 201
        When remove authorization
        Then  make a GET request to "/standup/search"
        Then the response status code should be 400
        And  the response should contain:
            | statusCode | 400                             |
            | message    | "Please provide search context" |

    Scenario: add an empty standup
        Given authorization
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
        Given authorization
        And make a POST request to "/standup" with:
            | author           | {"platform":"discord","uid":"hubber"} |
            | yesterdayMessage | "Yesterday I did this"                |
            | todayMessage     | "Today I'll do this"                  |
        Then the response status code should be 201
        And the response should contain:
            | _id | "TYPE:ID" |
        Then set header "User-Uid" with value "hubber"
        Then set header "Platform" with value "discord"
        Then make a DELETE request to "/standup/{id}"
        Then the response status code should be 204

    Scenario: delete standup with wrong credentials
        Given authorization
        And make a POST request to "/standup" with:
            | author           | {"platform":"discord","uid":"hubber"} |
            | yesterdayMessage | "Yesterday I did this"                |
            | todayMessage     | "Today I'll do this"                  |
        Then the response status code should be 201
        And the response should contain:
            | _id | "TYPE:ID" |
        Then set header "User-Uid" with value "discord"
        Then set header "Platform" with value "hubber"
        Then make a DELETE request to "/standup/{id}"
        Then the response status code should be 400
        And the response should contain:
            | statusCode | 400                                     |
            | message    | "failed: wrong author" |

    Scenario: delete non-existent standup
        Given authorization
        And make a POST request to "/standup" with:
            | author           | {"platform":"discord","uid":"hubber"} |
            | yesterdayMessage | "Yesterday I did this"                |
            | todayMessage     | "Today I'll do this"                  |
        Then the response status code should be 201
        And the response should contain:
            | _id | "TYPE:ID" |
        Then make a DELETE request to "/standup/66"
        Then the response status code should be 404
        And  the response should contain:
            | statusCode | 404                            |
            | message    | "Standup with ID 66 not Found" |

    Scenario: get standup with authenticated request
        Given authorization
        And make a POST request to "/standup" with:
            | author           | {"platform":"discord","uid":"hubber"} |
            | yesterdayMessage | "Yesterday I did this"                |
            | todayMessage     | "Today I'll do this"                  |
        Then the response status code should be 201
        And the response should contain:
            | _id | "TYPE:ID" |
        When make a GET request to "/standup/{id}"
        Then the response status code should be 200
        And the response should contain:
            | author           | {"platform":"discord","uid":"hubber"} |
            | todayMessage     | "Today I'll do this"                  |
            | yesterdayMessage | "Yesterday I did this"                |
            | createdOn        | "TYPE:DATE"                           |
            | _id              | "TYPE:ID"                             |
            | __v              | 0                                     |

    Scenario: create standup without authorization
        When make a POST request to "/standup" with:
            | author           | {"platform":"discord","uid":"hubber"} |
            | yesterdayMessage | "Yesterday I did this"                |
            | todayMessage     | "Today I'll do this"                  |
        Then the response status code should be 401
        And the response should contain:
            | statusCode | 401            |
            | message    | "Unauthorized" |
