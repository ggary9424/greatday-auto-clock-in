const config = require("config");
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
  const startDateMoment = nowMoment.clone().subtract(1, 'month');

  const payload = {
    empId: "",
    empIds: [config.get("EMPLOYEE_ID")],
    startDate: startDateMoment.toISOString(),
    endDate: nowMoment.toISOString(),
    status: [],
    txtName: "",
    worklocationCodes: [],
  };
  const res = await client.post("att/shared/attendance/getAttendanceList", {
    headers: {
      Authorization: config.get('AUTHORIZATION'),
    },
    searchParams: {
      limit: 100,
      skip: 0,
    },
    json: payload,
  });
  
  return res.body.data;
}

module.exports = {
  getCurrentTime,
  getAttendanceList,
};
