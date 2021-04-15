Feature: Standup-module

    Scenario: get list of standups
        Given make a GET request to "/standup"
        Then the response status code should be 200
        And the response should be "[]"

    Scenario: add a new standup
        Given make a POST request to "/standup" with:
            | discordUser      | "eddiehubber"          |
            | yesterdayMessage | "yesterday I did this" |
            | todayMessage     | "Today I'll do this"   |
        Then the response status code should be 201
        And the response should contains:
            | discordUser      | "eddiehubber"              |
            | yesterdayMessage | "yesterday I did this"     |
            | todayMessage     | "Today I'll do this"       |
            | createdOn        | "2021-01-01T00:00:00.000Z" |
            | id               | 666                        |


    //TODO Step Definition Array of Objects
    Scenario: search Standup
        Given make a POST request to "/standup" with:
            | discordUser      | "eddiehubber"          |
            | yesterdayMessage | "yesterday I did this" |
            | todayMessage     | "Today I'll do this"   |
        Then  make a POST request to "/standup/search" with:
            | discordUser | "eddiehubber" |
        Then the response status code should be 201
        And  the response should be:


    Scenario: add an empty standup
        Given make a POST request to "/standup" with:
            | test | "test" |
        Then the response status code should be 400
        And the response should contains:
            | statusCode | 400               |
            | message    | "Incomplete Data" |

    Scenario: Delete Standup
        Given make a POST request to "/standup" with:
            | discordUser      | "eddiehubber"          |
            | yesterdayMessage | "yesterday I did this" |
            | todayMessage     | "Today I'll do this"   |
        Then make a DELETE request to "/standup/666"
        Then the response status code should be 200
        And the response should be "{}"