enum DAYS_OF_WEEK {
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
  SUNDAY = 0
}

enum ORDER {
  FIRST = 0,
  SECOND = 1,
  THIRD = 2,
  FOURTH = 3,
  FIFTH = 4
}

const dateFrom: string = '2023-01-01';
const dateTo: string = '2024-12-31';

const dayOfWeek: number = 1;

const weekNumber: number = 1;
filterPrimaryDates(dateFrom, dateTo, DAYS_OF_WEEK.TUESDAY, weekNumber, ORDER.FIRST);

function filterPrimaryDates(dateFrom: string, dateTo: string, dayOfWeek: DAYS_OF_WEEK, weekNumber: number, order: ORDER) {
  const dates = populateDatesRange(dateFrom, dateTo);
  const filteredByMonthsDates = filterByWeekNumber(dates, weekNumber);
  // set one day of every month in array
  const filterSingleDayInMounth = getOneDayFromMonth(filteredByMonthsDates)
  const arrayOfSpecificDaysOfMonth = createArrayOfSpecificDaysOfMonth(filterSingleDayInMounth, dayOfWeek, order);


  console.log('=-=====================')
  arrayOfSpecificDaysOfMonth.forEach(element => console.log(element))
}

function createArrayOfSpecificDaysOfMonth(dates: string[], day: DAYS_OF_WEEK, order: ORDER ) {
  const filteredDates:string[] = [];

  dates.forEach(element => {
    const foundElement = getDaysOfMonth(element, day, order)
    filteredDates.push(foundElement);
  })

  return filteredDates;
}

function getOneDayFromMonth(dates: string[]) {
  const filterDates: string[] = [];

  dates.forEach(element => {
    const toFoundElement = element.slice(0, 7)

    let hasFound = false;
    for (let index = 0; index < filterDates.length; index++) {
      const element = filterDates[index].slice(0, 7)
      if(element === toFoundElement) {
        hasFound = true;
      }      
    }
    
    if(!hasFound) {
      filterDates.push(element);
    }
  })

  return filterDates;
}

function filterByWeekNumber(dates:string[], weekNumber: number) {
  let startMonth = new Date(dates[0]).getMonth()
  let nextMonth = divideByWeekNumber(startMonth, weekNumber);
  const filterByMonthsDates: string[] = [];

  for (let index = 0; index < dates.length; index++) {
    let isWeekNumber = false;
    const date = new Date(dates[index])
    const currentMonth = date.getMonth();

    if(currentMonth === startMonth) {
      filterByMonthsDates.push(dates[index])
      isWeekNumber = true;
    }

    const lastDay = getLastDayOfMonth(date.getFullYear(), date.getMonth()) 
    const currentDay = date.getDate();  
    
    if(currentDay === lastDay && isWeekNumber) {
      startMonth = nextMonth;
      nextMonth = divideByWeekNumber(startMonth, weekNumber);
    }
  }  
  return filterByMonthsDates;
}

function divideByWeekNumber(month: number, weekNumber: number) {
  const months = [0,1,2,3,4,5,6,7,8,9,10,11];
  let indexToReturn = month + weekNumber;
  
  if(indexToReturn >= months.length) {
    indexToReturn = indexToReturn - months.length;
  }

  return months[indexToReturn];
}

function populateDatesRange(dateFrom: string, dateTo: string) {
  const arr: string[] =[];
  for(let dt=new Date(dateFrom); dt<= new Date(dateTo); dt.setDate(dt.getDate()+1)){
    arr.push(dt.toISOString().slice(0, 10));
  }
  return arr;
}

function getLastDayOfMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate(); 
}



// const mondays = getDaysOfMonth('2023-05-01', DAYS_OF_WEEK.MONDAY, 0)
// console.log(mondays)

// this function provides e.g. all mondays of january
function getDaysOfMonth(date: string, day: DAYS_OF_WEEK, order: number ) {
  var d = new Date(date),
      month = d.getMonth(),
      foundDay = [];

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

  foundDay = foundDay.map(element => element.toISOString().slice(0, 10))

  return foundDay[order];
}