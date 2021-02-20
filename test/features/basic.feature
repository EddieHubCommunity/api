@Basic
Feature: Check project is running

  Scenario: Getting the Battlesnake meta data
    Given I make a GET request to the API endpoint "/" as "battlesnake"
    Then there should be a 200 response from the "battlesnake" request that contains:
      | apiversion | author       | color   | head    | tail    |
      | "1"        | Eddie Jaoude | #888888 | default | default |
