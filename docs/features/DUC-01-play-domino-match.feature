Feature: Play a Domino Match
  As a signed-in player
  I want to play a domino match with three other players
  So that I can enjoy the game and compete to win

  Scenario: Start a new game
    Given I am signed in as "PLAYER1"
    And I am on the main page
    When I select "Play Game"
    Then the system creates a new game with four players
    And the system shuffles the domino tiles
    And the system deals domino tiles to all four players
    And I see the game board and my tiles

  Scenario: Make a valid move
    Given I am participating in a four-player domino game
    And it is my turn
    And I have a domino tile that can legally be played
    When I select that tile
    And I place it on the game board
    Then the tile is placed on the game board
    And the tile is removed from my hand
    And the game board is updated
    And the next player gets a turn

  Scenario: Attempt an invalid move
    Given I am participating in a four-player domino game
    And it is my turn
    And I have a domino tile that cannot legally be played
    When I select that tile
    And I try to place it on the game board
    Then the system displays an "Invalid move" message
    And the game board remains unchanged
    And it is still my turn

  Scenario: Win by playing the last tile
    Given I am participating in a four-player domino game
    And it is my turn
    And I have one domino tile remaining
    And that tile can legally be played
    When I place my last tile on the game board
    Then my hand is empty
    And the system declares me the winner
    And the system displays the final game result

  Scenario: End the game when no player can move
    Given I am participating in a four-player domino game
    And no player has used all their tiles
    And no player can make a legal move
    When the system checks whether any player can move
    Then the system ends the game
    And the system determines the result
    And the system displays the final game result
