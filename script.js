// Selecting the elements
const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
const form = document.querySelector("form");
const submitBtn = document.querySelector(".button");
const daysResult = document.querySelector(".days-result");
const monthsResult = document.querySelector(".months-result");
const yearsResult = document.querySelector(".years-result");

let userResultDays = 0;
let userResultMonths = 0;
let userResultYears = 0;

// Get the current dates
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const currentDay = currentDate.getDate();

let months = {
  january: 31,
  february: 28,
  march: 31,
  april: 30,
  may: 31,
  june: 30,
  july: 31,
  august: 31,
  september: 30,
  october: 31,
  november: 30,
  december: 31,
};

// Leap year check
leapYear(currentYear) ? (months.february = 29) : (months.february = 28);

// Remove the defualt input required alert popups
form.addEventListener("submit", (e) => {
  e.preventDefualt();
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Get the user inputs
  let userDay = dayInput.value;
  let userMonth = monthInput.value;
  let userYear = yearInput.value;

  // Checks if the year is valid
  if (checkYear(userYear)) {
    yearInput.setAttribute("aria-invalid", "true");
    userResultYears = 0;
  } else {
    yearInput.setAttribute("aria-invalid", "false");
    userResultYears = userYear;
  }

  // Checks if the month is valid
  if (checkMonth(userMonth)) {
    monthInput.setAttribute("aria-invalid", "true");
    userResultMonths = 0;
  } else {
    monthInput.setAttribute("aria-invalid", "false");
    userResultMonths = userMonth;
  }

  // Checks if the day is valid
  if (checkDay(userDay, userMonth)) {
    dayInput.setAttribute("aria-invalid", "true");
    userResultDays = 0;
  } else {
    dayInput.setAttribute("aria-invalid", "false");
    userResultDays = userDay;
  }

  // Calculate only if the user gave an input
  if (userResultDays !== 0 && userResultMonths !== 0 && userResultYears !== 0) {
    const userAge = calculateAge(
      `${userResultYears}-${userResultMonths}-${userResultDays}`,
      userMonth
    );

    userResultDays = userAge.days;
    userResultMonths = userAge.months;
    userResultYears = userAge.years;

    // yearsResult.innerHTML = userAge.years;
    // monthsResult.innerHTML = userAge.months;
    // daysResult.innerHTML = userAge.days;

    yearsResult.innerHTML = userResultYears;
    monthsResult.innerHTML = userResultMonths;
    daysResult.innerHTML = userResultDays;
  } else {
    yearsResult.innerHTML = "- -";
    monthsResult.innerHTML = "- -";
    daysResult.innerHTML = "- -";
  }
});

// Functions
function checkDay(userDay, userMonth) {
  let monthName = Object.keys(months)[userMonth - 1];
  return (
    userDay === "" ||
    0 >= userDay ||
    userDay > 31 ||
    userDay > months[monthName]
  );
}

function checkMonth(userMonth) {
  let month = checkMonthFormat(userMonth);
  return month === "" || !(month > 0 && month < 13);
}

function checkYear(userYear) {
  return userYear === "" || userYear > currentYear || 0 > userYear;
}

function calculateAge(birthdate, userMonth) {
  // Parse the birthdate string into a Date object
  const birthDate = new Date(birthdate);
  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();

  // Calculate the difference in years
  let ageInYears = currentYear - birthYear;
  let ageInMonths = currentMonth - birthMonth;
  let ageInDays = currentDay - birthDay;

  const hasBirthYearOccured =
    birthMonth < currentMonth ||
    (birthMonth === currentMonth && birthDay < currentDay);

  const hasBirthMonthOccured = birthMonth < currentMonth;

  if (!hasBirthYearOccured) {
    ageInMonths--;
  }

  if (hasBirthMonthOccured) {
    ageInMonths--;
  }

  if (ageInDays < 0) {
    ageInDays += months[Object.keys(months)[userMonth - 1]];
  }

  return {
    years: ageInYears,
    months: ageInMonths,
    days: ageInDays,
  };
}

// Utilities
function leapYear(year) {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return true;
  } else {
    return false;
  }
}

// Check if the user typed the month like this "01" or "1"
function checkMonthFormat(userMonth) {
  // Convert the month number to string
  let monthTemp = toString(userMonth);
  if (monthTemp.length > 1) {
    if (monthTemp[0] === "0") {
      monthTemp = monthTemp[1];
      return parseInt(monthTemp);
    }
  }
  return userMonth;
}
