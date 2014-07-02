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

var GAME_OUTCOMES = {
  "win_paper_rock" : 0,
  "win_rock_sissors" : 1,
  "win_sissors_paper" : 2,
  "loss_rock_paper" : 3,
  "loss_sissors_rock" : 4,
  "loss_paper_sissors" : 5,
  "tie_paper_paper" : 6,
  "tie_rock_rock" : 7,
  "tie_sissors_sissors" : 8
};

var GAME_STRATEGIES = {
  "random" : 0,
  "repeat" : 1,
  "no_repeat" : 2,
  "echo" : 4,
  "beat_last_move" : 5
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

  switch (this.weapon) {
    case PLAYER_WEAPONS.rock:

      switch (this.target.weapon) {
        case  PLAYER_WEAPONS.rock:
          result = tie_rock_rock;
        break;
        case PLAYER_WEAPONS.sissors:
          result = win_rock_sissors;
        break;
        case PLAYER_WEAPONS.paper:
          result = loss_rock_paper;
        break;
        default:
          result = ERROR_STATES.no_weapon;
      }
    break;
    
    case PLAYER_WEAPONS.sissors:

      switch (this.target.weapon) {
        case  PLAYER_WEAPONS.rock:
          result = loss_sissors_rock;
        break;
        case PLAYER_WEAPONS.sissors:
          result = tie_sissors_sissors;
        break;
        case PLAYER_WEAPONS.paper:
          result = win_sissors_paper;
        break;
        default:
          result = ERROR_STATES.no_weapon;
      }
    break;

    case PLAYER_WEAPONS.paper:

      switch (this.target.weapon) {
        case  PLAYER_WEAPONS.rock:
          result = win_paper_rock;
        break;
        case PLAYER_WEAPONS.sissors:
          result = loss_paper_sissors;
        break;
        case PLAYER_WEAPONS.paper:
          result = tie_paper_paper;
        break;
        default:
          result = ERROR_STATES.no_weapon;
      }

    break;
    default:
      result = ERROR_STATES.no_weapon;
  }

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
  // -1 loss, 0 tie, 1 win (for weapon1)
  // rock = 0, paper = 1, sissors = 2
  var result = -1, // assume loss
      lastWeaponIndex = PLAYER_WEAPONS.length - 1;

  if (weapon11 === weapon2) {
    result = 0
    return result; // early return
  };

  if (weapon1 === 0 && weapon2 === lastWeaponIndex) {
    // special case
    result = 1; // early return
    return result;
  };

  if (weapon1 > weapon2) {
    result = 1;
  };

  return result;

};

// tests

var player1 = new JFPCharacter();

player1.name = "player1";
assert(player1.name === "player1");

console.log(player1);







