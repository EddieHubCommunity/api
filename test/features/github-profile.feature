@github-profile
Feature: Github Profile module

    Scenario: add new github profile
        Given authorization
        And I create a new user
        Then make a POST request to "/github" with:
            | discordUsername | "hubber" |
            | githubUsername  | "hubber" |
        Then the response status code should be 201
        And the response should contain:
            | _id | "hubber" |


    Scenario: get a specific github profile
        Given authorization
        And I create a new user
        Then make a POST request to "/github" with:
            | discordUsername | "hubber" |
            | githubUsername  | "hubber" |
        Then make a GET request to "/users/hubber"
        Then the response status code should be 200
        And the response should contain:
            | _id | "hubber" |

    Scenario: get all github profiles
        Given authorization
        And I create a new user
        Then make a POST request to "/github" with:
            | discordUsername | "hubber" |
            | githubUsername  | "hubber" |
        Then make a GET request to "/github"
        Then the response status code should be 200
        And the response at index "0" should contain:
            | _id | "hubber" |

    Scenario: delete a specific github profile
        Given authorization
        And I create a new user
        Then make a POST request to "/github" with:
            | discordUsername | "hubber" |
            | githubUsername  | "hubber" |
        Then make a DELETE request to "/users/hubber"
        Then the response status code should be 204

    Scenario: update existing github profile
        Given authorization
        And I create a new user
        Then make a POST request to "/github" with:
            | discordUsername | "hubber" |
            | githubUsername  | "hubber" |
        Then make a PUT request to "/github/hubber" with:
            | discordUsername | "hubber" |
        Then the response status code should be 200
        And the response should contain:
            | _id | "hubber" |
            | __v | 1        |

    Scenario: create github profile without auth
        Given authorization
        And I create a new user
        Then remove authorization
        Then make a POST request to "/github" with:
            | discordUsername | "hubber" |
            | githubUsername  | "hubber" |
        Then the response status code should be 401
        And the response should contain:
            | statusCode | 401            |
            | message    | "Unauthorized" |