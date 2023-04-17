import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdOutlineAddShoppingCart, MdOpenInNew } from 'react-icons/md'


interface ImageProps {
    private_url : string;
}
const ImageCard : React.FC<ImageProps>= function ({private_url}) {
    const router = useRouter();
    
    return (
        <div className="image-card">
            <Image src={private_url} loading={'eager'} alt={''} width={440} height={440} >
            </Image>
        </div>
    )
}

export default ImageCard;