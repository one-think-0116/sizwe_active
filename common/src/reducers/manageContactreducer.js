import {
    GET_CONTACT,
    GET_CONTACT_SUCCESS,
    GET_CONTACT_FAILED,
    UPDATE_CONTACT,
    DELETE_CONTACT,
} from "../store/types";

const INITIAL_STATE = {
    loading: false,
    contacts:null,
    error: {
        flag: false,
        msg: null
    }
    
}

export const manageContactreducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_CONTACT:
        return {
          ...state,
          contacts:action.payload,
          loading: true
        };
    case GET_CONTACT_SUCCESS:
        return {
            ...state,
            contacts:action.payload,
            loading: false
          };
    case GET_CONTACT_SUCCESS:
        return {
            ...state,
            contacts:null,
            loading: false,
            error: {
                flag: true,
                msg: action.payload
            }
        };
    case UPDATE_CONTACT:
        return {
            ...state,
            contacts:action.payload,
            loading: false
          };
    case DELETE_CONTACT:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  };