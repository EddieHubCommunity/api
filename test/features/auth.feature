@auth
Feature: auth module

    Scenario: fail to create a token with no authorisation
        When make a POST request to "/auth" with:
            | serverId | "eddiehub"    |
            | scopes   | ["Data.Read"] |
        Then the response status code should be 401

    Scenario: create a token successfully
        Given authorisation
        When make a POST request to "/auth" with:
            | serverId | "eddiehub"    |
            | scopes   | ["Data.Read"] |
        Then the response status code should be 201
        And the response should contain:
            | clientId    | "TYPE:ID"     |
            | keyspace    | "TYPE:STRING" |
            | scopes      | ["Data.Read"] |
            | accessToken | "TYPE:JWT"    |
            | expiresIn   | "TYPE:NUMBER" |

    Scenario: restart the app and use existing token
        Given authorisation
        When make a POST request to "/auth" with:
            | serverId | "eddiehub"    |
            | scopes   | ["Data.Read"] |
        Then the response status code should be 201
        And the response should contain:
            | clientId    | "TYPE:ID"     |
            | keyspace    | "TYPE:STRING" |
            | scopes      | ["Data.Read"] |
            | accessToken | "TYPE:JWT"    |
            | expiresIn   | "TYPE:NUMBER" |
        When add bearer token to the header
        # And restart app
        And make a GET request to "/calendar"
        Then the response status code should be 200
