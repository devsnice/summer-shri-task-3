const data = require("./mocks/mock");

/**
 * There's greedy algorithm consisted from next steps:
 *
 * 1) Take devices from List
 * 2) Find a slot in the schedule, which has the minimal rate
 * 3) Repeat
 */
const solution = data => {
  const { devices, rates, maxPower } = data;

  // Transform hours origin to 0 - 24 hours for convenient work
  const hashDaySchedule = createEmptyDaySchedule();
  const hashRates = createHourRateHash(rates);
  const hashDevices = createDevicesHash(devices);

  while (devices.length) {
    const device = devices.pop();

    const slot = findSlot({
      hashDaySchedule,
      hashRates,
      maxPower,
      device
    });

    // Fill information in the schedule
    for (let i = slot.from; i < slot.to; i++) {
      hashDaySchedule[i] = {
        usedPower: hashDaySchedule[i].usedPower + device.power,
        devices: [...hashDaySchedule[i].devices, device.id]
      };
    }
  }

  const devicesSchedule = getFormattedDevicesSchedule(hashDaySchedule);
  const consumedEnergy = calculateConsumedEnergy(hashDaySchedule, hashRates, hashDevices);

  return {
    schedule: devicesSchedule,
    consumedEnergy: consumedEnergy
  };
};

/**
 * It is looking for a slot with minimum power rate
 * inside a period when device can work
 *
 * @param {*} device
 * @returns {*} slot
 */
const findSlot = ({ hashDaySchedule, hashRates, maxPower, device }) => {
  const { duration, mode } = device;

  const { beginPeriod, endPeriod } = getPeriodForDevice(mode);

  let bestSlotVariant;

  // Take hour, when device can start to work
  for (let i = beginPeriod; i <= endPeriod - duration; i++) {
    let rateForThisSlot = 0;
    let isVariant = true;

    // Take next hours after begin to ensure, that there's enough power for device
    for (let j = 0; j < duration && isVariant; j++) {
      const currentHour = i + j;

      const hourInSchedule = hashDaySchedule[currentHour];
      const usedPowerWillExceedMax = hourInSchedule.usedPower + device.power > maxPower;

      if (usedPowerWillExceedMax) {
        isVariant = false;

        return;
      }

      const rateInThisHour = hashRates[currentHour];

      rateForThisSlot += rateInThisHour;
    }

    // If current slot is convenient for device
    if (isVariant) {
      const slot = {
        from: i,
        to: i + duration,
        value: rateForThisSlot
      };

      // If there isn't best slot yet, current slot will best
      if (!bestSlotVariant) {
        bestSlotVariant = slot;
        // If there's best variant, check that current slot is better
      } else if (bestSlotVariant.value > slot.value) {
        bestSlotVariant = slot;
      }
    }
  }

  return bestSlotVariant;
};

/**
 *
 */
const createEmptyDaySchedule = () => {
  const schedule = {};

  for (i = 0; i < 24; i++) {
    schedule[i] = {
      usedPower: 0,
      devices: []
    };
  }

  return schedule;
};

/**
 *
 * @param {*} mode
 */
const getPeriodForDevice = mode => {
  const partOfDay = mode || "allDay";

  const periods = {
    day: {
      beginPeriod: 0,
      endPeriod: 21 - 7
    },
    night: {
      beginPeriod: 21 - 7,
      endPeriod: 24
    },
    allDay: {
      beginPeriod: 0,
      endPeriod: 24
    }
  };

  return periods[partOfDay];
};

/**
 *
 * @param {*} rates
 */
const createHourRateHash = rates => {
  const hash = {};

  rates.forEach(rate => {
    // transform time origin to 0:00 - 23:00
    const rateTo = rate.to - 7 <= 0 ? rate.to - 7 + 24 : rate.to;

    for (let hour = rate.from - 7; hour < rateTo; hour++) {
      hash[hour] = rate.value;
    }
  });

  return hash;
};

/**
 *
 * @param {*} devices
 */
const createDevicesHash = devices => {
  const hash = {};

  devices.map(device => {
    hash[device.id] = device;
  });

  return hash;
};

const getFormattedDevicesSchedule = hashDaySchedule => {
  const hash = {};

  Object.values(hashDaySchedule).map((hourSchedule, hour) => {
    // transform time origin to 07:00 - 06:00
    const correctHour = (hour + 7) % 24;

    hash[correctHour] = hourSchedule.devices;
  });

  return hash;
};

/**
 * Calculate consumed energy for day schedule
 *
 * @param {*} schedule
 * @param {*} hashRates
 * @param {*} hashDevices
 */
const calculateConsumedEnergy = (schedule, hashRates, hashDevices) => {
  let consumedEnergy = 0;
  const consumedEnergyEnergyByDevices = {};

  Object.values(schedule).map((hour, hourNumber) => {
    const consumedDevicesEnergy = (hour.usedPower * hashRates[hourNumber]) / 1000;

    consumedEnergy = consumedEnergy + consumedDevicesEnergy;

    hour.devices.forEach(deviceId => {
      let usedPowerWithCurrentDevice = 0;

      const comsumedDeviceEnergy = (hashDevices[deviceId].power * hashRates[hourNumber]) / 1000;

      if (!consumedEnergyEnergyByDevices[deviceId]) {
        usedPowerWithCurrentDevice = comsumedDeviceEnergy;
      } else {
        usedPowerWithCurrentDevice = consumedEnergyEnergyByDevices[deviceId] + comsumedDeviceEnergy;
      }

      consumedEnergyEnergyByDevices[deviceId] = usedPowerWithCurrentDevice;
    });
  });

  return {
    value: parseFloat(consumedEnergy.toFixed(3)),
    devices: consumedEnergyEnergyByDevices
  };
};

module.exports = solution;
