const assert = require("node:assert/strict");
const { Given, When, Then, Before } = require("@cucumber/cucumber");

const demoPlayers = {
  PLAYER2: { username: "PLAYER2", displayName: "Player Two" },
};

Before(function () {
  this.demo = {
    section: null,
    addFriendSelected: false,
    searchResults: [],
    viewedPlayer: null,
    isAlreadyFriend: false,
    friends: new Set(),
    requestSenderFriends: new Set(),
    requestStatus: null,
    requestSender: null,
    requestOpened: false,
    notificationSent: false,
    message: null,
  };
});

Given("I am in the Friends section", function () {
  this.demo.section = "Friends";
});

When("I search for the username {string}", function (username) {
  assert.equal(this.demo.addFriendSelected, true);
  const player = demoPlayers[username];
  this.demo.searchResults = player ? [player] : [];
  this.demo.message = player ? null : "Player not found";
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

Then("I can enter another username", function () {
  assert.equal(this.demo.addFriendSelected, true);
  assert.deepEqual(this.demo.searchResults, []);
});

Given("I have found {string} in the player search results", function (username) {
  const player = demoPlayers[username];
  assert.ok(player, `Unknown demo player: ${username}`);
  this.demo.searchResults = [player];
});

Given("{string} is not already my friend", function (username) {
  assert.ok(demoPlayers[username]);
  this.demo.isAlreadyFriend = false;
});

Given("{string} is already on my friends list", function (username) {
  assert.ok(demoPlayers[username]);
  this.demo.isAlreadyFriend = true;
  this.demo.friends.add(username);
});

Then("the system records a pending friend request for {string}", function (username) {
  assert.equal(this.demo.selectedPlayer, username);
  assert.equal(this.demo.requestStatus, "pending");
});

Then("{string} receives a friend request notification", function (username) {
  assert.equal(this.demo.selectedPlayer, username);
  assert.equal(this.demo.notificationSent, true);
});

Then("I see a confirmation that the friend request was sent", function () {
  assert.equal(this.demo.message, "Friend request sent");
});

When("I attempt to send a friend request", function () {
  assert.equal(this.demo.isAlreadyFriend, true);
  this.demo.message = `${this.demo.selectedPlayer} is already my friend`;
});

Then("the system tells me {string} is already my friend", function (username) {
  assert.equal(this.demo.message, `${username} is already my friend`);
});

Then("no new friend request is sent", function () {
  assert.notEqual(this.demo.requestStatus, "pending");
  assert.equal(this.demo.notificationSent, false);
});

Given("I have received a friend request from {string}", function (username) {
  this.demo.requestSender = username;
  this.demo.requestStatus = "pending";
  this.demo.requestSenderFriends = this.demo.requestSenderFriends ?? new Set();
});

When("I open the friend request", function () {
  assert.equal(this.demo.requestStatus, "pending");
  this.demo.requestOpened = true;
});

Then("the system adds {string} to my friends list", function (username) {
  assert.equal(this.demo.requestStatus, "accepted");
  assert.ok(this.demo.friends.has(username));
});

Then("the system adds {string} to {string}'s friends list", function (username, friendUsername) {
  assert.equal(username, this.currentPlayer);
  assert.equal(friendUsername, this.demo.requestSender);
  assert.ok(this.demo.requestSenderFriends.has(username));
});

Then("I see a friendship confirmation", function () {
  assert.equal(this.demo.requestStatus, "accepted");
});

Then("the system marks the friend request as declined", function () {
  assert.equal(this.demo.requestStatus, "declined");
});

Then("{string} is not added to my friends list", function (username) {
  assert.ok(!this.demo.friends.has(username));
});

Then("I see a request declined confirmation", function () {
  assert.equal(this.demo.requestStatus, "declined");
});
