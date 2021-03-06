// The MIT License (MIT)
// Copyright (c) 2014 John Franklin Pavley
// see LICENSE.txt for full license text

// Single Class Game (SCG)
// rps_game: Rock, Paper, Sissors

var assert = require('assert');

// enumerations

var PLAYER_WEAPONS = {
  "rock" : 0,
  "paper" : 1,
  "sissors" : 2
};

var ERROR_STATES = {
  "player_dead" : -1,
  "target_dead" : -2,
  "no_target" : -3,
  "no_weapon" : -4
};

var GAME_STRATEGIES = {
  "random" : 0,
  "repeat" : 1,
  "no_repeat" : 2,
  "echo" : 4,
  "beat_last_move" : 5
};

var BATTLE_RESULT = {
  // -1 loss, 0 tie, 1 win (for weapon1)
  "loss" : -1,
  "tie" : 0,
  "win" : 1
};

// constants


var STD_HEALTH = 1000000;
var STD_HIT_POINTS = 100;
var STD_WEAPON = PLAYER_WEAPONS.rock;
var STD_STRATEGY = GAME_STRATEGIES.random;

//  classes

function JFPCharacter () {

  // instance vars

  this.name = "New Guy";
  this.health = STD_HEALTH;
  this.weapon = STD_WEAPON;
  this.hitPoints = STD_HIT_POINTS;
  this.strategy = STD_STRATEGY;
  this.target;
  this.weaponHistory = [];
  this.targetWeaponHistory = [];
};

// JFPCharacter methods

JFPCharacter.prototype.isDead = function () {
  return this.health < 1;
};

JFPCharacter.prototype.hitTarget = function () {

  var result;

  // early resturns

  if (!this.target) return ERROR_STATES.no_target;
  if (this.target.isDead) return ERROR_STATES.target_dead;
  if (this.isDead) return ERROR_STATES.player_dead;

  this.weaponHistory.push(this.weaponHistory);
  this.targetWeaponHistory.push(this.target.weapon);

  result = this.calcWinningWeapon(this.weapon, this.target.weapon);

  return result;
};

JFPCharacter.prototype.chooseWeapon = function () {
  var result;

  switch (this.strategy) {

    case GAME_STRATEGIES.random:
      // pick a random weapon
      result = Math.floor((Math.random() * 3) + 1);
    break;

    case GAME_STRATEGIES.repeat:
      // use the previous weapon
      result = this.weaponHistory[this.weaponHistory.length - 1];
    break;

    case GAME_STRATEGIES.no_repeat:
      // get the next weapon
      result = this.weaponHistory[this.weaponHistory.length - 1] + 1;
      // if the next weapon is out of bounds use the first weapon
      if (result > PLAYER_WEAPONS.sissors) {
        result = PLAYER_WEAPONS.rock;
      }
    break;

    case GAME_STRATEGIES.echo:
      // use the target's prevous weapon
      result = this.targetWeaponHistory[this.targetWeaponHistory.length - 1];
    break;

    case GAME_STRATEGIES.beat_last_move:
      // pick the weapon the defeats the previous weapon
      result = this.targetWeaponHistory[this.targetWeaponHistory.length - 1] + 1;
      // if the next weapon is out of bounds use the first weapon
      if (result > PLAYER_WEAPONS.sissors) {
        result = PLAYER_WEAPONS.rock;
      }
    break;

    default:
      result = STD_WEAPON;
  }
  return result;
};

JFPCharacter.prototype.calcWinningWeapon = function (weapon1, weapon2) {
  var result = BATTLE_RESULT.loss; // assume loss

  if (weapon1 === weapon2) {
    result = BATTLE_RESULT.tie
    return result; // early return
  };

  if (weapon1 === PLAYER_WEAPONS.rock && weapon2 === PLAYER_WEAPONS.sissors) {
    result = BATTLE_RESULT.win;
    return result; // early return
  }

  if (weapon1 === PLAYER_WEAPONS.paper && weapon2 === PLAYER_WEAPONS.rock) {
    result = BATTLE_RESULT.win;
    return result; // early return
  }

  if (weapon1 === PLAYER_WEAPONS.sissors && weapon2 === PLAYER_WEAPONS.paper) {
    result = BATTLE_RESULT.win;
    return result; // early return
  }

  return result; // if we got here it's a loss
};

// tests

// player 1

var player1 = new JFPCharacter();
player1.name = "player1";


// player 2

var player2 = new JFPCharacter();
player2.name = "player2";

// battle tests ties

var battleResult;

console.log("battle tests - ties");

player1.weapon = PLAYER_WEAPONS.rock;
player2.weapon = PLAYER_WEAPONS.rock;
battleResult = player1.calcWinningWeapon(player1.weapon, player2.weapon);
assert(battleResult === BATTLE_RESULT.tie);

player1.weapon = PLAYER_WEAPONS.paper;
player2.weapon = PLAYER_WEAPONS.paper;
battleResult = player1.calcWinningWeapon(player1.weapon, player2.weapon);
assert(battleResult === BATTLE_RESULT.tie);

player1.weapon = PLAYER_WEAPONS.sissors;
player2.weapon = PLAYER_WEAPONS.sissors;
battleResult = player1.calcWinningWeapon(player1.weapon, player2.weapon);
assert(battleResult === BATTLE_RESULT.tie, battleResult);

console.log("battle tests - wins");

player1.weapon = PLAYER_WEAPONS.rock;
player2.weapon = PLAYER_WEAPONS.sissors;
battleResult = player1.calcWinningWeapon(player1.weapon, player2.weapon);
assert(battleResult === BATTLE_RESULT.win);

player1.weapon = PLAYER_WEAPONS.paper;
player2.weapon = PLAYER_WEAPONS.rock;
battleResult = player1.calcWinningWeapon(player1.weapon, player2.weapon);
assert(battleResult === BATTLE_RESULT.win);

player1.weapon = PLAYER_WEAPONS.sissors;
player2.weapon = PLAYER_WEAPONS.paper;
battleResult = player1.calcWinningWeapon(player1.weapon, player2.weapon);
assert(battleResult === BATTLE_RESULT.win);

console.log("battle tests - losses");

player1.weapon = PLAYER_WEAPONS.rock;
player2.weapon = PLAYER_WEAPONS.paper;
battleResult = player1.calcWinningWeapon(player1.weapon, player2.weapon);
assert(battleResult === BATTLE_RESULT.loss);

player1.weapon = PLAYER_WEAPONS.paper;
player2.weapon = PLAYER_WEAPONS.sissors;
battleResult = player1.calcWinningWeapon(player1.weapon, player2.weapon);
assert(battleResult === BATTLE_RESULT.loss);

player1.weapon = PLAYER_WEAPONS.sissors;
player2.weapon = PLAYER_WEAPONS.rock;
battleResult = player1.calcWinningWeapon(player1.weapon, player2.weapon);
assert(battleResult === BATTLE_RESULT.loss);

console.log("tests - complete");





