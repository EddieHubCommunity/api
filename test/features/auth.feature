@auth
Feature: auth module

    Scenario: get list of all tokens in invalid keyspace
        Given authorisation
        When make a GET request to "/auth/token/invalid-keyspace"
        Then the response status code should be 200
        And  the response should contain:
            | clients | [] |

    Scenario: get list of all tokens in my keyspace
        Given authorisation
        And make a POST request to "/auth/token" with:
            | serverId | "eddiehub"    |
            | scopes   | ["Data.Read"] |
        When make a GET request to "/auth/token/eddiehub"
        Then the response status code should be 200
        And  the response property "clients" should be of type "TYPE:UUID"

    Scenario: fail to create a token with no authorisation
        When make a POST request to "/auth/token" with:
            | serverId | "eddiehub"    |
            | scopes   | ["Data.Read"] |
        Then the response status code should be 401

    Scenario: fail to create a token with invalid authorisation
        Given invalid authorisation
        When make a POST request to "/auth/token" with:
            | serverId | "eddiehub"    |
            | scopes   | ["Data.Read"] |
        Then the response status code should be 401

    Scenario: create a token successfully
        Given authorisation
        When make a POST request to "/auth/token" with:
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
        When make a POST request to "/auth/token" with:
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

    Scenario: validate token
        Given authorisation
        When make a POST request to "/auth/token" with:
            | serverId | "eddiehub"    |
            | scopes   | ["Data.Read"] |
        Then the response status code should be 201
        Then add bearer token to the header
        When make a POST request to "/auth/validate" with:
            | token | "{BEARER}" |
        Then the response status code should be 200
        And the response should contain:
            | valid | true |

    Scenario: invalid validation of token
        Given authorisation
        When make a POST request to "/auth/token" with:
            | serverId | "eddiehub"    |
            | scopes   | ["Data.Read"] |
        Then the response status code should be 201
        Then add bearer token to the header
        When make a POST request to "/auth/validate" with:
            | token | "XXXXX" |
        Then the response status code should be 400
        And the response should contain:
            | valid | false |


    Scenario: delete token
        Given authorisation
        When make a POST request to "/auth/token" with:
            | serverId | "eddiehub"    |
            | scopes   | ["Data.Read"] |
        Then the response status code should be 201
        Then add bearer token to the header
        When make a DELETE request to "/auth/token?token={bearer}"
        Then the response status code should be 204
