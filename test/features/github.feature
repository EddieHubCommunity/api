Feature: github-module

    Scenario: get list of githubprofiles
        Given make a GET request to "/standup"
        Then the response status code should be 200
        And the response should be "[]"

    Scenario: add a new githubprofile
        Given authorisation
        And make a POST request to "/github" with:
            | username     | "eddiehubber"              |
            | bio          | "I love to code"           |
            | avatarUrl    | "https://dummy.com/avatar" |
            | followers    | 500                        |
            | repos        | 32                         |
            | event        | "push"                     |
            | blog         | "https://www.myBlog.com"   |
            | organization | "Eddiehub"                 |
            | location     | "London"                   |
        Then the response status code should be 201
        And the response should contain:
            | id             | 123                                                         |
            | username       | "eddiehubber"                                               |
            | bio            | "I love to code"                                            |
            | avatarUrl      | "https://dummy.com/avatar"                                  |
            | followers      | 500                                                         |
            | repos          | 32                                                          |
            | communityStats | {"push":1}                                                  |
            | blog           | "https://www.myBlog.com"                                    |
            | organization   | "Eddiehub"                                                  |
            | location       | {"provided": "London","lat": 51.5073219,"long": -0.1276474} |
            | updatedOn      | "2021-01-01T00:00:00.000Z"                                  |
            | createdOn      | "2021-01-01T00:00:00.000Z"                                  |

    Scenario: add an empty githubprofile
        Given authorisation
        And make a POST request to "/github" with:
            | test | "test" |
        Then the response status code should be 400
        And the response should contain:
            | statusCode | 400                                                          |
            | message    | ["username must be a string","username should not be empty"] |
            | error      | "Bad Request"                                                |

    Scenario: delete a githubprofile
        Given authorisation
        And make a POST request to "/github" with:
            | username     | "eddiehubber"              |
            | bio          | "I love to code"           |
            | avatarUrl    | "https://dummy.com/avatar" |
            | followers    | 500                        |
            | repos        | 32                         |
            | event        | "push"                     |
            | blog         | "https://www.myBlog.com"   |
            | organization | "Eddiehub"                 |
            | location     | "London"                   |
        Then make a DELETE request to "/github/123"
        Then the response status code should be 200
        And the response should be "{}"

    Scenario: delete non-existent githubprofile
        Given authorisation
        And make a POST request to "/github" with:
            | username     | "eddiehubber"              |
            | bio          | "I love to code"           |
            | avatarUrl    | "https://dummy.com/avatar" |
            | followers    | 500                        |
            | blog         | "https://www.myBlog.com"   |
            | organization | "Eddiehub"                 |
            | location     | "London"                   |
            | repos        | 32                         |
            | event        | "push"                     |
        Then make a DELETE request to "/github/66"
        Then the response status code should be 404
        And the response should contain:
            | statusCode | 404                       |
            | message    | "Githubprofile Not Found" |

    Scenario: update githubprofile with previously used event
        Given authorisation
        And make a POST request to "/github" with:
            | username     | "eddiehubber"              |
            | bio          | "I love to code"           |
            | avatarUrl    | "https://dummy.com/avatar" |
            | followers    | 500                        |
            | repos        | 32                         |
            | blog         | "https://www.myBlog.com"   |
            | organization | "Eddiehub"                 |
            | location     | "London"                   |
            | event        | "push"                     |
        Then make a PUT request to "/github/123" with:
            | username     | "eddiehubber"              |
            | bio          | "I love to code"           |
            | avatarUrl    | "https://dummy.com/avatar" |
            | followers    | 500                        |
            | repos        | 32                         |
            | blog         | "https://www.myBlog.com"   |
            | organization | "Eddiehub"                 |
            | location     | "London"                   |
            | event        | "push"                     |
        Then the response status code should be 200
        And the response should contain:
            | id             | 123                                                         |
            | username       | "eddiehubber"                                               |
            | bio            | "I love to code"                                            |
            | avatarUrl      | "https://dummy.com/avatar"                                  |
            | followers      | 500                                                         |
            | repos          | 32                                                          |
            | communityStats | {"push":2}                                                  |
            | blog           | "https://www.myBlog.com"                                    |
            | organization   | "Eddiehub"                                                  |
            | location       | {"provided": "London","lat": 51.5073219,"long": -0.1276474} |
            | updatedOn      | "2021-01-01T00:00:00.000Z"                                  |
            | createdOn      | "2021-01-01T00:00:00.000Z"                                  |

    Scenario: update githubprofile with previously unused event
        Given authorisation
        And make a POST request to "/github" with:
            | username     | "eddiehubber"              |
            | bio          | "I love to code"           |
            | avatarUrl    | "https://dummy.com/avatar" |
            | followers    | 500                        |
            | repos        | 32                         |
            | blog         | "https://www.myBlog.com"   |
            | organization | "Eddiehub"                 |
            | location     | "London"                   |
            | event        | "push"                     |
        Then make a PUT request to "/github/123" with:
            | username     | "eddiehubber"              |
            | bio          | "I love to code"           |
            | avatarUrl    | "https://dummy.com/avatar" |
            | followers    | 500                        |
            | repos        | 32                         |
            | blog         | "https://www.myBlog.com"   |
            | organization | "Eddiehub"                 |
            | location     | "London"                   |
            | event        | "label"                    |
        Then the response status code should be 200
        And the response should contain:
            | id             | 123                                                         |
            | username       | "eddiehubber"                                               |
            | bio            | "I love to code"                                            |
            | avatarUrl      | "https://dummy.com/avatar"                                  |
            | followers      | 500                                                         |
            | repos          | 32                                                          |
            | communityStats | {"push":1, "label": 1}                                      |
            | updatedOn      | "2021-01-01T00:00:00.000Z"                                  |
            | blog           | "https://www.myBlog.com"                                    |
            | organization   | "Eddiehub"                                                  |
            | location       | {"provided": "London","lat": 51.5073219,"long": -0.1276474} |
            | createdOn      | "2021-01-01T00:00:00.000Z"                                  |

    Scenario: get githubprofile with authenticated request
        Given authorisation
        And make a POST request to "/github" with:
            | username     | "eddiehubber"              |
            | bio          | "I love to code"           |
            | avatarUrl    | "https://dummy.com/avatar" |
            | followers    | 500                        |
            | repos        | 32                         |
            | event        | "push"                     |
            | blog         | "https://www.myBlog.com"   |
            | organization | "Eddiehub"                 |
            | location     | "London"                   |
        When make a GET request to "/github/123"
        Then the response status code should be 200
        And the response should contain:
            | id             | 123                                                         |
            | username       | "eddiehubber"                                               |
            | bio            | "I love to code"                                            |
            | avatarUrl      | "https://dummy.com/avatar"                                  |
            | followers      | 500                                                         |
            | repos          | 32                                                          |
            | communityStats | {"push":1}                                                  |
            | updatedOn      | "2021-01-01T00:00:00.000Z"                                  |
            | blog           | "https://www.myBlog.com"                                    |
            | organization   | "Eddiehub"                                                  |
            | location       | {"provided": "London","lat": 51.5073219,"long": -0.1276474} |
            | createdOn      | "2021-01-01T00:00:00.000Z"                                  |

    Scenario: create a githubprofile without authentication
        Given make a POST request to "/github" with:
            | username     | "eddiehubber"              |
            | bio          | "I love to code"           |
            | avatarUrl    | "https://dummy.com/avatar" |
            | followers    | 500                        |
            | repos        | 32                         |
            | event        | "push"                     |
            | blog         | "https://www.myBlog.com"   |
            | organization | "Eddiehub"                 |
            | location     | "London"                   |
        Then the response status code should be 401
        And the response should contain:
            | statusCode | 401            |
            | message    | "Unauthorized" |
