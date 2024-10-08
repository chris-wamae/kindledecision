import axios from "axios"
import Cookies from "js-cookie";
import { timeAfterMinutes } from "../Helper/Time";

export const refreshAuth = async () => {
    if (Cookies.get("rt") == null) {
        return false;
    } else if (Cookies.get("et") == null) {
        Cookies.set("et","exp");
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}account/refresh-token`, { accessToken: Cookies.get("at"), refreshToken: Cookies.get("rt") })
        Cookies.set("at", response.data.token, { expires: new Date(response.data.refreshTokenExpiryTime) });
        Cookies.set("ud", response.data.ud, { expires: new Date(response.data.refreshTokenExpiryTime) });
        Cookies.set("rt", response.data.refreshToken, { expires: new Date(response.data.refreshTokenExpiryTime)});
        Cookies.set("et", "exp", { expires: timeAfterMinutes(15) })
    }
}

export const loggedStatus = () => {
if(Cookies.get("ud") == undefined)
{
return false
}
else 
{
return true
}
}