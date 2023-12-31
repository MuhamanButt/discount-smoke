export const CONVERT_TO_PASCAL_CASING=(inputString)=>{
    const words = inputString.split(" ");
    const capitalizedWords = words.map((word) => {if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
  }});
    return capitalizedWords.join(" ");
}
export const IS_TIMESTAMP_GIVEN_MINUTES_OLD=(timestamp, minutes)=>{
    const oneMinuteMilliseconds = 60 * 1000;
    const currentTimestamp = new Date().getTime();
    const timeDifference = currentTimestamp - timestamp;
    const allowableTimeDifference = minutes * oneMinuteMilliseconds;
    return timeDifference <= allowableTimeDifference;
  }
export const CONVERT_HOURS_DAYS_TO_TIMESTAMP=(hours, days)=>{
  const hoursInMillis = hours * 60 * 60 * 1000;
  const daysInMillis = days * 24 * 60 * 60 * 1000;
  const expirationTime = Date.now() + hoursInMillis + daysInMillis;
  return expirationTime;
}
  export const CONVERT_TIMESTAMP_TO_DATE_TIME=(timestamp)=>{
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(month).padStart(2, "0");
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    const dateTimeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${year}-${formattedMonth}-${formattedDay} `;

    return dateTimeString;
  }
export const CONVERT_TIMESTAMP_TO_DAYS_HOURS_AND_MINUTES=(timestamp)=>{
  const currentTime = new Date().getTime();
  const timeDifference = timestamp - currentTime;
  let remainingDays=Math.floor(timeDifference / 86400000);
  let remainingMinutes=Math.floor(timeDifference / 60000) - Math.floor(timeDifference / 3600000) * 60
  let remainingHours=Math.floor(timeDifference / 3600000) -Math.floor(timeDifference / 86400000) * 24
  return {remainingDays,remainingMinutes,remainingHours}
}