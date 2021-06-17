@github
Feature: github module

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
            | documentId | "TYPE:ID" |

    Scenario: get list of githubprofiles
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
        And the response should contain:
            | documentId | "TYPE:ID" |
        When make a GET request to "/github"
        Then the response status code should be 200
        And the response in item where field "username" is equal to "eddiehubber" should contain:
            | username       | "eddiehubber"                                               |
            | bio            | "I love to code"                                            |
            | avatarUrl      | "https://dummy.com/avatar"                                  |
            | followers      | 500                                                         |
            | repos          | 32                                                          |
            | communityStats | {"push":1}                                                  |
            | blog           | "https://www.myBlog.com"                                    |
            | organization   | "Eddiehub"                                                  |
            | location       | {"provided": "London","lat": 51.5073219,"long": -0.1276474} |
            | updatedOn      | "TYPE:DATE"                                                 |
            | createdOn      | "TYPE:DATE"                                                 |

    Scenario: add an empty githubprofile
        Given authorisation
        And make a POST request to "/github" with:
            | test | "test" |
        Then the response status code should be 400
        And the response should contain:
            | statusCode | 400           |
            | error      | "Bad Request" |
        And the response property "message" has items:
            | username must be a string    |
            | username should not be empty |

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
        And the response should contain:
            | documentId | "TYPE:ID" |
        When make a DELETE request to "/github/{id}"
        Then the response status code should be 204

    Scenario: delete non-existent githubprofile
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
        And the response should contain:
            | documentId | "TYPE:ID" |
        Then make a DELETE request to "/github/66"
        Then the response status code should be 404
        And the response should contain:
            | statusCode | 404                              |
            | message    | "no github-profile for 66 found" |

    Scenario: update githubprofile with previously used event
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
        And the response should contain:
            | documentId | "TYPE:ID" |
        Then make a PUT request to "/github/{id}" with:
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
            | documentId | "TYPE:ID" |

    Scenario: update githubprofile with previously unused event
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
        And the response should contain:
            | documentId | "TYPE:ID" |
        Then make a PUT request to "/github/{id}" with:
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
            | documentId | "TYPE:ID" |

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
        And the response should contain:
            | documentId | "TYPE:ID" |
        When make a GET request to "/github/{id}"
        Then the response status code should be 200
        And the response should contain:
            | username       | "eddiehubber"                                               |
            | bio            | "I love to code"                                            |
            | avatarUrl      | "https://dummy.com/avatar"                                  |
            | followers      | 500                                                         |
            | repos          | 32                                                          |
            | communityStats | {"push":1}                                                  |
            | blog           | "https://www.myBlog.com"                                    |
            | organization   | "Eddiehub"                                                  |
            | location       | {"provided": "London","lat": 51.5073219,"long": -0.1276474} |
            | updatedOn      | "TYPE:DATE"                                                 |
            | createdOn      | "TYPE:DATE"                                                 |

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
