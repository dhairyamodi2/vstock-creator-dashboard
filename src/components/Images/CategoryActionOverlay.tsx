import { getMyImages } from "@/redux/Images/images.actions";
import { Category } from "@/redux/Images/images.types";
import { OverlayProps } from "@/types/overlay"
import { Box, Button, Heading, Input, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Text, UnorderedList } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface CategoriesOverlay extends OverlayProps {
    type: 'add' | 'remove';
    id: string;
}
export const CategoryActionOverlay: React.FC<CategoriesOverlay> = function ({ isOpen, onOpen, onClose, type, id }) {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState<Array<Category>>([]);
    const [choosenCategory, setChoosenCategory] = useState<Category | string>("Select Category");
    useEffect(() => {

        async function getCategories() {
            try {
                const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}categories/all`);
                const res = await data.json();
                if (res.success == true) {
                    setCategories(res.data as Array<Category>)
                }
            } catch (error) {
                console.log(error);
            }

        }
        if (isOpen == true) {
            getCategories();
        }
        setChoosenCategory('Select Category')
    }, [isOpen])

    async function handleAction() {
        if (choosenCategory == 'Select Category' || typeof choosenCategory == 'string') {
            alert("Please select category");
            return;
        }
        alert(JSON.stringify({ id, category_name: choosenCategory.category_name, verdict: 'approved' }));
        const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}stock/categories`, {
            method: type == 'add' ? 'PUT' : 'DELETE',
            headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                id,
                category: {
                    category_name: choosenCategory.category_name,
                    verdict: 'approved'
                }
            })
        })

        if (data.status == 201) {
            alert(type == 'add' ? "Category Added" : "Category Removed")
            dispatch(getMyImages() as any);
            return;
        }
        const res = await data.json();
        alert(res.message);
    }
    return (
        <Modal onClose={onClose} size={'lg'} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Heading size={'md'}>{type == 'add' ? "Add Categories" : "Remove Categories"}</Heading>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <select value={typeof choosenCategory == 'string' ? choosenCategory : JSON.stringify(choosenCategory)} onChange={(e) => {
                        const val = JSON.parse(e.target.value) as Category;
                        setChoosenCategory(val)
                    }}>
                        <option value={'Select Category'}>Select Category</option>
                        {categories.map((category) => {
                            return <option value={JSON.stringify(category)}>{category.category_name}</option>
                        })}
                    </select>
                    <Box display={'flex'} justifyContent={'center'}>
                        <Button colorScheme={type == 'add' ? 'facebook' : 'red'} onClick={handleAction}>{type == 'add' ? "Add Categories" : "Remove Categories"}</Button>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}