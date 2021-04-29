const { cryptureContract } = require("../ether");

const cryptures = [
  {
    name: "Bulbasaur",
    type: "Grass",
    stats: {
      hp: {
        min: 45,
        max: 200,
      },
      attack: {
        min: 49,
        max: 82,
      },
      defense: {
        min: 49,
        max: 92,
      },
      specialAttack: {
        min: 65,
        max: 191,
      },
      specialDefense: {
        min: 65,
        max: 191,
      },
      speed: {
        min: 45,
        max: 85,
      },
    },
  },
  {
    name: "Charmander",
    type: "Fire",
    stats: {
      hp: {
        min: 39,
        max: 188,
      },
      attack: {
        min: 52,
        max: 98,
      },
      defense: {
        min: 43,
        max: 81,
      },
      specialAttack: {
        min: 60,
        max: 112,
      },
      specialDefense: {
        min: 50,
        max: 94,
      },
      speed: {
        min: 65,
        max: 121,
      },
    },
  },
  {
    name: "Squirtle",
    type: "Water",
    stats: {
      hp: {
        min: 44,
        max: 198,
      },
      attack: {
        min: 48,
        max: 90,
      },
      defense: {
        min: 65,
        max: 121,
      },
      specialAttack: {
        min: 50,
        max: 94,
      },
      specialDefense: {
        min: 64,
        max: 119,
      },
      speed: {
        min: 43,
        max: 81,
      },
    },
  },
];

const attacksTable = [
  {
    name: "Nada",
    type: "Normal",
    category: "Physical",
    power: 0,
    accuracy: 0,
    pp: 0,
  },
  {
    name: "Tackle",
    type: "Normal",
    category: "Physical",
    power: 40,
    accuracy: 100,
    pp: 35,
  },
  {
    name: "Vine Whip",
    type: "Grass",
    category: "Physical",
    power: 45,
    accuracy: 100,
    pp: 25,
  },
  {
    name: "Ember",
    type: "Fire",
    category: "Special",
    power: 40,
    accuracy: 100,
    pp: 25,
  },
  {
    name: "Water Gun",
    type: "Water",
    category: "Special",
    power: 40,
    accuracy: 100,
    pp: 25,
  },
];

function getStatValueByLevel(level, min, max) {
  return ((level - 1) / 254) * (max - min) + min;
}

function getStatsByLevel(code, level, statsTable) {
  return {
    hp: getStatValueByLevel(level, statsTable.hp.min, statsTable.hp.max),
    attack: getStatValueByLevel(
      level,
      statsTable.attack.min,
      statsTable.attack.max
    ),
    defense: getStatValueByLevel(
      level,
      statsTable.defense.min,
      statsTable.defense.max
    ),
    specialAttack: getStatValueByLevel(
      level,
      statsTable.specialAttack.min,
      statsTable.specialAttack.max
    ),
    specialDefense: getStatValueByLevel(
      level,
      statsTable.specialDefense.min,
      statsTable.specialDefense.max
    ),
    speed: getStatValueByLevel(
      level,
      statsTable.speed.min,
      statsTable.speed.max
    ),
  };
}

module.exports = {
  cryptures,
  attacksTable,
  getCrypture: async (cryptureId) => {
    let crypture = await cryptureContract.getCryptureInfo(cryptureId);
    let ownerAddress = await cryptureContract.ownerOf(cryptureId);

    const [code, level, xp, fedDate, washedDate, attacks] = crypture;

    let parsedFedDate = new Date(fedDate * 1000);
    let parsedWashedDate = new Date(washedDate * 1000);

    return {
      id: parseInt(cryptureId),
      code: code.toNumber(),
      name: cryptures[code].name,
      type: cryptures[code].type,
      image: `http://localhost:8000/cryptures/images/${code}.png`,
      level,
      xp: xp.toNumber(),
      xpToNextLevel: (4 * Math.pow((level / 255) * 100, 3)) / 5,
      fedDate: parsedFedDate,
      fedPercentage:
        (new Date().getTime() - parsedFedDate.getTime()) / 86400000,
      washedDate: parsedWashedDate,
      washedPercentage:
        1 - (new Date().getTime() - parsedWashedDate.getTime()) / 86400000,
      stats: getStatsByLevel(code, level, cryptures[code.toNumber()].stats),
      attacks: attacks.map((attackId) => attacksTable[attackId]),
      ownerAddress,
    };
  },
};
