import { FiSidebar } from "react-icons/fi";
import { SimpleSidebar } from "@/components/Account/Sidebar"
import { useEffect, useState } from "react";
import Profile from "@/components/Account/Profile";
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/redux/store";
import { VisitedState } from "@/redux/User/user.types";
import { UserState as ReduxUserState } from "@/redux/User/user.types";
import { getMe, visitOnce } from "@/redux/User/user.actions";
import { useRouter } from "next/router";
import { Progress } from "@chakra-ui/react";
import CustomLoader from "@/components/Common/CustomLoader";
import { Contact } from "@/components/Account/Contact";
import { Images } from "@/components/Images/Images";

export default function Account(){
    const [render, setRender] = useState({
        account: false,
        help: false,
        images: false
    });
    const [pageLoader, setLoader] = useState(true);
    const visitedState = useSelector<State, VisitedState>(state => state.visitedState);
    const authState = useSelector<State, ReduxUserState>(state => state.authState);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        router.events.on('hashChangeComplete', () => {
            setLoader(false);
        })
        setRender({
            account: true,
            images: false,
            help: false,
        })
    }, [])
    useEffect(() => {
        if(visitedState.visited == false){
            dispatch(visitOnce() as any);
            dispatch(getMe() as any); 
        }
        else {
            if(authState.isAuthenticated == true){
                setLoader(false);
            }
            else if(authState.isAuthenticated == false && authState.loading == false){
                router.replace('/account/login');
            }
        }
    }, [visitedState.visited, authState.isAuthenticated, authState.loading])
    return (
        <div className="account-page">
            {pageLoader == true ? <CustomLoader />: <SimpleSidebar setRender={setRender}>
                {render.account && <Profile />}
                {render.help && <Contact />}
                {render.images && <Images />}
            </SimpleSidebar>}
        </div>
    )
}