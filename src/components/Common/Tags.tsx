import { Tag, TagLabel } from "@chakra-ui/react"

export const CustomTag : React.FC<{text: string}>= function ({text}) {
    return (
        <div className="">
            <Tag
                size={'md'}
                key={'md'}
                borderRadius='full'
                variant='solid'
                marginRight={'3px'}
                marginTop={'3px'}
            >
                <TagLabel>{text}</TagLabel></Tag>
        </div>
    )
}