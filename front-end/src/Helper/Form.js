export const resetForm = (arrayFields) => {
    arrayFields.forEach(e => e.current.value = "")
   } 

export const removeOption = (stateArray, stateArraySetterFunction, index) => {
   const newArray = stateArray.filter((item) => item != stateArray[index])
   stateArraySetterFunction(newArray)
 }