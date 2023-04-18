import { OverlayProps } from "@/types/overlay";
import { Button } from "@chakra-ui/react"
import { useEffect } from "react"
import { FaArrowAltCircleDown } from "react-icons/fa"

export const SubmitImageCard : React.FC<OverlayProps> = function ({onClose, onOpen, isOpen}) {

    useEffect(() => {

    }, []);
    return <div className="submit-img">
        <Button
            bgColor={'black'}
            color={'white'}
            transition={'0.8s'}
            marginTop={'25px'}
            onClick={onOpen}
            _hover={{ bgColor: 'black', color: 'white', transform: 'scale(1.03)' }}>Submit Image</Button>
        <div className="steps">
            <span>Submit an Image, add categories</span>
            <span><FaArrowAltCircleDown></FaArrowAltCircleDown></span>
            <span>Our support staff will verify it.</span>
            <span><FaArrowAltCircleDown></FaArrowAltCircleDown></span>
            <span>Once image, is approved, it will be available for sale on our website</span>
            <span><FaArrowAltCircleDown></FaArrowAltCircleDown></span>
            <span>Make 8$ for every image sold</span>
        </div>
    </div>
}