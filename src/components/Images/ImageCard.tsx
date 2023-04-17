import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdOutlineAddShoppingCart, MdOpenInNew } from 'react-icons/md'


interface ImageProps {
    id?: string;
    public_url? : string;
    verdict? : string;
    invokes? : boolean;
}
const ImageCard : React.FC<ImageProps>= function ({id, public_url, verdict, invokes}) {
    const router = useRouter();
    
    return (
        <div className="image-card">
            <Image src={'https://storage.googleapis.com/vstock-bdc69.appspot.com/34e6e4eb0e08d473e17bbb4c3d11bc6e.jpg?GoogleAccessId=firebase-adminsdk-s5goi%40vstock-bdc69.iam.gserviceaccount.com&Expires=2214757800&Signature=J5PLQZrYpSnXl69sVREc9hVyvXjE5sAgAgQ04%2BqZ5SAG55%2FepXfPCsN8qpBtl%2FrbIsu9me%2FBMjcY6odjUZuhedkeJiViazqLFkKHgZMG6QACCj3Tz2UWjE448aO%2FR9WfS7psk1VFeuX%2FpmAa%2BfGyWanBHUpEdJdZrWcEr9P2pA2J70gqncpQL6W6FHRnxNMYFtxIZI6TkbJ3EGyVCT1Ap5u9rz1WnlpRF6eUyMDPtH46qIJZvCCUnm7Bmgkyth%2F2kJim9mc7K8iSrpijSsLKs5CwMx4XmQY%2F21HxpPHhq2SE3ywROiLUkxUZW4RVl2VEwr0VPuCHDnDa%2FR1dzh%2BlDw%3D%3D'} loading={'lazy'} alt={''} width={440} height={440} >
            </Image>
        </div>
    )
}

export default ImageCard;