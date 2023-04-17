import { Images, ImageState } from "@/redux/Images/images.types"
import { State } from "@/redux/store"
import { Badge, Tag, TagLabel } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import CustomLoader from "../Common/CustomLoader"
import { CustomTag } from "../Common/Tags"
import ImageCard from "./ImageCard"

interface ImageInfoProps{
    stock : Images
}
export const ImageInfo : React.FC<ImageInfoProps>= function ({stock}) {
    
    return (
        <div className="img-info-card">
            <Badge colorScheme={stock.verdict == 'approved' ? 'green' : stock.verdict == 'pending' ? 'orange' : 'red'} alignSelf={'flex-end'} padding={'5px'} fontSize={'medium'} fontWeight={'bold'}>{stock.verdict}</Badge>
            <div className="img-info">
                <ImageCard private_url={stock.private_url}/>
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
                </div>
            </div>
        </div>
    )
}