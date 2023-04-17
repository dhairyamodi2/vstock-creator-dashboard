import { Dispatch } from "redux"
import { logoutAction } from "../User/user.actions"
import { my_images_fail, my_images_req, my_images_suc } from "./images.constants"
import { ImageAction, ImageResponse } from "./images.types"

export const getMyImages = function (){
    return async function(dispatch : Dispatch<ImageAction>){
        try {
            dispatch({
                type: my_images_req,
                payload: {success: false, loading: true, message: "loading", stock: []}
            })
            const data = await fetch('http://localhost:3001/stock/creator/all', {
                method: 'GET',
                headers: {
                    Authorization : 'Bearer ' + localStorage.getItem('token')
                }
            })
            const res = await data.json() as ImageResponse;
            console.log(res);
            if(data.status == 401) {
                logoutAction();
                window.location.reload();
                return;
            }
            if(res.success == true){
                dispatch({
                    type: my_images_suc,
                    payload: {success: true, message: '', loading: false, stock: res.data}
                })
            }
            else {
                dispatch({
                    type: my_images_fail,
                    payload: {success: false, message: res.message, loading: false, stock: []}
                })
            }
        } catch (error) {
            dispatch({
                type: my_images_fail,
                payload: {success: false, message: "Some error", loading: false, stock: []}
            })
        }
    }
}