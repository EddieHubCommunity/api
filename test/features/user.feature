@User

Feature: User Module

    Scenario: add a new User with Githubprofile
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
            | bio    | "My Name is Hubber"                        |