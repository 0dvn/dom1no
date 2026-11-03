Feature: Send Friend Request
  As a signed-in player
  I want to find other players and send them friend requests
  So that I can add them to my friends list

  Scenario: Find a player by username
    Given I am signed in as "PLAYER1"
    And I am in the Friends section
    When I select "Add Friend"
    And I search for the username "PLAYER2"
    Then the system displays "PLAYER2" in the search results
    And I can view that player's information

  Scenario: Search for a player who does not exist
    Given I am signed in as "PLAYER1"
    And I am in the Friends section
    When I select "Add Friend"
    And I search for the username "UNKNOWN_PLAYER"
    Then the system displays a "Player not found" message
    And I can enter another username

  Scenario: Send a friend request
    Given I am signed in as "PLAYER1"
    And I have found "PLAYER2" in the player search results
    And "PLAYER2" is not already my friend
    When I select "PLAYER2"
    And I select "Send Friend Request"
    Then the system records a pending friend request for "PLAYER2"
    And "PLAYER2" receives a friend request notification
    And I see a confirmation that the friend request was sent

  Scenario: Attempt to add an existing friend
    Given I am signed in as "PLAYER1"
    And "PLAYER2" is already on my friends list
    And I have found "PLAYER2" in the player search results
    When I select "PLAYER2"
    And I attempt to send a friend request
    Then the system tells me "PLAYER2" is already my friend
    And no new friend request is sent

  Scenario: Accept a friend request
    Given I am signed in as "PLAYER2"
    And I have received a friend request from "PLAYER1"
    When I open the friend request
    And I select "Accept"
    Then the system adds "PLAYER1" to my friends list
    And the system adds "PLAYER2" to "PLAYER1"'s friends list
    And I see a friendship confirmation

  Scenario: Decline a friend request
    Given I am signed in as "PLAYER2"
    And I have received a friend request from "PLAYER1"
    When I open the friend request
    And I select "Decline"
    Then the system marks the friend request as declined
    And "PLAYER1" is not added to my friends list
    And I see a request declined confirmation
