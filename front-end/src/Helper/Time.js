export const getTime = () => {

    const date = new Date();

    const currentDate = date.toDateString();

    const currentTime = date.toLocaleTimeString();

    return `${currentDate} at ${currentTime}`;
  }
