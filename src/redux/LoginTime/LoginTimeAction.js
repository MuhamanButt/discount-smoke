import { SET_LOGIN_TIME } from "./LoginTimeTypes";

export const setLoginTime=(time)=>{
    return{
        type:SET_LOGIN_TIME,
        payload:time
    }
}