// The MIT License (MIT)
// Copyright (c) 2014 John Franklin Pavley
// see LICENSE.txt for full license text

var assert = require('assert');

var PLAYER_STANCES = {
	"ready"     : 0,
	"attacking" : 1,
	"defending" : 2
};

var STD_HEALTH = 1000000,
		STD_SHIELD = 1000000;

// Character Class - Represents a playable character in the game

function JFPCharacter () {

	// instance vars

	this.name = "New Guy";
	this.health = 0;
	this.shield = 0;

	this.weapon = {
		"name"   : "Power Packed Punch",
		"damage" : 75
	};

	this.stance = PLAYER_STANCES.ready;

	this.target;
}

JFPCharacter.prototype.isDead = function () {
	return this.health < 1;
}

JFPCharacter.prototype.isShieldDown = function () {
	return this.shield < 1;
}

JFPCharacter.prototype.hitTarget = function (weapon) {
	if (!this.target || this.target.isDead() || this.isDead()) {
	    // there most be a target
        // the dead can not be attacked
        // the dead can not attack
        console.log("Can't hit because " + this.name + " has no target, or its target is dead, or it's dead!");
		return;
	}

	console.log("* " + this.name + " hits " + this.target.name + " with " + this.weapon.name + " *");

	var hitPoints = this.weapon.damage + Math.floor((Math.random() * 10) + 1);
	console.log("    Damage Amount: " + hitPoints);

	switch (this.target.stance) {
		case PLAYER_STANCES.ready:
		case PLAYER_STANCES.attacking:
			this.target.health -= hitPoints;
			break;
		case PLAYER_STANCES.defending:
			if (this.target.isShieldDown()) {
				this.target.health -= hitPoints;
			} else {
				this.target.shield -= hitPoints;
			}
	}

	if (this.target.health < 0) {
		this.target.health = 0;
	}

	if (this.target.shield < 0) {
		this.target.shield = 0;
	}

	console.log("    Results of attack:");
	console.log("    Target " + this.target.name + " shield: " + this.target.shield + " health: " + this.target.health);
	if (this.target.isDead()) {
		console.log("    Target " + this.target.name + " is dead! ");
	}
}

// test Character Class

console.log("** Create the Mighty Morgan **");
var morgan = new JFPCharacter();
assert(morgan.isDead(), "morgan should be dead because he was just created!");
assert(morgan.isShieldDown())
morgan.name = "Morgan";
assert(morgan.name === "Morgan");
morgan.health = STD_HEALTH;
assert(morgan.health === STD_HEALTH);
assert(!morgan.isDead(), "morgan should not be dead yet!");
morgan.shield = STD_SHIELD;
assert(morgan.shield === STD_SHIELD);
assert(!morgan.isShieldDown());
morgan.stance = PLAYER_STANCES.attacking;
assert(morgan.stance === PLAYER_STANCES.attacking);
console.log(morgan);

console.log("** Create the Fantstic Fing **");
var fing = new JFPCharacter();
fing.name = "Fing";
fing.stance = PLAYER_STANCES.defending;
fing.health = STD_HEALTH;
fing.shield = STD_SHIELD;
fing.weapon = { "name": "Super Slap Spell", "damage": 40 };
console.log(fing);

morgan.target = fing;
fing.target = morgan;

var count = 0;
var gameOver = false;
var gameStartTime = Date.now();
console.log("Let the game begin!");
while (!gameOver) {
	count++;
	console.log("** Round " + count + " **");
	morgan.hitTarget();
	fing.hitTarget();
	if (morgan.isDead() || fing.isDead()) {
		gameOver = true;
		console.log("Game over man!");
		var gameEndTime = Date.now();
		var gameElaspedTime = gameEndTime - gameStartTime;
		console.log("Game Duration in milliseconds: " + gameElaspedTime);
	};
}

