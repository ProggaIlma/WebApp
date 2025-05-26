import moment from "moment";

////// debounce input
export const debounce = (func, timeout = 3000) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};
export const downloadCSVFile = ({ data, fileName, fileType }) => {
  let blob = new Blob([data], { type: fileType })

  let a = document.createElement('a')
  a.download = fileName
  a.href = window.URL.createObjectURL(blob)
  let clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
  })
  a.dispatchEvent(clickEvt)
  a.remove()
}

export const ViewDateFormatter = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString();
  const month = padZeroes(date.getMonth() + 1);
  const day = padZeroes(date.getDate());

  return `${day}/${month}/${year}`;
};

export const DealDateTimeFormatter = (dateString) => {
  const date = new Date(dateString);

  const weekday = date.toLocaleDateString("default", { weekday: "short" });
  // const month = padZeroes(date.getMonth() + 1);
  const month = date.toLocaleString("default", { month: "short" });

  const day = padZeroes(date.getDate());

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return `${day} ${month} (${weekday}), \n${strTime}`;
};

export const ViewDateTimeFormatter = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear().toString();
  const month = date.toLocaleString("default", { month: "short" });

  const day = padZeroes(date.getDate());

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return `${month} ${day}, ${year}, ${strTime}`;
};


export const ContactDateFormatter = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear().toString();

  const month = date.toLocaleString("default", { month: "short" });

  const day = padZeroes(date.getDate());

  return `${month} ${day},${year}`;
};

export const TableDateFormatter = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(-2);
  const month = padZeroes(date.getMonth() + 1);
  const day = padZeroes(date.getDate());
  const hours = padZeroes(date.getHours());
  const minutes = padZeroes(date.getMinutes());
  const seconds = padZeroes(date.getSeconds());

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};
export const TimeFormatter = (dateString) => {
  const date = new Date(dateString);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

const padZeroes = (value) => {
  return value.toString().padStart(2, "0");
};
export const capitalizeFirstLetter = (string) => {
  if (string == null || string == undefined) {
    return null;
  } else {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
};

export const getTheTitleView = (data, value) => {
  for (let i = 0; i < data?.length; i++) {
    if (data[i]?.value === value) {
      return data[i]?.label;
    }
  }
  return value;
};
export const getTheErrorString = (data, value) => {
  for (let i = 0; i < data?.length; i++) {
    if (data[i]?.value === value) {
      return data[i]?.label;
    }
  }
  return null;
};

export const hasDuplicateDataInArray = (arr) => {
  let cleanedArray = arr.map((str) => str.trim().toLowerCase());
  return new Set(cleanedArray).size !== arr.length;
};

export const updateFilterArray = (arr, inputString) => {
  const index = arr.indexOf(inputString);
  if (index !== -1) {
    arr.splice(index, 1);
  } else {
    arr.push(inputString);
  }
  return arr;
};

export const isWithinZeroSeconds = (timeString) => {
  const targetTime = new Date(timeString);
  const currentTime = new Date();
  const differenceInMilliseconds = currentTime - targetTime;
  const differenceInSeconds = differenceInMilliseconds / 1000;

  return differenceInSeconds < 0;
};

export const updateChatQArrayWithObject = (k, b) => {
  const exists = k.some((item) => item.conv_uuid === b.conv_uuid);
  if (!exists) {
    k.push(b);
  }
  return k;
};

export const rmvChatQArrayWithObject = (k, b) => {
  const filteredArray = k.filter((item) => item.conv_uuid !== b);
  return filteredArray;
};
export const getTheUserLabel = (array, key) => {
  const item = array.find((element) => element.key === key);
  return item ? item.label : null;
};

export const formatPhoneWithCountryCode = (countryCode, phoneNumber) => {
  const formattedCountryCode = countryCode?.toString().trim() || "";
  const formattedPhoneNumber = phoneNumber?.toString().trim() || "";

  if (!formattedCountryCode && !formattedPhoneNumber) return null;

  return formattedCountryCode && formattedPhoneNumber
    ? `${formattedCountryCode} | ${formattedPhoneNumber}`
    : formattedPhoneNumber || formattedCountryCode;
};


export const startTime = (dateString) => {
  const dateObj = new Date(dateString)
  return new Date(moment(dateObj).startOf('day'))
}


export const endTime = (dateString) => {
  const dateObj = new Date(dateString);
  return new Date(moment(dateObj).endOf('day'))
}
