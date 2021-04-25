Feature: Standup-module

    Scenario: get list of standups
        Given make a GET request to "/standup"
        Then the response status code should be 200
        And the response should be "[]"

    Scenario: add a new standup
        Given authorisation
        And make a POST request to "/standup" with:
            | discordUser      | "eddiehubber"          |
            | yesterdayMessage | "Yesterday I did this" |
            | todayMessage     | "Today I'll do this"   |
        Then the response status code should be 201
        And the response should contain:
            | id               | 123                        |
            | discordUser      | "eddiehubber"              |
            | yesterdayMessage | "Yesterday I did this"     |
            | todayMessage     | "Today I'll do this"       |
            | createdOn        | "2021-01-01T00:00:00.000Z" |

    Scenario: search existing standup
        Given authorisation
        And make a POST request to "/standup" with:
            | discordUser      | "eddiehubber"          |
            | yesterdayMessage | "Yesterday I did this" |
            | todayMessage     | "Today I'll do this"   |
        Then  make a GET request to "/standup/search?discordUser=eddiehubber"
        Then the response status code should be 200
        And  the response in property "0" should contain:
            | id               | 123                        |
            | discordUser      | "eddiehubber"              |
            | yesterdayMessage | "Yesterday I did this"     |
            | todayMessage     | "Today I'll do this"       |
            | createdOn        | "2021-01-01T00:00:00.000Z" |

    Scenario: search non-existing standup
        Given authorisation
        And make a POST request to "/standup" with:
            | discordUser      | "eddiehubber"          |
            | yesterdayMessage | "Yesterday I did this" |
            | todayMessage     | "Today I'll do this"   |
        Then  make a GET request to "/standup/search?discordUser=hubber"
        Then the response status code should be 200
        And  the response should be "[]"

    Scenario: provide no search context
        Given authorisation
        And make a POST request to "/standup" with:
            | discordUser      | "eddiehubber"          |
            | yesterdayMessage | "Yesterday I did this" |
            | todayMessage     | "Today I'll do this"   |
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
            | discordUser should not be empty      |
            | discordUser must be a string         |
            | yesterdayMessage should not be empty |
            | yesterdayMessage must be a string    |
            | todayMessage should not be empty     |
            | todayMessage must be a string        |

    Scenario: delete standup
        Given authorisation
        And make a POST request to "/standup" with:
            | discordUser      | "eddiehubber"          |
            | yesterdayMessage | "Yesterday I did this" |
            | todayMessage     | "Today I'll do this"   |
        Then make a DELETE request to "/standup/123"
        Then the response status code should be 200
        And the response should be "{}"

    Scenario: delete non-existent standup
        Given authorisation
        And make a POST request to "/standup" with:
            | discordUser      | "eddiehubber"          |
            | yesterdayMessage | "Yesterday I did this" |
            | todayMessage     | "Today I'll do this"   |
        Then make a DELETE request to "/standup/66"
        Then the response status code should be 404
        And the response should contain:
            | statusCode | 404                 |
            | message    | "Standup not found" |

    Scenario: get standup with authenticated request
        Given authorisation
        And make a POST request to "/standup" with:
            | discordUser      | "eddiehubber"          |
            | yesterdayMessage | "Yesterday I did this" |
            | todayMessage     | "Today I'll do this"   |
        When make a GET request to "/standup/123"
        Then the response status code should be 200
        And the response should contain:
            | id               | 123                        |
            | discordUser      | "eddiehubber"              |
            | yesterdayMessage | "Yesterday I did this"     |
            | todayMessage     | "Today I'll do this"       |
            | createdOn        | "2021-01-01T00:00:00.000Z" |

    Scenario: create standup without authorization
        Given make a POST request to "/standup" with:
            | discordUser      | "eddiehubber"          |
            | yesterdayMessage | "Yesterday I did this" |
            | todayMessage     | "Today I'll do this"   |
        Then the response status code should be 401
        And the response should contain:
            | statusCode | 401            |
            | message    | "Unauthorized" |
