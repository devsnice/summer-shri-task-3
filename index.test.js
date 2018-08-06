const {
  solution,
  DAY_BEGIN_HOUR,
  DAY_END_HOUR,
  findSlot,
  createEmptyDaySchedule,
  getPeriodForDevice,
  createHourRateHash,
  createDevicesHash,
  getFormattedDevicesSchedule,
  calculateConsumedEnergy
} = require("./index");

const mockData = require("./mocks/mock");

describe("Tests for task", () => {
  describe("test solution on mock data", () => {
    test("should return correct solution on a default mock data", () => {
      const result = solution(mockData.input);

      expect(result.consumedEnergy.value).toBe(mockData.output.consumedEnergy.value);
    });

    test("should return correct solution in case when device sorting define result", () => {
      const input = {
        devices: [
          {
            id: "1",
            name: "Посудомоечная машина",
            power: 100,
            duration: 12
          },
          {
            id: "2",
            name: "Духовка",
            power: 150,
            duration: 12
          }
        ],
        rates: [
          {
            from: 7,
            to: 19,
            value: 1
          },
          {
            from: 19,
            to: 7,
            value: 3
          }
        ],
        maxPower: 200
      };

      const output = {
        consumedEnergy: {
          value: 5.4
        }
      };

      const result = solution(input);

      expect(result.consumedEnergy.value).toBe(output.consumedEnergy.value);
    });
  });

  describe("test how solution throws errors", () => {
    it("should throw error, when there isn't slots for all devices", () => {
      const input = {
        devices: [
          {
            id: "1",
            name: "Посудомоечная машина",
            power: 1000
          }
        ],
        rates: [
          {
            from: 7,
            to: 7,
            value: 1
          }
        ],
        maxPower: 200
      };

      try {
        const result = solution(input);

        expect(true).toBe(false);
      } catch (err) {
        expect(err).toEqual(new Error("Device with id 1 hasn't slot in schedule"));
      }
    });
  });

  describe("test utilites", () => {
    describe("findSlot()", () => {
      let schedule;
      let maxPower = 1000;
      let hashRates;

      // helper
      const fillInSchedule = (slot, device) => {
        for (let i = slot.from; i < slot.to; i++) {
          schedule[i] = {
            usedPower: schedule[i].usedPower + device.power,
            devices: [...schedule[i].devices, device.id]
          };
        }
      };

      beforeEach(() => {
        schedule = createEmptyDaySchedule();
        hashRates = createHourRateHash([
          {
            from: 7, // from begin from first day
            to: 7, // to begin of next day
            value: 1
          }
        ]);
      });

      test("should find correct slot for device, which work 1 hour, when schedule is empty", () => {
        const device = {
          id: "1",
          name: "Посудомоечная машина",
          power: 1000,
          duration: 1
        };

        const slot = findSlot({
          hashDaySchedule: schedule,
          hashRates,
          maxPower,
          device
        });

        expect(slot).toEqual({
          from: 0,
          to: 1,
          value: 1
        });
      });

      test("should find correct slot for device, which works severals hours, when schedule is empty", () => {
        const device = {
          id: "1",
          name: "Посудомоечная машина",
          power: 1000,
          duration: 10
        };

        const slot = findSlot({
          hashDaySchedule: schedule,
          hashRates,
          maxPower,
          device
        });

        expect(slot).toEqual({
          from: 0,
          to: 10,
          value: 10 // 10 hours * 1
        });
      });

      test("should find correct slot for device, when schedule isn't empty", () => {
        const device = {
          id: "1",
          name: "Посудомоечная машина",
          power: 1000,
          duration: 10
        };
        const deviceIron = {
          id: "2",
          name: "Утюг",
          power: 1000,
          duration: 1
        };

        const slot = findSlot({
          hashDaySchedule: schedule,
          hashRates,
          maxPower,
          device
        });

        fillInSchedule(slot, device);

        const slotForIron = findSlot({
          hashDaySchedule: schedule,
          hashRates,
          maxPower,
          device: deviceIron
        });

        // device with id = "1" works from 0 to 10
        expect(slot).toEqual({
          from: 0,
          to: 10,
          value: 10 // 10 hours * 1
        });

        // device with id = "2" works from 10 to 11
        expect(slotForIron).toEqual({
          from: 10,
          to: 11,
          value: 1 // 1 hour * 1
        });
      });

      test("should find better slot inside schedule and return a correct rate value", () => {
        hashRates = createHourRateHash([
          {
            from: 7,
            to: 8,
            value: 1
          },
          {
            from: 8,
            to: 9,
            value: 2
          },
          {
            from: 9,
            to: 12,
            value: 0.5
          },
          {
            from: 12,
            to: 7,
            value: 10
          }
        ]);

        const device = {
          id: "1",
          name: "Посудомоечная машина",
          power: 1000,
          duration: 4
        };

        const slot = findSlot({
          hashDaySchedule: schedule,
          hashRates,
          maxPower,
          device
        });

        // bettet slot from 8 to 12, value 2 + 0.5 * 3 = 3.5

        expect(slot.value).toBe(3.5);
      });
    });

    describe("getPeriodForDevice()", () => {
      test("should return correct period for day", () => {
        const period = getPeriodForDevice("day");

        expect(period).toEqual({
          beginPeriod: 0,
          endPeriod: 14
        });
      });

      test("should return correct period for night", () => {
        const period = getPeriodForDevice("night");

        expect(period).toEqual({
          beginPeriod: 14,
          endPeriod: 24
        });
      });

      test("should return correct period for undefined", () => {
        const period = getPeriodForDevice();

        expect(period).toEqual({
          beginPeriod: 0,
          endPeriod: 24
        });
      });
    });

    describe("createHourRateHash()", () => {
      test("should create correct hash for one rate during day", () => {
        const rates = [
          {
            from: 0,
            to: 23,
            value: 1
          }
        ];

        const hashRates = createHourRateHash(rates);

        expect(hashRates["0"]).toBe(1);
        expect(hashRates["10"]).toBe(1);
        expect(hashRates["15"]).toBe(1);
      });

      test("should create correct hash for several rates during day", () => {
        const rates = [
          {
            from: 7,
            to: 15,
            value: 1
          },
          {
            from: 15,
            to: 7,
            value: 10
          }
        ];

        const hashRates = createHourRateHash(rates);

        expect(hashRates["0"]).toBe(1); // 7 hour transform to 0
        expect(hashRates["7"]).toBe(1); // 14 hour transform to 0
        expect(hashRates["23"]).toBe(10); // 6 hour transform to 23
      });
    });

    describe("createDevicesHash()", () => {
      it("should create correct hash", () => {
        const devices = [
          {
            id: "testDeviceId",
            field: "test"
          }
        ];

        const hashDevices = createDevicesHash(devices);

        expect(hashDevices["testDeviceId"].field).toBe("test");
      });
    });

    describe("getFormattedDevicesSchedule()", () => {
      test("should get correct formatted schedule", () => {
        const hour = 0;
        const hourInTaskMeasuring = hour + DAY_BEGIN_HOUR;

        const schedule = {
          [hour]: {
            usedPower: 100,
            devices: ["testDeviceId"]
          }
        };

        const formattedResult = getFormattedDevicesSchedule(schedule);

        expect(formattedResult[hourInTaskMeasuring]).toEqual(schedule[hour].devices);
      });
    });

    describe("calculateConsumedEnergy()", () => {});
  });
});
