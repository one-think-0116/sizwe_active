import {
    SEND_CONTACT,
    RECEIVE_CONTACT
} from "../store/types";

const INITIAL_STATE = {
    loading: false,
}

export const contactreducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SEND_CONTACT:
        return {
          ...state,
          loading: true
        };
    case RECEIVE_CONTACT:
        return {
            ...state,
            loading: false
        };
      default:
        return state;
    }
  };