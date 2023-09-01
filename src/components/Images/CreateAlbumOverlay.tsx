import { Button, Heading, Input, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Text, UnorderedList } from "@chakra-ui/react"
import { useEffect, useState } from "react";

export interface AlbumOverlay {
    albumOnClose: () => void;
    albumOnOpen: () => void;
    albumOpen: boolean
}
export const CreateAlbumOverlay: React.FC<AlbumOverlay> = function ({ albumOnClose, albumOnOpen, albumOpen }) {

    const [album_name, setAlbum] = useState<string | undefined>()
    async function createAlbums() {
        alert(album_name)
        const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}albums/create`, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({album_name})
            
        });
        if (data.status == 201) {
            alert('Album Created')
            albumOnClose();
        }
        else {
            const res = await data.json();
            alert(res.message)
        }
    }

    return (
        <div>
            <Modal onClose={() => {
                albumOnClose()
            }} size={'lg'} isOpen={albumOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Heading size={'md'}>Submit Image</Heading>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <input type={'text'} name='album_name' placeholder="Album Name" onChange={(e) => setAlbum(e.currentTarget.value)}/>
                        <Button
                                bgColor={'black'}
                                color={'white'}
                                transition={'0.8s'}
                                marginTop={'25px'}
                                onClick={createAlbums}
                                _hover={{ bgColor: 'black', color: 'white', transform: 'scale(1.03)' }}>Create New Album</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

