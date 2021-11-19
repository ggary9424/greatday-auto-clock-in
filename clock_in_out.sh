#!/bin/bash

now=$(date +"%T")
echo "Execution time: $now"

datetime=$(curl 'https://apigonbcv2.dataon.com/currentTime' \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -H 'Cache-Control: no-cache' \
  -H 'Accept: application/json' \
  -H "Authorization: $AUTHORIZATION" \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -H 'Sec-GPC: 1' \
  -H 'Origin: https://app.greatdayhr.com' \
  -H 'Sec-Fetch-Site: cross-site' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Referer: https://app.greatdayhr.com/' \
  -H 'Accept-Language: en-US,en;q=0.9' \
  --compressed  2>/dev/null | jq --raw-output '"\(.data)"')

echo "datetime: $datetime"

# curl 'https://apigonbcv2.dataon.com/attendanceSf6/AddToTemp?' \
#   -H 'Connection: keep-alive' \
#   -H 'Pragma: no-cache' \
#   -H 'Cache-Control: no-cache' \
#   -H 'Accept: application/json' \
#   -H 'timeout: undefined' \
#   -H "Authorization: $AUTHORIZATION" \
#   -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36' \
#   -H 'Content-Type: application/json; charset=UTF-8' \
#   -H 'Sec-GPC: 1' \
#   -H 'Origin: https://app.greatdayhr.com' \
#   -H 'Sec-Fetch-Site: cross-site' \
#   -H 'Sec-Fetch-Mode: cors' \
#   -H 'Sec-Fetch-Dest: empty' \
#   -H 'Referer: https://app.greatdayhr.com/' \
#   -H 'Accept-Language: en-US,en;q=0.9' \
#   --data-raw '{"empid":"'"$EMPLOYEE_ID"'","companyId":'"$COMPANY_ID"',"datetime":"'"$datetime"'","geolocation":{"latitude":0,"longitude":0},"photo":"","attOn":"online","address":null}' \
#   --compressed

# curl 'https://apigonbcv2.dataon.com/attendanceSf6/getBreakButton?' \
#   -H 'Connection: keep-alive' \
#   -H 'Pragma: no-cache' \
#   -H 'Cache-Control: no-cache' \
#   -H 'Accept: application/json' \
#   -H 'timeout: undefined' \
#   -H "Authorization: $AUTHORIZATION" \
#   -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36' \
#   -H 'Content-Type: application/json; charset=utf-8' \
#   -H 'Sec-GPC: 1' \
#   -H 'Origin: https://app.greatdayhr.com' \
#   -H 'Sec-Fetch-Site: cross-site' \
#   -H 'Sec-Fetch-Mode: cors' \
#   -H 'Sec-Fetch-Dest: empty' \
#   -H 'Referer: https://app.greatdayhr.com/' \
#   -H 'Accept-Language: en-US,en;q=0.9' \
#   --compressed

# curl 'https://apigonbcv2.dataon.com/attendances/getNewTodayAttendance?' \
#   -H 'Connection: keep-alive' \
#   -H 'Pragma: no-cache' \
#   -H 'Cache-Control: no-cache' \
#   -H 'Accept: application/json' \
#   -H 'timeout: undefined' \
#   -H "Authorization: $AUTHORIZATION" \
#   -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36' \
#   -H 'Content-Type: application/json; charset=UTF-8' \
#   -H 'Sec-GPC: 1' \
#   -H 'Origin: https://app.greatdayhr.com' \
#   -H 'Sec-Fetch-Site: cross-site' \
#   -H 'Sec-Fetch-Mode: cors' \
#   -H 'Sec-Fetch-Dest: empty' \
#   -H 'Referer: https://app.greatdayhr.com/' \
#   -H 'Accept-Language: en-US,en;q=0.9' \
#   --data-raw '{"date":"'"$datetime"'","empId":"'"$EMPLOYEE_ID"'"}' \
#   --compressed
