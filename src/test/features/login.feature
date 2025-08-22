Feature: Login test

Scenario: Valid Login test
    Given user is on login page
    When user enter valid creds
    | username | password     |
    | JoeEazzy | Password001! |
    Then user is logged in
    | username | 
    | JoeEazzy |