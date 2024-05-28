export function addTime(time1: string, time2: string): string {
  // Parse the time strings
  const [hours1, minutes1] = time1.split(':').map(Number);
  const [hours2, minutes2] = time2.split(':').map(Number);

  // Calculate total minutes
  let totalMinutes = hours1 * 60 + minutes1 + hours2 * 60 + minutes2;

  // Calculate new hours and minutes
  const newHours = Math.floor(totalMinutes / 60) % 24; // Ensure result is within 24 hours
  const newMinutes = totalMinutes % 60;

  // Format new time string
  const newTimeString = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;

  return newTimeString;
}

export function compareTime(str1: string, str2: string) : number {
  if (str1 === str2) {
    return 0;
  }
  var time1 = str1.split(':');
  var time2 = str2.split(':');
  if (eval(time1[0]) > eval(time2[0])) {
    return 1;
  } else if (
    eval(time1[0]) == eval(time2[0]) &&
    eval(time1[1]) > eval(time2[1])
  ) {
    return 1;
  } else {
    return -1;
  }
}
