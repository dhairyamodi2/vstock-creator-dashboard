import { getMyImages } from "@/redux/Images/images.actions"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { ImageList } from "./ImageList"
import { SubmitImageCard } from "./SubmitImage"

export const Images = function(){
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMyImages() as any);
    }, [])
    return (
        <div>
            <SubmitImageCard />
            <ImageList/>
        </div>
    )
}