const assert = require("node:assert/strict");
const { Given, When, Then } = require("@cucumber/cucumber");

Given("I am signed in as {string}", function (username) {
  this.currentPlayer = username;
  assert.ok(this.currentPlayer);
});

When("I select {string}", function (option) {
  if (this.domino?.page === "main") {
    assert.equal(option, "Play Game");
    this.domino.playGameSelected = true;
    return;
  }

  assert.ok(this.demo);
  if (option === "Add Friend") {
    assert.equal(this.demo.section, "Friends");
    this.demo.addFriendSelected = true;
  } else if (option === "Send Friend Request") {
    assert.ok(this.demo.searchResults.some((player) => player.username === this.demo.selectedPlayer));
    assert.equal(this.demo.isAlreadyFriend, false);
    this.demo.requestStatus = "pending";
    this.demo.notificationSent = true;
    this.demo.message = "Friend request sent";
  } else if (option === "Accept" || option === "Decline") {
    assert.equal(this.demo.requestOpened, true);
    this.demo.requestStatus = option === "Accept" ? "accepted" : "declined";
    if (option === "Accept") {
      this.demo.friends.add(this.demo.requestSender);
      this.demo.requestSenderFriends.add(this.currentPlayer);
    }
  } else {
    assert.ok(this.demo.searchResults.some((player) => player.username === option));
    this.demo.selectedPlayer = option;
  }
});

Then("the system displays a {string} message", function (message) {
  assert.equal(this.domino?.message ?? this.demo?.message, message);
});

Then("the system displays an {string} message", function (message) {
  assert.equal(this.domino?.message ?? this.demo?.message, message);
});
