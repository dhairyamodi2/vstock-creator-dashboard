import { my_images_fail, my_images_req, my_images_suc } from "./images.constants";
import { ImageAction, ImageState } from "./images.types";

export const myImageReducers = (state: ImageState = {
    success: false,
    loading: true,
    message: "Loading",
    stock: []
}, action: ImageAction): ImageState => {
    switch(action.type){
        case my_images_req:
            return {
                ...action.payload,
                loading: true
            }
        case my_images_suc: 
            return {
                ...action.payload,
                loading: false,
            }
        
        case my_images_fail:
            return {
                ...action.payload,
                loading: false
            }
        default:
            return state
        }
}
