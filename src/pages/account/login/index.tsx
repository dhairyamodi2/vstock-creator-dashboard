import React, { useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../../../firebase/firebase';
import Login from "@/components/Account/Login";
import CompleteSignUp from "@/components/Account/CompleteSignUp";
import { UserState } from "@/types/Account";
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/redux/store";
import { VisitedState, UserState as ReduxUserState } from "@/redux/User/user.types";
import { getMe, visitOnce } from "@/redux/User/user.actions";
import { useRouter } from "next/router";
import { useCheckAuth} from "../../../hooks/auth";
import CustomLoader from "@/components/Common/CustomLoader";

const Page: React.FC = function () {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const visitedState = useSelector<State, VisitedState>(state => state.visitedState);
    const authState = useSelector<State, ReduxUserState>(state => state.authState);
    const router = useRouter();
    const dispatch = useDispatch();
    const [pageLoader, setLoader] = useState(true);

    useEffect(() => {
        router.events.on('hashChangeComplete', () => {
            setLoader(false);
        })
    }, [])
    useCheckAuth(visitedState, authState, setLoader);
   
    const [userState, setUserState] = useState<UserState>({
        type: 'contributor',
        email: null,
        id: null
    })
    function handleSignIn() {
        signInWithPopup(auth, provider).then((result) => {
            console.log(result.user);
        }).catch((err) => {
            console.error(err)
        })
    }
    return (
        <div>
            {pageLoader == true ? <CustomLoader />: <div className="login-component">

                {/* <CompleteSignUp email={userState.email} id = {userState.id} type = {userState.type}/> */}
                {userState.email === null || userState.id === null ? <Login userState={userState} setUserState={setUserState} /> : <CompleteSignUp email={userState.email} id={userState.id} type={userState.type} />}
            </div>}
        </div>

    )
}

export default Page;