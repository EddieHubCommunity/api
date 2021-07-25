@auth
Feature: auth module

    # Scenario: get list of all tokens in invalid keyspace
    #     Given authorisation
    #     When make a GET request to "/auth/invalid-keyspace"
    #     Then the response status code should be 200
    #     And  the response should be "[]"

    # Scenario: get list of all tokens in my keyspace
    #     Given authorisation
    #     And make a POST request to "/auth/tokens" with:
    #         | serverId | "eddiehub"    |
    #         | scopes   | ["Data.Read"] |
    #     When make a GET request to "/auth/tokens/eddiehub"
    #     Then the response status code should be 200
    #     And  the response should be "[{\"serverId\":\"eddiehub\", \"scopes\":\"[\"Data.Read\"]\"}]"

    Scenario: fail to create a token with no authorisation
        When make a POST request to "/auth" with:
            | serverId | "eddiehub"    |
            | scopes   | ["Data.Read"] |
        Then the response status code should be 401

    Scenario: fail to create a token with invalid authorisation
        Given invalid authorisation
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

    Scenario: use the token
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
        And make a GET request to "/calendar"
        Then the response status code should be 200

    # Scenario: validate token
    #     Given authorisation
    #     When make a POST request to "/auth" with:
    #         | serverId | "eddiehub"    |
    #         | scopes   | ["Data.Read"] |
    #     Then the response status code should be 201
    #     When make a POST request to "/auth/tokens/validate" with:
    #         | keyspace | "eddiehub"   |
    #         | clientId | "{clientId}" |
    #     Then the response status code should be 200

    # Scenario: invalid validation of token
    #     Given authorisation
    #     When make a POST request to "/auth" with:
    #         | serverId | "eddiehub"    |
    #         | scopes   | ["Data.Read"] |
    #     Then the response status code should be 201
    #     When make a POST request to "/auth/validate" with:
    #         | keyspace | "eddiehub" |
    #         | clientId | "xxxxxxxx" |
    #     Then the response status code should be 400

    Scenario: delete token
        Given authorisation
        When make a POST request to "/auth" with:
            | serverId | "eddiehub"    |
            | scopes   | ["Data.Read"] |
        Then the response status code should be 201
        When make a DELETE request to "/auth/{clientId}" with:
            | serverId | "eddiehub"    |
            | scopes   | ["Data.Read"] |
        Then the response status code should be 204
