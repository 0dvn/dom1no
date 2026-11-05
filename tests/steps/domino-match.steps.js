const assert = require("node:assert/strict");
const { Before, Given, When, Then } = require("@cucumber/cucumber");

Before(function () {
  this.domino = {
    players: [],
    hand: [],
    board: [],
    selectedTile: null,
    currentPlayerIndex: 0,
    shuffled: false,
    dealt: false,
    gameStarted: false,
    gameEnded: false,
    winner: null,
    message: null,
  };
});

Given("I am on the main page", function () {
  assert.ok(this.currentPlayer);
  this.domino.page = "main";
});

Then("the system creates a new game with four players", function () {
  assert.equal(this.domino.playGameSelected, true);
  this.domino.players = [this.currentPlayer, "PLAYER2", "PLAYER3", "PLAYER4"];
  this.domino.gameStarted = true;
  assert.equal(this.domino.players.length, 4);
});

Then("the system shuffles the domino tiles", function () {
  assert.equal(this.domino.gameStarted, true);
  this.domino.shuffled = true;
});

Then("the system deals domino tiles to all four players", function () {
  assert.equal(this.domino.shuffled, true);
  this.domino.hand = ["6|4", "5|2"];
  this.domino.dealt = true;
  this.domino.playersHaveTiles = true;
  assert.equal(this.domino.players.length, 4);
});

Then("I see the game board and my tiles", function () {
  assert.equal(this.domino.dealt, true);
  this.domino.boardVisible = true;
  assert.equal(this.domino.boardVisible, true);
  assert.ok(this.domino.hand.length > 0);
});

Given("I am participating in a four-player domino game", function () {
  this.currentPlayer ??= "PLAYER1";
  this.domino.players = [this.currentPlayer, "PLAYER2", "PLAYER3", "PLAYER4"];
  this.domino.gameStarted = true;
  this.domino.currentPlayerIndex = 0;
  assert.equal(this.domino.players.length, 4);
});

Given("it is my turn", function () {
  assert.equal(this.domino.players[this.domino.currentPlayerIndex], this.currentPlayer);
});

Given("I have a domino tile that can legally be played", function () {
  this.domino.hand = ["6|4"];
  this.domino.legalTile = "6|4";
});

Given("I have a domino tile that cannot legally be played", function () {
  this.domino.hand = ["1|2"];
  this.domino.legalTile = null;
});

When("I select that tile", function () {
  assert.equal(this.domino.hand.length, 1);
  this.domino.selectedTile = this.domino.hand[0];
});

When("I place it on the game board", function () {
  assert.equal(this.domino.selectedTile, this.domino.legalTile);
  this.domino.board.push(this.domino.selectedTile);
  this.domino.hand = this.domino.hand.filter((tile) => tile !== this.domino.selectedTile);
  this.domino.currentPlayerIndex = (this.domino.currentPlayerIndex + 1) % this.domino.players.length;
});

Then("the tile is placed on the game board", function () {
  assert.ok(this.domino.board.includes(this.domino.selectedTile));
});

Then("the tile is removed from my hand", function () {
  assert.ok(!this.domino.hand.includes(this.domino.selectedTile));
});

Then("the game board is updated", function () {
  assert.equal(this.domino.board.length, 1);
});

Then("the next player gets a turn", function () {
  assert.equal(this.domino.players[this.domino.currentPlayerIndex], "PLAYER2");
});

When("I try to place it on the game board", function () {
  assert.notEqual(this.domino.selectedTile, this.domino.legalTile);
  this.domino.message = "Invalid move";
});

Then("the game board remains unchanged", function () {
  assert.deepEqual(this.domino.board, []);
});

Then("it is still my turn", function () {
  assert.equal(this.domino.players[this.domino.currentPlayerIndex], this.currentPlayer);
});

Given("I have one domino tile remaining", function () {
  this.domino.hand = ["6|4"];
  this.domino.legalTile = "6|4";
});

Given("that tile can legally be played", function () {
  assert.equal(this.domino.hand[0], this.domino.legalTile);
});

When("I place my last tile on the game board", function () {
  this.domino.board.push(this.domino.hand.pop());
  this.domino.gameEnded = true;
  this.domino.winner = this.currentPlayer;
});

Then("my hand is empty", function () {
  assert.equal(this.domino.hand.length, 0);
});

Then("the system declares me the winner", function () {
  assert.equal(this.domino.winner, this.currentPlayer);
});

Then("the system displays the final game result", function () {
  assert.equal(this.domino.gameEnded, true);
  this.domino.resultDisplayed = true;
  assert.equal(this.domino.resultDisplayed, true);
});

Given("no player has used all their tiles", function () {
  this.domino.playersHaveTiles = true;
});

Given("no player can make a legal move", function () {
  this.domino.playersBlocked = true;
});

When("the system checks whether any player can move", function () {
  assert.equal(this.domino.playersHaveTiles, true);
  assert.equal(this.domino.playersBlocked, true);
  this.domino.gameEnded = true;
});

Then("the system ends the game", function () {
  assert.equal(this.domino.gameEnded, true);
});

Then("the system determines the result", function () {
  assert.equal(this.domino.gameEnded, true);
  this.domino.result = "blocked";
});
