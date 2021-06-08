import {
    GET_CONTACT,
    GET_CONTACT_SUCCESS,
    GET_CONTACT_FAILED,
    UPDATE_CONTACT,
    DELETE_CONTACT,
} from "../store/types";
import { store } from '../store/store';
import {
  cloud_function_server_url,
} from 'config';
export const fetchContacts= () => (dispatch) => (firebase) =>  {
    const {
        contactRef
      } = firebase;
    dispatch({
        type: GET_CONTACT,
        payload: [],
      });
      contactRef.on("value", (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          dispatch({
            type: GET_CONTACT_SUCCESS,
            payload: data,
          });
        }else{
          dispatch({
            type: GET_CONTACT_SUCCESS,
            payload: [],
          });
        }
        })
};
export const updateContact= (uid,updateData) => (dispatch) => async (firebase) =>  {
  let url = `${cloud_function_server_url}/sendMail`;
  const {
      singleContactRef
    } = firebase;
    const originalContactsData = store.getState().manageContact.contacts;
    originalContactsData[uid].response = updateData.response;
    originalContactsData[uid].read = updateData.read;
    let mailData = {dest:originalContactsData[uid].email,response:originalContactsData[uid].response}
    const response = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: "no-cors",
      body: JSON.stringify({ mailData: mailData })
    })
  dispatch({
      type: UPDATE_CONTACT,
      payload: originalContactsData,
    });
    singleContactRef(uid).update(updateData)
};
export const deleteContact= (deleteData) => (dispatch) => async (firebase) =>  {
  const {
      singleContactRef
    } = firebase;
    dispatch({
      type: DELETE_CONTACT,
    });
    let data = deleteData;
    data.map(item => {
      singleContactRef(item.id).remove()
    })
};