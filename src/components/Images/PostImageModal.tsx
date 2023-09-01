import { Album } from "@/redux/Images/images.types";
import { OverlayProps } from "@/types/overlay"
import { Box, Button, Heading, Input, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Text, UnorderedList, useDisclosure } from "@chakra-ui/react"
import { ChangeEvent, useEffect, useState } from "react"
import CustomLoader from "../Common/CustomLoader";
import { CreateAlbumOverlay } from "./CreateAlbumOverlay";


export const PostImageModal: React.FC<OverlayProps> = function ({ isOpen, onOpen, onClose }) {
    const [albums, setAlbums] = useState<Array<Album>>([]);
    const albumProps = useDisclosure();
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        async function getMyAlbums() {
            const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}albums/all`, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            const res = await data.json();
            if (res.success == true) {
                setAlbums(res.data as Array<Album>);
            }
        }
        if (isOpen == true) getMyAlbums();
        setLoader(false);
    }, [isOpen, albumProps.isOpen])


    interface ImageProps {
        image_name : string;
        file : File | null;
        album: Album | string;
    }
    const [image, setImage] = useState<ImageProps>({
        image_name : "",
        file : null,
        album: 'Select Album'

    });

    useEffect(() => {
        setImage({
            image_name : "",
            file: null,
            album: 'Select Album'
        })
        
    }, [isOpen])
    function handleSelectChange(e : ChangeEvent<HTMLSelectElement>){
        if(e.target.value != 'Select Album'){
            setImage((prevState) => {
                return {
                    ...prevState,
                    album : JSON.parse(e.target.value) as Album
                }
            })
        }
        else {
            alert('no album')
        }
        
    }

    function handleFileChange(e : ChangeEvent<HTMLInputElement>){
        setImage((prevState) => {
            return {
                ...prevState,
                file: e.target.files && e.target.files[0] ? e.target.files[0] : null
            }
        })
        alert(JSON.stringify(image));
    }

    async function submitImage(){
        if(image.image_name.length == 0){
            alert('Image Name Required');
            return;
        }
        if(image.file == null){
            alert('File required');
            return;
        }
        if(typeof image.album == 'string'){
            alert('Album required');
            return;
        }
        
        const data = new FormData();
        data.append('image_name', image.image_name);
        data.append('file', image.file)
        data.append('album', JSON.stringify(image.album));
        setLoader(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}stock/upload`, {
                method: "POST",
                headers: {
                    // 'Content-type' : "application/json",
                    Authorization: "Bearer " + localStorage.getItem('token')
                },
                body: data
            })
            const res = await response.json();
            setLoader(false);
            if(res.statusCode ==  201){
                alert('Image uploaded');;
                onClose();
                albumProps.onClose();
            }
            else {
                alert(res.message)
            }
        } catch (error) {
            setLoader(false);
            alert(error);
        }
    }
    return (
        <div>
            <Modal onClose={() => {
                onClose()
            }} size={'4xl'} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Heading size={'md'}>Submit Image</Heading>
                    </ModalHeader>
                    {loader == true ? <><CustomLoader /></> : <>
                    <ModalCloseButton />
                    <ModalBody>
                        <form>
                            <input type={'text'} name='image_name' value={image.image_name} placeholder="Image Name" 
                            onChange={(e) => {
                                setImage((prevState) => {
                                    return {
                                        ...prevState,
                                        image_name: e.target.value
                                    }
                                })
                            }}/>
                            <input type={'file'} name='file' onChange={handleFileChange} />
                            <select placeholder="Select Album" onChange={handleSelectChange} value={typeof image.album == 'string' ? image.album : JSON.stringify(image.album)}>
                                <option value={'Select Album'}>Select Album</option>
                                {albums && albums.map((album) => {
                                    return <option value={JSON.stringify(album)}>{album.album_name}</option>
                                })}
                            </select>
                             <Button
                                bgColor={'black'}
                                color={'white'}
                                transition={'0.8s'}
                                marginTop={'25px'}
                                onClick={albumProps.onOpen}
                                _hover={{ bgColor: 'black', color: 'white', transform: 'scale(1.03)' }}>Create New Album</Button>
                        </form>
                        <CreateAlbumOverlay albumOnClose={albumProps.onClose} albumOnOpen={albumProps.onOpen} albumOpen={albumProps.isOpen}/>
                        <Button
                                bgColor={'black'}
                                color={'white'}
                                transition={'0.8s'}
                                marginTop={'25px'}
                                onClick={submitImage}
                                _hover={{ bgColor: 'black', color: 'white', transform: 'scale(1.03)' }}>Submit Image</Button>

                    </ModalBody></>}
                    
                </ModalContent>
            </Modal>
        </div>
    )
}
