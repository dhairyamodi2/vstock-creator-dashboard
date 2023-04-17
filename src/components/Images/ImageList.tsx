import { Badge, Tag, TagLabel } from "@chakra-ui/react"
import { CustomTag } from "../Common/Tags"
import ImageCard from "./ImageCard"

export const ImageInfo = function () {
    return (
        <div className="img-info-card">
            <Badge colorScheme='green' alignSelf={'flex-end'} padding={'5px'} fontSize={'medium'} fontWeight={'bold'}>Approved</Badge>
            <div className="img-info">
                <ImageCard />
                <div className="img-details">
                    <span><b>ID: </b>fjudjflssdfsdfsdfsdfsdfsdfsdfsdfsdf</span>
                    <span><b>ALBUM:</b>  <Tag
                        size={'md'}
                        key={'md'}
                        borderRadius='full'
                        variant='solid'
                        colorScheme={'teal'}
                    >
                        <TagLabel>Shoot 03</TagLabel></Tag></span>
                    <span><b>Categories: </b></span>
                    <div className="categories">
                        <CustomTag text={'Men'}/>
                        <CustomTag text={'Health'}/>
                        <CustomTag text={'Athlete'}/>
                        <CustomTag text={'Woman'}/>
                        <CustomTag text={'Addiction'}/>
                    </div>
                </div>
            </div>



        </div>
    )
}