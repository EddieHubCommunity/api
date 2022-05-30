@User

Feature: User Module
    Scenario: add new user
        Given authorization
        And make a POST request to "/users" with:
            | discordUsername | "hubber"                                   |
            | bio             | "My Name is Hubber"                        |
            | avatar          | "https://github.com/EddieHubCommunity.png" |
        Then the response status code should be 201
        And the response should contain:
            | avatar | "https://github.com/EddieHubCommunity.png" |
            | _id    | "hubber"                                   |
            | bio    | "My Name is Hubber"                        |

    Scenario: get a specific user
        Given authorization
        And make a POST request to "/users" with:
            | discordUsername | "hubber"                                   |
            | bio             | "My Name is Hubber"                        |
            | avatar          | "https://github.com/EddieHubCommunity.png" |
        When remove authorization
        Then make a GET request to "/users/hubber"
        Then the response status code should be 200
        And the response should contain:
            | avatar | "https://github.com/EddieHubCommunity.png" |
            | _id    | "hubber"                                   |
            | bio    | "My Name is Hubber"                        |

    Scenario: get all users
        Given authorization
        And make a POST request to "/users" with:
            | discordUsername | "hubber"                                   |
            | bio             | "My Name is Hubber"                        |
            | avatar          | "https://github.com/EddieHubCommunity.png" |
        When remove authorization
        Then make a GET request to "/users"
        Then the response status code should be 200
        And the response at index "0" should contain:
            | avatar | "https://github.com/EddieHubCommunity.png" |
            | _id    | "hubber"                                   |
            | bio    | "My Name is Hubber"                        |

    Scenario: delete a specific user
        Given authorization
        And make a POST request to "/users" with:
            | discordUsername | "hubber"                                   |
            | bio             | "My Name is Hubber"                        |
            | avatar          | "https://github.com/EddieHubCommunity.png" |
        Then make a DELETE request to "/users/hubber"
        Then the response status code should be 204

    Scenario: update a specific user
        Given authorization
        And make a POST request to "/users" with:
            | discordUsername | "hubber"                                   |
            | bio             | "My Name is Hubber"                        |
            | avatar          | "https://github.com/EddieHubCommunity.png" |
        Then make a PATCH request to "/users/hubber" with:
            | bio    | "My Name is Eddie"             |
            | avatar | "https://github.com/eddie.png" |
        Then the response status code should be 200
        And the response should contain:
            | _id    | "hubber"                       |
            | bio    | "My Name is Eddie"             |
            | avatar | "https://github.com/eddie.png" |

    Scenario: create a user without auth
        Given  make a POST request to "/users" with:
            | discordUsername | "hubber"                                   |
            | bio             | "My Name is Hubber"                        |
            | avatar          | "https://github.com/EddieHubCommunity.png" |
        Then the response status code should be 401
        And the response should contain:
            | statusCode | 401            |
            | message    | "Unauthorized" |

