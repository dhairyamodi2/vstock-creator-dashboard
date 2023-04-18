import { Images, ImageState } from "@/redux/Images/images.types"
import { State } from "@/redux/store"
import { Badge, Button, Tag, TagLabel, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import { useSelector } from "react-redux"
import CustomLoader from "../Common/CustomLoader"
import { CustomTag } from "../Common/Tags"
import { CategoryActionOverlay } from "./CategoryActionOverlay"
import ImageCard from "./ImageCard"

interface ImageInfoProps{
    stock : Images
}
export const ImageInfo : React.FC<ImageInfoProps>= function ({stock}) {
    const [catActionType, setActionType] = useState<{type: 'add' | 'remove'}>({type: 'add'})
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <div className="img-info-card">
            <Badge colorScheme={stock.verdict == 'approved' ? 'green' : stock.verdict == 'pending' ? 'orange' : 'red'} alignSelf={'flex-end'} padding={'5px'} fontSize={'medium'} fontWeight={'bold'}>{stock.verdict}</Badge>
            <div className="img-info">
                <ImageCard private_url={stock.public_url}/>
                <div className="img-details">
                    <span><b>ID: </b>{stock.id}</span>
                    <span><b>NAME: </b>{stock.image_name}</span>
                    <span><b>ALBUM:</b>  <Tag
                        size={'md'}
                        key={'md'}
                        borderRadius='full'
                        variant='solid'
                        colorScheme={'teal'}
                    >
                        <TagLabel>{stock.album ? stock.album.album_name : 'NA'}</TagLabel></Tag></span>
                    <span><b>Categories: </b></span>
                    <div className="categories">
                        {stock.categories.map((category) => {
                            return <CustomTag key={category.category_name} text={category.category_name}/>
                        })}
                    </div>
                    <div className="cat-actions">
                        <Button colorScheme={'facebook'} onClick={() => {
                            setActionType({
                                type: 'add'
                            })
                            onOpen()
                        }}>Add Categories</Button>
                        <Button colorScheme={'red'} onClick={() => {
                            setActionType({
                                type: 'remove'
                            })
                            onOpen()
                        }}>Remove Categories</Button>
                    </div>
                    <CategoryActionOverlay isOpen = {isOpen} onOpen = {onOpen} onClose = {onClose} type={catActionType.type} id={stock.id}/ >
                </div>
            </div>
        </div>
    )
}