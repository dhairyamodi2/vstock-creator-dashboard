
import {createStore, applyMiddleware, combineReducers, compose, bindActionCreators} from 'redux';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer, visitReducer } from './User/user.reducer';
import { myImageReducers } from './Images/images.reducers';

const reducers = combineReducers({
    visitedState : visitReducer,
    authState : authReducer,
    images : myImageReducers
}
)
const initialState = {
    visitedState : {visited: false}
}

const middleware = [thunk];

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)));


export type State = ReturnType<typeof reducers>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
