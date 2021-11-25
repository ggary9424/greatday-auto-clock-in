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

  if (_.get(todayAttendance, "statusDetail", []).includes("ANL")) {
    console.log("Thank for your hard work! Enjoy your annual leave :D");
    return;
  }

  if (_.isEmpty(todayAttendance)) {
    const scheduledWorkStartTimeMoment = moment
      .tz(TIMEZONE_TAIPEI)
      .startOf("day")
      .add(9, "hours");
    const currentTimeString = await greatday.getCurrentTime();
    const currentTimeMoment = moment(currentTimeString);
    if (currentTimeMoment.isAfter(scheduledWorkStartTimeMoment)) {
      console.log("clocking in...");
      await greatday.addToTemp();
      console.log("clocked in...");
    } else {
      console.log("Sleep tight baby Zzz!");
    }
    return;
  }

  if (todayAttendance.endtime === null) {
    const currentTimeString = await greatday.getCurrentTime();
    const currentTimeMoment = moment(currentTimeString);
    const workStartTimeMoment = moment(todayAttendance.starttime);

    // There are some bugs on Greatday here.
    // The "endtime" gave to us somehow is plus by 8 hours. (I think it is for display usage)
    // So we let current time also plus 8 hours here.
    currentTimeMoment.add(8, "hours");

    if (currentTimeMoment.diff(workStartTimeMoment, "minutes") > 9 * 60) {
      console.log("clocking out...");
      await greatday.addToTemp();
      console.log("clocked out...");
    } else {
      console.log("It is still in the working time. Cheer up!!!");
    }
    return;
  }

  console.log("Do a great job today :))");
})();
