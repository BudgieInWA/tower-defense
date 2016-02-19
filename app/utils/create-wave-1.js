import Board from 'tower-defense/objects/board';
import createUnitCodeLine from 'tower-defense/utils/create-unit-code-line';
import Ember from 'ember';
import Mob from 'tower-defense/objects/mob';
import PathCoords from 'tower-defense/objects/path-coords';
import TowerGroup from 'tower-defense/objects/tower-group';
import Tower from 'tower-defense/objects/tower';
import Wave from 'tower-defense/objects/wave';

function addBoardToWave(wave) {
  const board = Board.create();
  board.set('imageUrl', '/images/path-1.png');

  const pathObjects = [
    PathCoords.create({ x: 60, y: -5 }),
    PathCoords.create({ x: 60, y: 40 }),
    PathCoords.create({ x: 35, y: 40 }),
    PathCoords.create({ x: 35, y: 60 }),
    PathCoords.create({ x: 60, y: 60 }),
    PathCoords.create({ x: 60, y: 105 })
  ];

  pathObjects.forEach((pathObject) => {
    board.get('pathData').pushObject(pathObject);
  });

  wave.set('board', board);
}

function addMobsToWave(wave) {
  const mobs = [];

  const mobQuantity = 5;
  for (var i = 0; i < mobQuantity; i++) {
    const newMob = Mob.create({
      id: generateIdForRecord(),
      frequency: 2000,
      health: 200,
      maxHealth: 200,
      points: 20,
      quantity: mobQuantity,
      speed: 10, // seconds to cross one axis of the board
      type: 'standard'
    });

    mobs.push(newMob);
  }
  wave.set('mobs', Ember.A(mobs));
}

function addTowerGroupsToWave(wave) {
  let groupNum = 1;

  function getNewTowerGroup(numRows, posY) {
    return TowerGroup.create({
      id: generateIdForRecord(),
      numRows: numRows,
      posY: 'board__tower-group--position-y' + posY,
      selector: 'tg' + groupNum++,
      styles: Ember.A([createUnitCodeLine()])
    });
  }

  const towerGroup1 = getNewTowerGroup(1, 47);

  addTowersToTowerGroup(towerGroup1, 2);

  wave.set('towerGroups', Ember.A([towerGroup1]));
}

function addTowersToTowerGroup(towerGroup, numTowers) {
  function getNewTower(towerNum) {
    return Tower.create({
      id: generateIdForRecord(),
      attackPower: 20,
      attackRange: 20,
      selector: 't' + towerNum,
      type: 1,
      styles: Ember.A([createUnitCodeLine()])
    });
  }

  let newTowers = Ember.A([]);
  for (var i = 1; i < numTowers + 1; i++) {
    newTowers.pushObject(getNewTower(i));
  }

  towerGroup.set('towers', newTowers);
}

function generateIdForRecord() {
  function generate4DigitString() {
    const baseInt = Math.floor((1 + Math.random()) * 0x10000);
    return baseInt.toString(16).substring(1);
  }

  return generate4DigitString() + generate4DigitString() + '-' +
         generate4DigitString() + '-' + generate4DigitString() + '-' +
         generate4DigitString() + '-' + generate4DigitString() +
         generate4DigitString() + generate4DigitString();
}

export default function createWave1() {
  const wave = Wave.create({
    instructions: `Your job is to stop the incoming enemies from getting past
                   your defenses. Unlike other tower defense games, however, you
                   must position your towers using CSS code!

We'll start with container properties. Use the
justify-content property to move these two towers into
effective positions. justify-content aligns items
horizontally in a container and accepts the following
values:

* flex-start: group items to the left (the start) of a container
* flex-end: group items to the right of a container
* center: group items in the center of a container
* space-between: evenly distribute items in a container such that the first item
aligns to the left and the final item aligns to the right
* space-around: evenly distribute items in a container such that all items have
equal space around them

Press Enter to apply a line of CSS code, and then click Start Wave
to see how your towers fare! You must get a score of 80 or above to advance
to the next level.`,
    minimumScore: 80
  });

  addBoardToWave(wave);
  addMobsToWave(wave);
  addTowerGroupsToWave(wave);

  return wave;
}
