import {
    SEND_CONTACT,
    RECEIVE_CONTACT
} from "../store/types";

export const sendContact = (contactData) => (dispatch) => async (firebase) => {
    const {
        contactRef
      } = firebase;
      let createDate = new Date();
      contactData.createdAt = createDate.toISOString();
    dispatch({
        type: SEND_CONTACT,
      });
      contactRef.push(contactData)
      .then( res => {
        dispatch({
            type: RECEIVE_CONTACT,
          });
      })
      .catch( error => {console.log("error",error)})
  };