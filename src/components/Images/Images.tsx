import { ImageInfo } from "./ImageList"
import { SubmitImageCard } from "./SubmitImage"

export const Images = function(){
    return (
        <div>
            <SubmitImageCard />
            <ImageInfo />
        </div>
    )
}