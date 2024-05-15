import axios from "axios"
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { timeAfterMinutes } from "../Helper/Time";

export const refreshAuth = async (accessToken, refreshToken) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}account/refresh-token`, { accessToken: accessToken, refreshToken: refreshToken })
    //console.log(response.data)
    Cookies.set("at",response.data.token, {expires: timeAfterMinutes(15)});
    Cookies.set("ud",response.data.ud, {expires: timeAfterMinutes(15)});
    Cookies.set("rt",response.data.refreshToken,{expires: new Date(response.data.refreshTokenExpiry)});

   

}