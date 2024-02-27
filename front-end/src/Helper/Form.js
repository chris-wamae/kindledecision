import ToolTip from "../components/ToolTip"
import axios from "axios"

export const resetForm = (arrayFields) => {
    arrayFields.forEach(e => e.current.value = "")
   } 

export const removeOption = (stateArray, stateArraySetterFunction, index) => {
   const newArray = stateArray.filter((item) => item != stateArray[index])
   stateArraySetterFunction(newArray)
 }


export const emailToolTipRenderer = (state) => {

   if(state == undefined)
   {
    return <ToolTip type={"error"} message={"Email is required"}/>
   }
   else if(state == false)
   {
    return <ToolTip type={"error"} message={" Invalid email format"}/>
   }
   else if(state == true)
   {
    return <ToolTip type={"success"} message={"Email is valid"}/>
   }
   else if(state == "notfound")
   {
    return <ToolTip type={"error"} message={" A user with this email does not exist"}/>
   }
   else
   {

   }
  }


  export const validateEmail = (email) => {
   var regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3})$/
   return regex.test(email);

 }
 
//   const emailStateSetter = (mail)=> {
//   if(mail == "")
//   {
//   return undefined
//   }
//   else
//   {
//    if(validateEmail(voterEmail) == false)
//    {
//     setValidEmail(false)
//    }
//    else
//    {
//     emailDataBaseSearch();
//    }

//   }
// }

 // const [emailInputClassName,setEmailInputClassName] = useState("")

 // const [validEmail, setValidEmail] = useState(undefined)  
 
 // const emailDataBaseSearch = () => {
 //   let num = Math.floor(Math.random() * 10)
 //   if(num < 5)
  //  {
  //    setValidEmail("notfound")
 //   }
 //   else
  //  {
 //      setValidEmail(true)
 //   }
 // }



