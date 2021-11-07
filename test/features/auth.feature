# @auth
# Feature: auth module

#     Scenario: get list of all tokens in invalid keyspace
#         Given authorization
#         When make a GET request to "/auth/token/invalid-keyspace"
#         Then the response status code should be 200
#         And  the response should contain:
#             | clients | [] |

#     Scenario: get list of all tokens in my keyspace
#         Given authorization
#         And make a POST request to "/auth/token" with:
#             | serverId | "eddiehub"    |
#             | scopes   | ["Data.Read"] |
#         When make a GET request to "/auth/token/eddiehub"
#         Then the response status code should be 200
#         And  the response property "clients" should have a collection of type "TYPE:UUID"

#     Scenario: fail to create a token with no authorization
#         When make a POST request to "/auth/token" with:
#             | serverId | "eddiehub"    |
#             | scopes   | ["Data.Read"] |
#         Then the response status code should be 401

#     Scenario: fail to create a token with invalid authorization
#         Given invalid authorization
#         When make a POST request to "/auth/token" with:
#             | serverId | "eddiehub"    |
#             | scopes   | ["Data.Read"] |
#         Then the response status code should be 401

#     Scenario: create a token successfully
#         Given authorization
#         When make a POST request to "/auth/token" with:
#             | serverId | "eddiehub"    |
#             | scopes   | ["Data.Read"] |
#         Then the response status code should be 201
#         And the response should contain:
#             | clientId    | "TYPE:ID"     |
#             | keyspace    | "TYPE:STRING" |
#             | scopes      | ["Data.Read"] |
#             | accessToken | "TYPE:JWT"    |
#             | expiresIn   | "TYPE:NUMBER" |

#     Scenario: use the token
#         Given authorization
#         When make a POST request to "/auth/token" with:
#             | serverId | "eddiehub"    |
#             | scopes   | ["Data.Read"] |
#         Then the response status code should be 201
#         And the response should contain:
#             | clientId    | "TYPE:ID"     |
#             | keyspace    | "TYPE:STRING" |
#             | scopes      | ["Data.Read"] |
#             | accessToken | "TYPE:JWT"    |
#             | expiresIn   | "TYPE:NUMBER" |
#         When add bearer token to the header
#         And make a GET request to "/calendar"
#         Then the response status code should be 200

#     Scenario: validate token
#         Given authorization
#         When make a POST request to "/auth/token" with:
#             | serverId | "eddiehub"    |
#             | scopes   | ["Data.Read"] |
#         Then the response status code should be 201
#         Then add bearer token to the header
#         When make a POST request to "/auth/validate" with:
#             | token | "{BEARER}" |
#         Then the response status code should be 200
#         And the response should contain:
#             | valid | true |

#     Scenario: invalid validation of token
#         Given authorization
#         When make a POST request to "/auth/token" with:
#             | serverId | "eddiehub"    |
#             | scopes   | ["Data.Read"] |
#         Then the response status code should be 201
#         Then add bearer token to the header
#         When make a POST request to "/auth/validate" with:
#             | token | "XXXXX" |
#         Then the response status code should be 200
#         And the response should contain:
#             | valid | false |


#     Scenario: delete token
#         Given authorization
#         When make a POST request to "/auth/token" with:
#             | serverId | "eddiehub"    |
#             | scopes   | ["Data.Read"] |
#         Then the response status code should be 201
#         Then add bearer token to the header
#         When make a DELETE request to "/auth/token?token={bearer}"
#         Then the response status code should be 204
