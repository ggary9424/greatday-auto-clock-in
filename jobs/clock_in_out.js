const _ = require("lodash");
const moment = require("moment-timezone");

const greatday = require("../lib/greatday");

const TIMEZONE_TAIPEI = "Asia/Taipei";

(async () => {
  const shiftdailycode = _.get(
    await greatday.getTodayShift(),
    "result.shiftdailycode"
  );

  if (shiftdailycode !== "SHREGULAR") {
    console.log("No need to clock in and out todoy!");
    return;
  }

  const todayAttendance = _.get(
    await greatday.getNewTodayAttendance(),
    "today"
  );

  if (_.isEmpty(todayAttendance)) {
    const scheduledWorkStartTimeMoment = moment
      .tz(TIMEZONE_TAIPEI)
      .startOf("day")
      .add(9, "hours");
    const currentTimeString = await greatday.getCurrentTime();
    const currentTimeMoment = moment(currentTimeString);
    if (currentTimeMoment.isAfter(scheduledWorkStartTimeMoment)) {
      console.log("clock in");
    }
    return;
  }

  if (todayAttendance.endtime === null) {
    const currentTimeString = await greatday.getCurrentTime();
    const currentTimeMoment = moment(currentTimeString);
    const workStartTimeMoment = moment(todayAttendance.starttime);

    // There are some bugs on Greatday here. The endtime gave is not as we expected.
    if (currentTimeMoment.diff(workStartTimeMoment, "hours") > 9) {
      console.log("clock out");
    }
    return;
  }

  console.log("Do a great job today :))");
})();
