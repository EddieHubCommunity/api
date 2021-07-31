@calendar
Feature: calendar module

    Scenario: add a new event
        Given authorization with "writing" permission
        When make a POST request to "/calendar" with:
            | name        | "Livestream XY"                       |
            | description | "descriptive Description"             |
            | url         | "https://domain.com"                  |
            | platform    | "YouTube"                             |
            | author      | {"platform":"discord","uid":"hubber"} |
            | startDate   | "2021-01-01T00:00:00.000Z"            |
            | endDate     | "2021-01-01T00:00:00.000Z"            |
        And the response should contain:
            | documentId | "TYPE:ID" |
        Given authorization with "reading" permission
        When make a GET request to "/calendar/{id}"
        Then the response status code should be 200
        And the response should contain:
            | name        | "Livestream XY"                       |
            | description | "descriptive Description"             |
            | url         | "https://domain.com"                  |
            | platform    | "YouTube"                             |
            | author      | {"platform":"discord","uid":"hubber"} |
            | startDate   | "2021-01-01T00:00:00.000Z"            |
            | endDate     | "2021-01-01T00:00:00.000Z"            |
            | createdOn   | "TYPE:DATE"                           |
            | updatedOn   | "TYPE:DATE"                           |

    Scenario: get list of events
        Given authorization with "reading" permission
        When make a GET request to "/calendar"
        Then the response status code should be 200
        And the response should contain:
            | future  | {} |
            | ongoing | {} |

    Scenario: add an empty event
        Given authorization with "writing" permission
        And make a POST request to "/calendar" with:
            | test | "test" |
        Then the response status code should be 400
        And the response should contain:
            | statusCode | 400           |
            | error      | "Bad Request" |
        And the response property "message" has items:
            | name must be a string                                         |
            | name should not be empty                                      |
            | platform must be one of the following values: YouTube, Twitch |
            | platform must be a string                                     |
            | platform should not be empty                                  |
            | author should not be empty                                    |
            | startDate should not be empty                                 |
            | startDate must be a Date instance                             |
            | endDate must be a Date instance                               |
            | endDate should not be empty                                   |

    Scenario: update an event
        Given authorization with "writing" permission
        When make a POST request to "/calendar" with:
            | name        | "Livestream XY"                       |
            | description | "descriptive Description"             |
            | url         | "https://domain.com"                  |
            | platform    | "YouTube"                             |
            | author      | {"platform":"discord","uid":"hubber"} |
            | startDate   | "2021-01-01T00:00:00.000Z"            |
            | endDate     | "2021-01-01T00:00:00.000Z"            |
        And the response should contain:
            | documentId | "TYPE:ID" |
        Given authorization with "writing" permission
        Then set header "User-Uid" with value "hubber"
        Then set header "Platform" with value "discord"
        When make a PUT request to "/calendar/{id}" with:
            | name        | "Livestream YZ"                      |
            | description | "undescriptive Description"          |
            | url         | "https://mydomain.com"               |
            | platform    | "Twitch"                             |
            | author      | {"platform":"discord","uid":"hubby"} |
            | startDate   | "2021-01-01T00:00:00.000Z"           |
            | endDate     | "2021-01-01T00:00:00.000Z"           |
        Then the response status code should be 200
        Given authorization with "reading" permission
        When make a GET request to "/calendar/{id}"
        Then the response status code should be 200
        And the response should contain:
            | name        | "Livestream YZ"                      |
            | description | "undescriptive Description"          |
            | url         | "https://mydomain.com"               |
            | platform    | "Twitch"                             |
            | author      | {"platform":"discord","uid":"hubby"} |
            | startDate   | "2021-01-01T00:00:00.000Z"           |
            | endDate     | "2021-01-01T00:00:00.000Z"           |
            | createdOn   | "TYPE:DATE"                          |
            | updatedOn   | "TYPE:DATE"                          |

    Scenario: update an event with wrong author
        Given authorization with "writing" permission
        When make a POST request to "/calendar" with:
            | name        | "Livestream XY"                       |
            | description | "descriptive Description"             |
            | url         | "https://domain.com"                  |
            | platform    | "YouTube"                             |
            | author      | {"platform":"discord","uid":"hubber"} |
            | startDate   | "2021-01-01T00:00:00.000Z"            |
            | endDate     | "2021-01-01T00:00:00.000Z"            |
        And the response should contain:
            | documentId | "TYPE:ID" |
        Given authorization with "writing" permission
        When make a PUT request to "/calendar/{id}" with:
            | name        | "Livestream YZ"                      |
            | description | "undescriptive Description"          |
            | url         | "https://mydomain.com"               |
            | platform    | "Twitch"                             |
            | author      | {"platform":"discord","uid":"hubby"} |
            | startDate   | "2021-01-01T00:00:00.000Z"           |
            | endDate     | "2021-01-01T00:00:00.000Z"           |
        Then the response status code should be 400
        And the response should contain:
            | statusCode | 400                                   |
            | message    | "update failed: author doesn't match" |

    Scenario: update an non-existing event
        Given authorization with "writing" permission
        When make a PUT request to "/calendar/321" with:
            | name        | "Livestream YZ"                      |
            | description | "undescriptive Description"          |
            | url         | "https://mydomain.com"               |
            | platform    | "Twitch"                             |
            | author      | {"platform":"discord","uid":"hubby"} |
            | startDate   | "2021-01-01T00:00:00.000Z"           |
            | endDate     | "2021-01-01T00:00:00.000Z"           |
        Then the response status code should be 404
        And the response should contain:
            | message    | "no event for 321 found" |
            | statusCode | 404                      |

    Scenario: delete an event
        Given authorization with "writing" permission
        When make a POST request to "/calendar" with:
            | name        | "Livestream XY"                       |
            | description | "descriptive Description"             |
            | url         | "https://domain.com"                  |
            | platform    | "YouTube"                             |
            | author      | {"platform":"discord","uid":"hubber"} |
            | startDate   | "2021-01-01T00:00:00.000Z"            |
            | endDate     | "2021-01-01T00:00:00.000Z"            |
        And the response should contain:
            | documentId | "TYPE:ID" |
        Given authorization with "writing" permission
        Then set header "User-Uid" with value "hubber"
        Then set header "Platform" with value "discord"
        When make a DELETE request to "/calendar/{id}"
        Then the response status code should be 204

    Scenario: delete an event with wrong author
        Given authorization with "writing" permission
        When make a POST request to "/calendar" with:
            | name        | "Livestream XY"                       |
            | description | "descriptive Description"             |
            | url         | "https://domain.com"                  |
            | platform    | "YouTube"                             |
            | author      | {"platform":"discord","uid":"hubber"} |
            | startDate   | "2021-01-01T00:00:00.000Z"            |
            | endDate     | "2021-01-01T00:00:00.000Z"            |
        And the response should contain:
            | documentId | "TYPE:ID" |
        Given authorization with "writing" permission
        When make a DELETE request to "/calendar/{id}"
        Then the response status code should be 400
        And the response should contain:
            | statusCode | 400                                     |
            | message    | "deletion failed: author doesn't match" |

    Scenario: delete non-existing event
        Given authorization with "writing" permission
        When make a DELETE request to "/calendar/321"
        Then the response status code should be 404
        And the response should contain:
            | statusCode | 404                      |
            | message    | "no event for 321 found" |

    Scenario: get event with authenticated request
        Given authorization with "writing" permission
        When make a POST request to "/calendar" with:
            | name        | "Livestream XY"                       |
            | description | "descriptive Description"             |
            | url         | "https://domain.com"                  |
            | platform    | "YouTube"                             |
            | author      | {"platform":"discord","uid":"hubber"} |
            | startDate   | "2021-01-01T00:00:00.000Z"            |
            | endDate     | "2021-01-01T00:00:00.000Z"            |
        And the response should contain:
            | documentId | "TYPE:ID" |
        Given authorization with "reading" permission
        When make a GET request to "/calendar/{id}"
        Then the response status code should be 200
        And the response should contain:
            | name        | "Livestream XY"                       |
            | description | "descriptive Description"             |
            | url         | "https://domain.com"                  |
            | platform    | "YouTube"                             |
            | author      | {"platform":"discord","uid":"hubber"} |
            | startDate   | "2021-01-01T00:00:00.000Z"            |
            | endDate     | "2021-01-01T00:00:00.000Z"            |
            | createdOn   | "TYPE:DATE"                           |
            | updatedOn   | "TYPE:DATE"                           |

    Scenario: create a event without authorization
        Given make a POST request to "/calendar" with:
            | name        | "Livestream XY"                       |
            | description | "descriptive Description"             |
            | url         | "https://domain.com"                  |
            | platform    | "YouTube"                             |
            | author      | {"platform":"discord","uid":"hubber"} |
            | startDate   | "2021-01-01T00:00:00.000Z"            |
            | endDate     | "2021-01-01T00:00:00.000Z"            |
        Then the response status code should be 401
        And the response should contain:
            | statusCode | 401            |
            | message    | "Unauthorized" |

    Scenario: get sorted ongoing and future events
        Given authorization with "writing" permission
        And make a POST request to "/calendar" with:
            | name        | "Livestream XY"                       |
            | description | "descriptive Description"             |
            | url         | "https://domain.com"                  |
            | platform    | "YouTube"                             |
            | author      | {"platform":"discord","uid":"hubber"} |
            | startDate   | "2022-01-01T00:00:00.000Z"            |
            | endDate     | "2023-01-01T00:00:00.000Z"            |
        When make a POST request to "/calendar" with:
            | name        | "Livestream YZ"                      |
            | description | "undescriptive Description"          |
            | url         | "https://mydomain.com"               |
            | platform    | "Twitch"                             |
            | author      | {"platform":"discord","uid":"hubby"} |
            | startDate   | "2021-01-01T00:00:00.000Z"           |
            | endDate     | "2022-01-01T00:00:00.000Z"           |
        Given authorization with "reading" permission
        When make a GET request to "/calendar"
        Then the response status code should be 200
        And the response property "future" has a subobject with a field "name" that is equal to "Livestream XY" should contain:
            | name        | "Livestream XY"                       |
            | description | "descriptive Description"             |
            | url         | "https://domain.com"                  |
            | platform    | "YouTube"                             |
            | author      | {"platform":"discord","uid":"hubber"} |
            | startDate   | "2022-01-01T00:00:00.000Z"            |
            | endDate     | "2023-01-01T00:00:00.000Z"            |
            | createdOn   | "TYPE:DATE"                           |
            | updatedOn   | "TYPE:DATE"                           |
        And the response property "ongoing" has a subobject with a field "name" that is equal to "Livestream YZ" should contain:
            | name        | "Livestream YZ"                      |
            | description | "undescriptive Description"          |
            | url         | "https://mydomain.com"               |
            | platform    | "Twitch"                             |
            | author      | {"platform":"discord","uid":"hubby"} |
            | startDate   | "2021-01-01T00:00:00.000Z"           |
            | endDate     | "2022-01-01T00:00:00.000Z"           |
            | createdOn   | "TYPE:DATE"                          |
            | updatedOn   | "TYPE:DATE"                          |

    Scenario: create event with wrong permissions
        Given authorization with "reading" permission
        And make a POST request to "/calendar" with:
            | name        | "Livestream XY"                       |
            | description | "descriptive Description"             |
            | url         | "https://domain.com"                  |
            | platform    | "YouTube"                             |
            | author      | {"platform":"discord","uid":"hubber"} |
            | startDate   | "2022-01-01T00:00:00.000Z"            |
            | endDate     | "2023-01-01T00:00:00.000Z"            |
        Then the response status code should be 403
        And the response should contain:
            | message    | "Forbidden" |
            | statusCode | 403         |
