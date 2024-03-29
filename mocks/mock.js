module.exports = {
  input: {
    devices: [
      {
        id: "F972B82BA56A70CC579945773B6866FB",
        name: "Посудомоечная машина",
        power: 950,
        duration: 3,
        mode: "night"
      },
      {
        id: "C515D887EDBBE669B2FDAC62F571E9E9",
        name: "Духовка",
        power: 2000,
        duration: 2,
        mode: "day"
      },
      {
        id: "02DDD23A85DADDD71198305330CC386D",
        name: "Холодильник",
        power: 50,
        duration: 24
      },
      {
        id: "1E6276CC231716FE8EE8BC908486D41E",
        name: "Термостат",
        power: 50,
        duration: 24
      },
      {
        id: "7D9DC84AD110500D284B33C82FE6E85E",
        name: "Кондиционер",
        power: 850,
        duration: 1
      }
    ],
    rates: [
      {
        from: 7,
        to: 10,
        value: 6.46
      },
      {
        from: 10,
        to: 17,
        value: 5.38
      },
      {
        from: 17,
        to: 21,
        value: 6.46
      },
      {
        from: 21,
        to: 23,
        value: 5.38
      },
      {
        from: 23,
        to: 7,
        value: 1.79
      }
    ],
    maxPower: 2100
  },
  output: {
    schedule: {
      "0": [
        "02DDD23A85DADDD71198305330CC386D",
        "1E6276CC231716FE8EE8BC908486D41E",
        "F972B82BA56A70CC579945773B6866FB"
      ],
      "1": [
        "02DDD23A85DADDD71198305330CC386D",
        "1E6276CC231716FE8EE8BC908486D41E",
        "F972B82BA56A70CC579945773B6866FB"
      ],
      "2": [
        "02DDD23A85DADDD71198305330CC386D",
        "1E6276CC231716FE8EE8BC908486D41E",
        "F972B82BA56A70CC579945773B6866FB"
      ],
      "3": [
        "02DDD23A85DADDD71198305330CC386D",
        "1E6276CC231716FE8EE8BC908486D41E"
      ],
      "4": [
        "02DDD23A85DADDD71198305330CC386D",
        "1E6276CC231716FE8EE8BC908486D41E"
      ],
      "5": [
        "02DDD23A85DADDD71198305330CC386D",
        "1E6276CC231716FE8EE8BC908486D41E"
      ],
      "6": [
        "02DDD23A85DADDD71198305330CC386D",
        "1E6276CC231716FE8EE8BC908486D41E"
      ],
      "7": [
        "02DDD23A85DADDD71198305330CC386D",
        "1E6276CC231716FE8EE8BC908486D41E"
      ],
      "8": [
        "02DDD23A85DADDD71198305330CC386D",
        "1E6276CC231716FE8EE8BC908486D41E"
      ],
      "9": [
        "02DDD23A85DADDD71198305330CC386D",
        "1E6276CC231716FE8EE8BC908486D41E"
      ],
      "10": [
        "02DDD23A85DADDD71198305330CC386D",
        "1E6276CC231716FE8EE8BC908486D41E",
        "C515D887EDBBE669B2FDAC62F571E9E9"
      ],
      "11": [
        "02DDD23A85DADDD71198305330CC386D",
        "1E6276CC231716FE8EE8BC908486D41E",
        "C515D887EDBBE669B2FDAC62F571E9E9"
      ],
      "12": [
        "02DDD23A85DADDD71198305330CC386D",
        "1E6276CC231716FE8EE8BC908486D41E"
      ],
      "13": [
        "02DDD23A85DADDD71198305330CC386D",
        "1E6276CC231716FE8EE8BC908486D41E"
      ],
      "14": [
        "02DDD23A85DADDD71198305330CC386D",
        "1E6276CC231716FE8EE8BC908486D41E"
      ],
      "15": [
        "02DDD23A85DADDD71198305330CC386D",
        "1E6276CC231716FE8EE8BC908486D41E"
      ],
      "16": [
        "02DDD23A85DADDD71198305330CC386D",
        "1E6276CC231716FE8EE8BC908486D41E"
      ],
      "17": [
        "02DDD23A85DADDD71198305330CC386D",
        "1E6276CC231716FE8EE8BC908486D41E"
      ],
      "18": [
        "02DDD23A85DADDD71198305330CC386D",
        "1E6276CC231716FE8EE8BC908486D41E"
      ],
      "19": [
        "02DDD23A85DADDD71198305330CC386D",
        "1E6276CC231716FE8EE8BC908486D41E"
      ],
      "20": [
        "02DDD23A85DADDD71198305330CC386D",
        "1E6276CC231716FE8EE8BC908486D41E"
      ],
      "21": [
        "02DDD23A85DADDD71198305330CC386D",
        "1E6276CC231716FE8EE8BC908486D41E"
      ],
      "22": [
        "02DDD23A85DADDD71198305330CC386D",
        "1E6276CC231716FE8EE8BC908486D41E"
      ],
      "23": [
        "02DDD23A85DADDD71198305330CC386D",
        "1E6276CC231716FE8EE8BC908486D41E",
        "7D9DC84AD110500D284B33C82FE6E85E"
      ]
    },
    consumedEnergy: {
      value: 38.939,
      devices: {
        F972B82BA56A70CC579945773B6866FB: 5.1015,
        C515D887EDBBE669B2FDAC62F571E9E9: 21.52,
        "02DDD23A85DADDD71198305330CC386D": 5.398,
        "1E6276CC231716FE8EE8BC908486D41E": 5.398,
        "7D9DC84AD110500D284B33C82FE6E85E": 1.5215
      }
    }
  }
};
