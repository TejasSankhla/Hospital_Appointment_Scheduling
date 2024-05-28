export function getDayFromDate(date: Date) {
  // Array to map day numbers to day names
  const daysOfWeek = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  const dayNumber = date.getDay();
  return daysOfWeek[dayNumber];
}
