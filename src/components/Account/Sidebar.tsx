import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    Icon,
    useColorModeValue,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
} from '@chakra-ui/react';
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiUser,
    FiHelpCircle,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdContactSupport, MdLogout, MdOutlinePinInvoke, MdSubscriptions } from 'react-icons/md';
import { BsBookmark } from 'react-icons/bs';
import { FaSignOutAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logoutAction } from '@/redux/User/user.actions';

interface LinkItemProps {
    name: string;
    icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
];

export function SimpleSidebar({ children, setRender }: {
    children: ReactNode, setRender: Dispatch<SetStateAction<{
        account: boolean;
        help: boolean
        images: boolean;

    }>>
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
                setRender={setRender}
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} setRender={setRender} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
    setRender: Dispatch<SetStateAction<{
        account: boolean;
        help: boolean;
        images: boolean;
    }>>

}

const SidebarContent = ({ onClose, setRender, ...rest }: SidebarProps) => {
    const dispatch = useDispatch();
    return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Link href={'/'}>
                    <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                        vStock
                    </Text>
                </Link>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            <NavItem key={'Account'} icon={FiUser} name={'Account'} onClick={() => {
                setRender({
                    account: true,
                    help: false,
                    images: false
                }); onClose()
            }}>Profile</NavItem>
            <NavItem key={'Images'} icon={MdSubscriptions} name={'Images'} onClick={() => {
                setRender({
                    account: false,
                    help: false,
                    images: true
                }); onClose()
            }}>Images</NavItem>

            <NavItem key={'Contact'} icon={MdContactSupport} name={'Contact'} onClick={() => {
                setRender({
                    account: false,
                    help: true,
                    images: false
                }); onClose()
            }}>Contact Support</NavItem>

            <NavItem key={'Sign Out'} icon={FaSignOutAlt} name={'Bookmarks'} onClick={() => {
                dispatch(logoutAction() as any);
                onClose()
            }}>Sign Out</NavItem>


            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} name={link.name}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    name: string;
    children: ReactText;
}
const NavItem = ({ icon, name, children, ...rest }: NavItemProps) => {
    return (
        <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            // bg={'black'}
            // color={'white'}
            _hover={{
                bg: 'black',
                color: 'white',
            }}
            {...rest}>
            {icon && (
                <Icon
                    mr="4"
                    fontSize="16"
                    _groupHover={{
                        color: 'white',
                    }}
                    as={icon}
                />
            )}
            {children}
        </Flex>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 24 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent="flex-start"
            {...rest}>
            <IconButton
                variant="outline"
                onClick={onOpen}
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
                Logo
            </Text>
        </Flex>
    );
};