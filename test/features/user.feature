@User

Feature: User Module

    Scenario: add a new user with githubprofile
        Given authorization
        And make a POST request to "/user" with:
            | discordUsername | "hubber"                                   |
            | githubUsername  | "nhcarrigan"                               |
            | bio             | "My Name is Hubber"                        |
            | avatar          | "https://github.com/EddieHubCommunity.png" |
            | type            | "personal"                                 |
        Then the response status code should be 201
        And the response should contain:
            | type   | "personal"                                 |
            | avatar | "https://github.com/EddieHubCommunity.png" |
            | _id    | "hubber"                                   |
            | bio    | "My Name is Hubber"                        |
        And the response in property "github" should contain:
            | _id       | "nhcarrigan"                                                       |
            | followers | "TYPE:NUMBER"                                                      |
            | repos     | "TYPE:NUMBER"                                                      |
            | location  | {"provided":"Washington, USA","lat":38.8950368,"long":-77.0365427} |
            | __v       | 0                                                                  |

    Scenario: add new user without githubprofile
        Given authorization
        And make a POST request to "/user" with:
            | discordUsername | "hubber"                                   |
            | bio             | "My Name is Hubber"                        |
            | avatar          | "https://github.com/EddieHubCommunity.png" |
            | type            | "personal"                                 |
        Then the response status code should be 201
        And the response should contain:
            | type   | "personal"                                 |
            | avatar | "https://github.com/EddieHubCommunity.png" |
            | _id    | "hubber"                                   |
            | bio    | "My Name is Hubber"                        |

    Scenario: get a specific user
        Given authorization
        And make a POST request to "/user" with:
            | discordUsername | "hubber"                                   |
            | bio             | "My Name is Hubber"                        |
            | avatar          | "https://github.com/EddieHubCommunity.png" |
            | type            | "personal"                                 |
        When remove authorization
        Then make a GET request to "/user/hubber"
        Then the response status code should be 200
        And the response should contain:
            | type   | "personal"                                 |
            | avatar | "https://github.com/EddieHubCommunity.png" |
            | _id    | "hubber"                                   |
            | bio    | "My Name is Hubber"                        |

    Scenario: get all users
        Given authorization
        And make a POST request to "/user" with:
            | discordUsername | "hubber"                                   |
            | bio             | "My Name is Hubber"                        |
            | avatar          | "https://github.com/EddieHubCommunity.png" |
            | type            | "personal"                                 |
        When remove authorization
        Then make a GET request to "/user"
        Then the response status code should be 200
        And the response at index "0" should contain:
            | type   | "personal"                                 |
            | avatar | "https://github.com/EddieHubCommunity.png" |
            | _id    | "hubber"                                   |
            | bio    | "My Name is Hubber"                        |

    Scenario: delete a specific user
        Given authorization
        And make a POST request to "/user" with:
            | discordUsername | "hubber"                                   |
            | bio             | "My Name is Hubber"                        |
            | avatar          | "https://github.com/EddieHubCommunity.png" |
            | type            | "personal"                                 |
        Then make a DELETE request to "/user/hubber"
        Then the response status code should be 204

    Scenario: update a specific user
        Given authorization
        And make a POST request to "/user" with:
            | discordUsername | "hubber"                                   |
            | bio             | "My Name is Hubber"                        |
            | avatar          | "https://github.com/EddieHubCommunity.png" |
            | type            | "personal"                                 |
        Then make a PATCH request to "/user/hubber" with:
            | bio    | "My Name is Eddie"             |
            | avatar | "https://github.com/eddie.png" |
        Then the response status code should be 200
        And the response should contain:
            | type   | "personal"                     |
            | _id    | "hubber"                       |
            | bio    | "My Name is Eddie"             |
            | avatar | "https://github.com/eddie.png" |

    Scenario: create a user without auth
        Given  make a POST request to "/user" with:
            | discordUsername | "hubber"                                   |
            | bio             | "My Name is Hubber"                        |
            | avatar          | "https://github.com/EddieHubCommunity.png" |
            | type            | "personal"                                 |
        Then the response status code should be 401
        And the response should contain:
            | statusCode | 401            |
            | message    | "Unauthorized" |

