const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
const form = document.querySelector("form");
const submitBtn = document.querySelector(".button");

const Months = {
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

// Month variables
const minMonth = 1;
const maxMonth = 12;
// Year variables
const CurrentYear = 2023;

// Remove the defualt alerts
// form.addEventListener("submit", () => {
//   e.preventDefualt();
// });

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let day = dayInput.innerHTML;
  let month = monthInput.innerHTML;
  let year = yearInput.innerHTML;
  //   if (checkDay(day) && checkMonth(month) && checkYear(year)) {
  //   }
  console.log(day);
  console.log(dayInput);
  console.log(checkDay(parseInt(day)));
  if (!checkDay(parseInt(day))) {
    dayInput.setAttribute("aria-invalid", "true");
  }
});

const checkDay = (day) => {
  // return (day === " " || day < minDay || day > maxDay);
  if (day === "") {
    return false;
  } else if (day < minDay || day > maxDay) {
    return false;
  } else {
    return true;
  }
};

const checkMonth = (month) => {
  return month === "" || month < minMonth || month > maxMonth;
};

const checkYear = (year) => {
  return year === "" || year > CurrentYear;
};

const calculateAge = (days, months, years) => {
  const age = {
    userDays: 31 - days,
    userMonths: 12 - months,
    userYears: CurrentYear - years,
  };
  return age;
};