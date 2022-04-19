import dayjs from 'dayjs';

export const getWeek = () => {
  var currentDay = dayjs();
  var theYear = currentDay.year();
  var theMonth = currentDay.month();
  var theDate = currentDay.date();
  var theDayOfWeek = currentDay.day();

  var thisWeek = [];

  for (var i = 0; i < 7; i++) {
    var resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek));
    var yyyy = resultDay.getFullYear();
    var mm = Number(resultDay.getMonth()) + 1;
    var dd = resultDay.getDate();

    mm = String(mm).length === 1 ? '0' + mm : mm;
    dd = String(dd).length === 1 ? '0' + dd : dd;

    thisWeek[i] = yyyy + '-' + mm + '-' + dd;
  }

  return thisWeek;
};

export const getMonth = () => {
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return { firstDay, lastDay };
};
