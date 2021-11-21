const Config = require("config");
const got = require("got");
const moment = require("moment");

const client = got.extend({
  prefixUrl: "https://apigonbcv2.dataon.com/",
  headers: {}, // leave blank first
  responseType: "json",
});

async function getCurrentTime() {
  const res = await client.get("currentTime");

  return res.body.data;
}

async function getAttendanceList() {
  const nowMoment = moment();
  const startDateMoment = nowMoment.clone().subtract(1, "month");

  const payload = {
    empId: "",
    empIds: [Config.get("EMPLOYEE_ID")],
    startDate: startDateMoment.toISOString(),
    endDate: nowMoment.toISOString(),
    status: [],
    txtName: "",
    worklocationCodes: [],
  };
  const res = await client.post("att/shared/attendance/getAttendanceList", {
    headers: {
      Authorization: Config.get("AUTHORIZATION"),
    },
    searchParams: {
      limit: 100,
      skip: 0,
    },
    json: payload,
  });

  return res.body.data;
}

async function getTodayShift() {
  const currentTime = await getCurrentTime();

  const payload = {
    datetime: currentTime,
    empId: Config.get("EMPLOYEE_ID"),
  };
  const res = await client.post("attendanceSf6/getTodayShift", {
    headers: {
      Authorization: Config.get("AUTHORIZATION"),
    },
    json: payload,
  });

  // Shift data - "Shift OFF"
  // {
  //   "message": "done",
  //   "data": {
  //     "success": true,
  //     "log": null,
  //     "result": {
  //       "shiftdailycode": "OFF",
  //       "shiftdailyname": "Shift OFF",
  //       "shiftstarttime": null,
  //       "shiftendtime": null,
  //       "fromDefaultShift": 1
  //     }
  //   }
  // }
  return res.body.data;
}

async function getNewTodayAttendance() {
  const currentTime = await getCurrentTime();

  const payload = {
    datetime: currentTime,
    empId: Config.get("EMPLOYEE_ID"),
  };
  const res = await client.post("attendances/getNewTodayAttendance", {
    headers: {
      Authorization: Config.get("AUTHORIZATION"),
    },
    json: payload,
  });

  // {
  //   "message": "Today Attendance",
  //   "data": {
  //     "yesterday": {
  //       "starttime": null,
  //       "endtime": null,
  //       "actualIn": 0,
  //       "actualOut": 0,
  //       "photoStart": null,
  //       "photoEnd": null,
  //       "geolocStart": null,
  //       "geolocEnd": null,
  //       "statusDetail": [
  //         "OFF"
  //       ],
  //       "feedback": null,
  //       "flagInputStatus": "in",
  //       "actualBreak": [],
  //       "suggestion": {
  //         "attcorrectionreq": false,
  //         "leavereq": false,
  //         "overtimereq": false
  //       }
  //     },
  //     "today": {}
  //   }
  // }
  return res.body.data;
}

// Clock in and clock out use the same API
async function addToTemp() {
  const currentTime = await getCurrentTime();

  const payload = {
    empid: Config.get("EMPLOYEE_ID"),
    companyId: Config.get("COMPANY_ID"),
    datetime: currentTime,
    geolocation: {
      latitude: 0,
      longitude: 0,
    },
    photo: null,
    attOn: "online",
    address: null,
  };

  const res = await client.post("attendanceSf6/AddToTemp", {
    headers: {
      Authorization: Config.get("AUTHORIZATION"),
    },
    json: payload,
  });

  return res.body.data;
}

module.exports = {
  getCurrentTime,
  getAttendanceList,
  getTodayShift,
  getNewTodayAttendance,
  addToTemp,
};
