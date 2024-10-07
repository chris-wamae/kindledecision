export const getTime = () => {

    const date = new Date();

    const currentDate = date.toDateString();

    const currentTime = date.toLocaleTimeString();

    return `${currentDate} at ${currentTime}`;
  }
<<<<<<< HEAD
=======

export const getCurrentISOTime = () => {
  return new Date(new Date().getTime()).toISOString();
}

export const timeAfterMinutes = (minutes) => {
  
  return new Date(new Date().getTime() + minutes * 60 * 1000);
}
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
