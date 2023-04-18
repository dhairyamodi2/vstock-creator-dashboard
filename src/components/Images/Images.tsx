import { getMyImages } from "@/redux/Images/images.actions"
import { useDisclosure } from "@chakra-ui/react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { ImageList } from "./ImageList"
import { PostImageModal } from "./PostImageModal"
import { SubmitImageCard } from "./SubmitImage"

export const Images = function(){
    const dispatch = useDispatch();
    const {isOpen, onOpen, onClose} = useDisclosure();
    useEffect(() => {
        if(isOpen == false){
            dispatch(getMyImages() as any);

        }

    }, [isOpen])
    return (
        <div>
            <SubmitImageCard isOpen={isOpen} onClose={onClose} onOpen={onOpen}/>
            <ImageList/>
            <PostImageModal isOpen={isOpen} onClose={onClose} onOpen={onOpen}/>
        </div>
    )
}