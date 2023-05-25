var DAYS_OF_WEEK;
(function (DAYS_OF_WEEK) {
    DAYS_OF_WEEK[DAYS_OF_WEEK["MONDAY"] = 1] = "MONDAY";
    DAYS_OF_WEEK[DAYS_OF_WEEK["TUESDAY"] = 2] = "TUESDAY";
    DAYS_OF_WEEK[DAYS_OF_WEEK["WEDNESDAY"] = 3] = "WEDNESDAY";
    DAYS_OF_WEEK[DAYS_OF_WEEK["THURSDAY"] = 4] = "THURSDAY";
    DAYS_OF_WEEK[DAYS_OF_WEEK["FRIDAY"] = 5] = "FRIDAY";
    DAYS_OF_WEEK[DAYS_OF_WEEK["SATURDAY"] = 6] = "SATURDAY";
    DAYS_OF_WEEK[DAYS_OF_WEEK["SUNDAY"] = 0] = "SUNDAY";
})(DAYS_OF_WEEK || (DAYS_OF_WEEK = {}));
var ORDER;
(function (ORDER) {
    ORDER[ORDER["FIRST"] = 0] = "FIRST";
    ORDER[ORDER["SECOND"] = 1] = "SECOND";
    ORDER[ORDER["THIRD"] = 2] = "THIRD";
    ORDER[ORDER["FOURTH"] = 3] = "FOURTH";
    ORDER[ORDER["FIFTH"] = 4] = "FIFTH";
})(ORDER || (ORDER = {}));
var dateFrom = '2023-01-01';
var dateTo = '2024-12-31';
var dayOfWeek = 1;
var weekNumber = 1;
filterPrimaryDates(dateFrom, dateTo, DAYS_OF_WEEK.TUESDAY, weekNumber, ORDER.FIRST);
function filterPrimaryDates(dateFrom, dateTo, dayOfWeek, weekNumber, order) {
    var dates = populateDatesRange(dateFrom, dateTo);
    var filteredByMonthsDates = filterByWeekNumber(dates, weekNumber);
    // set one day of every month in array
    var filterSingleDayInMounth = getOneDayFromMonth(filteredByMonthsDates);
    var arrayOfSpecificDaysOfMonth = createArrayOfSpecificDaysOfMonth(filterSingleDayInMounth, dayOfWeek, order);
    console.log('=-=====================');
    arrayOfSpecificDaysOfMonth.forEach(function (element) { return console.log(element); });
}
function createArrayOfSpecificDaysOfMonth(dates, day, order) {
    var filteredDates = [];
    dates.forEach(function (element) {
        var foundElement = getDaysOfMonth(element, day, order);
        filteredDates.push(foundElement);
    });
    return filteredDates;
}
function getOneDayFromMonth(dates) {
    var filterDates = [];
    dates.forEach(function (element) {
        var toFoundElement = element.slice(0, 7);
        var hasFound = false;
        for (var index = 0; index < filterDates.length; index++) {
            var element_1 = filterDates[index].slice(0, 7);
            if (element_1 === toFoundElement) {
                hasFound = true;
            }
        }
        if (!hasFound) {
            filterDates.push(element);
        }
    });
    return filterDates;
}
function filterByWeekNumber(dates, weekNumber) {
    var startMonth = new Date(dates[0]).getMonth();
    var nextMonth = divideByWeekNumber(startMonth, weekNumber);
    var filterByMonthsDates = [];
    for (var index = 0; index < dates.length; index++) {
        var isWeekNumber = false;
        var date = new Date(dates[index]);
        var currentMonth = date.getMonth();
        if (currentMonth === startMonth) {
            filterByMonthsDates.push(dates[index]);
            isWeekNumber = true;
        }
        var lastDay = getLastDayOfMonth(date.getFullYear(), date.getMonth());
        var currentDay = date.getDate();
        if (currentDay === lastDay && isWeekNumber) {
            startMonth = nextMonth;
            nextMonth = divideByWeekNumber(startMonth, weekNumber);
        }
    }
    return filterByMonthsDates;
}
function divideByWeekNumber(month, weekNumber) {
    var months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    var indexToReturn = month + weekNumber;
    if (indexToReturn >= months.length) {
        indexToReturn = indexToReturn - months.length;
    }
    return months[indexToReturn];
}
function populateDatesRange(dateFrom, dateTo) {
    var arr = [];
    for (var dt = new Date(dateFrom); dt <= new Date(dateTo); dt.setDate(dt.getDate() + 1)) {
        arr.push(dt.toISOString().slice(0, 10));
    }
    return arr;
}
function getLastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}
// const mondays = getDaysOfMonth('2023-05-01', DAYS_OF_WEEK.MONDAY, 0)
// console.log(mondays)
// this function provides e.g. all mondays of january
function getDaysOfMonth(date, day, order) {
    var d = new Date(date), month = d.getMonth(), foundDay = [];
    d.setDate(1);
    // Get the first Monday in the month, 1=>monday, 2=>tuesday
    while (d.getDay() !== day) {
        d.setDate(d.getDate() + 1);
    }
    // Get all the other day in the month
    while (d.getMonth() === month) {
        foundDay.push(new Date(d.getTime()));
        d.setDate(d.getDate() + 7);
    }
    foundDay = foundDay.map(function (element) { return element.toISOString().slice(0, 10); });
    return foundDay[order];
}
