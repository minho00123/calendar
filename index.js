// Get today's date
const date = new Date();

function getTodayDate (date) {
  const map = {
    m: date.getMonth() + 1,
    d: date.getDate(),
  }
  return (`${map.m}월 ${map.d}일`);
}

function getDayToday(date) {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return (days[date.getDay()]);
}

document.getElementById('mmdd').innerHTML = getTodayDate(date);
document.getElementById('day').innerHTML = getDayToday(date);

// Get the current time
const hr = date.getHours();
const min = date.getMinutes();

if (hr >= 12) {
  document.getElementById('hr').innerHTML = (hr - 12);
  document.getElementById('am').style.color = "gray"; // 색깔 바꾸기
} else {
  document.getElementById('hr').innerHTML = hr;
  document.getElementById('pm').style.color = "gray";
}

// Calculate this week
const today = [date.getFullYear(), date.getMonth(), date.getDate()];
const dayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 29];
let days = 0;

for (let i = 0; i < today[1]; i++) {
  if (i === 1) {
    if (today[0] % 400 === 0) {
      days += dayInMonth[12];
    } else if (today[0] % 4 === 0 && today[0] % 100 !== 0) {
      days += dayInMonth[12];
    } else {
      days += dayInMonth[i];
    }
  } else {
    days += dayInMonth[i];
  }
}
days += today[2];
let date_num = 0;
if (date.getDay() === 0) {
  date_num = 7;
} else {
  date_num = date.getDay();
}
let weekNum = Math.floor((days - date_num + 10) / 7); // https://annyeong.me/notes/%EC%98%A4%EB%8A%98%EC%9D%80-%EB%AA%87-%EC%A3%BC%EC%B0%A8/ 참고

if (weekNum === 0) {
  document.getElementById('week_num').innerHTML = 52;
} else {
  document.getElementById('week_num').innerHTML = weekNum;
}

// Calculate the week of days in a month

function calculateMonthWeekNum (date) {
let monthWeekNum = Math.floor((date.getDate() - date_num + 10) / 7);

  return monthWeekNum;
}

if (date.getMonth() + 1 === 1 && calculateMonthWeekNum(date) === 0) {
  document.getElementById('month_week').innerHTML = 12;
  document.getElementById('month_week_num').innerHTML = 5;
} else if (calculateMonthWeekNum(date) === 0) {
  document.getElementById('month_week').innerHTML = date.getMonth();
  document.getElementById('month_week_num').innerHTML = calculateMonthWeekNum(new Date(date.getFullYear(), date.getMonth(), 26));
} else {
  document.getElementById('month_week').innerHTML = date.getMonth() + 1;
  document.getElementById('month_week_num').innerHTML = calculateMonthWeekNum(date);
}

// Calculate the percentage of the progress bar
const todayPercentage = Math.round(days / 365 * 100);
document.getElementById('progress').setAttribute('value', todayPercentage);

// Print Calendar
function printCalendar(date) {
  let firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
  let lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  let daysInMonth = lastDate.getDate() - firstDate.getDate() + 1;
  const daysArr = ["sun", "mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  let nextDay = firstDate.getDay();
  let weekNum = 1;
  
  console.log(daysInMonth);
  for (let i = 1; i <= daysInMonth; i++) {
    let dayNow = daysArr[nextDay];
    let selectElement = document.querySelector(`#week${weekNum} > .${dayNow}`);
    selectElement.innerHTML = i;
    if (nextDay === 6) {
      weekNum++;
    }
    nextDay = (nextDay + 1) % 7;
  }
}

printCalendar(date);