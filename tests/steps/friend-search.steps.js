const assert = require("node:assert/strict");
const { Given, When, Then, Before } = require("@cucumber/cucumber");

const demoPlayers = {
  PLAYER2: { username: "PLAYER2", displayName: "Player Two" },
};

Before(function () {
  this.demo = {
    currentPlayer: null,
    section: null,
    addFriendSelected: false,
    searchResults: [],
    viewedPlayer: null,
  };
});

Given("I am signed in as {string}", function (username) {
  this.demo.currentPlayer = username;
  assert.ok(this.demo.currentPlayer);
});

Given("I am in the Friends section", function () {
  this.demo.section = "Friends";
});

When("I select {string}", function (option) {
  assert.equal(this.demo.section, "Friends");
  assert.equal(option, "Add Friend");
  this.demo.addFriendSelected = true;
});

When("I search for the username {string}", function (username) {
  assert.equal(this.demo.addFriendSelected, true);
  const player = demoPlayers[username];
  this.demo.searchResults = player ? [player] : [];
});

Then("the system displays {string} in the search results", function (username) {
  assert.ok(this.demo.searchResults.some((player) => player.username === username));
});

Then("I can view that player's information", function () {
  const [player] = this.demo.searchResults;
  assert.ok(player);
  this.demo.viewedPlayer = player;
  assert.equal(this.demo.viewedPlayer.displayName, "Player Two");
});
