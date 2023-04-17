import { ImageState } from "@/redux/Images/images.types";
import { State } from "@/redux/store";
import { useSelector } from "react-redux";
import CustomLoader from "../Common/CustomLoader";
import { ImageInfo } from "./ImageInfo";

export const ImageList = function () {
    const images = useSelector<State, ImageState>(state => state.images);

    return (
        <div>
            {images.loading === true ? <CustomLoader /> : <>
            {images.stock.map((stock) => {
                return (
                    <ImageInfo key={stock.id} stock= {stock}/>
                )
            })}
            </>}
        </div>    
    )
}