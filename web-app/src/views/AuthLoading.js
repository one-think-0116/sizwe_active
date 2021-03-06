import React,{ useEffect, useContext } from 'react';
import CircularLoading from "../components/CircularLoading";
import { useSelector, useDispatch } from "react-redux";
import {language} from 'config';
import { FirebaseContext } from 'common';

function AuthLoading(props) {
    const { api } = useContext(FirebaseContext);
    const {
        fetchUser,
        fetchCarTypes,
        fetchSettings, 
        fetchBookings,
        fetchCancelReasons,
        fetchPromos,
        fetchDriverEarnings,
        fetchUsers,
        fetchUsersExcept,
        fetchNotifications,
        fetchEarningsReport,
        signOut,
        fetchWithdraws,
        fetchContacts
    } = api;
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    useEffect(()=>{
        dispatch(fetchUser());
        dispatch(fetchUsersExcept());
        dispatch(fetchCarTypes());
        dispatch(fetchSettings());
        // dispatch(fetchContacts());
    },[dispatch,fetchUser,fetchContacts,fetchUsersExcept,fetchCarTypes,fetchSettings]);

    useEffect(()=>{
        if(auth.info){
            if(auth.info.profile){
                let role = auth.info.profile.usertype;
                if(role === 'rider'){
                    dispatch(fetchBookings(auth.info.uid,role));
                    dispatch(fetchCancelReasons());
                }
                else if(role === 'driver'){
                    dispatch(fetchBookings(auth.info.uid,role));
                }
                else if(role === 'admin'){
                    dispatch(fetchUsers());
                    dispatch(fetchUsersExcept());
                    dispatch(fetchBookings(auth.info.uid,role));
                    dispatch(fetchPromos());
                    dispatch(fetchDriverEarnings(auth.info.uid,role));
                    dispatch(fetchNotifications());
                    dispatch(fetchEarningsReport());
                    dispatch(fetchCancelReasons());
                    dispatch(fetchWithdraws());
                    dispatch(fetchContacts());
                }
                else if(role === 'fleetadmin'){
                    dispatch(fetchUsers());
                    dispatch(fetchUsersExcept());
                    dispatch(fetchBookings(auth.info.uid,role));
                    dispatch(fetchDriverEarnings(auth.info.uid,role));
                }
                else{
                    alert(language.not_valid_user_type);
                    dispatch(signOut());
                }
            }else{
                alert(language.user_issue_contact_admin);
                dispatch(signOut());
            }
        }
    },[auth.info,dispatch,fetchContacts,fetchBookings,fetchCancelReasons,fetchDriverEarnings,fetchEarningsReport,fetchNotifications,fetchPromos,fetchUsers,fetchUsersExcept,fetchWithdraws,signOut]);

    return (
        auth.loading? <CircularLoading/>:props.children
    )
}

export default AuthLoading;