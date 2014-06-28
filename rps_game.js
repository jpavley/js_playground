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

// constants


var STD_HEALTH = 1000000;
var STD_HIT_POINTS = 100;

//  classes

function JFPCharacter () {

  // instance vars

  this.name = "New Guy";
  this.health = STD_HEALTH;
  this.weapon = PLAYER_WEAPONS.rock;
  this.target;
}

// JFPCharacter methods

JFPCharacter.prototype.isDead = function () {
  return this.health < 1;
}

JFPCharacter.prototype.hitTarget = function () {

  var result;

  // early resturns

  if (!this.target) return ERROR_STATES.no_target;
  if (this.target.isDead) return ERROR_STATES.target_dead;
  if (this.isDead) return ERROR_STATES.player_dead;

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
    break;
    case PLAYER_WEAPONS.paper:
    break;
    default:
      return ERROR_STATES.no_weapon;

  }
}