export function convertDaysOfWeekWithTime(unixUtc: number | null, withTime: boolean): string {
  const date = Date.now();
  const a = new Date((unixUtc || date) * 1000);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = days[a.getDay()];
  const hours = a.toLocaleString("en-US", { hour: "numeric", hour12: true });
  return dayOfWeek + (withTime ? " " + hours : "");
}

export function degToCompass(num: number) {
  var val = Math.floor(num / 22.5 + 0.5);
  var arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
}

export function speedConverter(numb: number, unit: string) {
  console.log(unit);
  if (unit === "F") return numb / 1.609344;
  return numb * 1.609344;
}

export function temperatureConverter(numb: number, unit: string) {
  if (unit === "F") return numb * 1.8 + 32;
  return (numb - 32) / 1.8;
}
