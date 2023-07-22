import { SET_LOCALE } from '../actions/types';

const localeReducer = (state = 'vi', action) => {
    switch (action.type) {
        case SET_LOCALE:
            return action.data;
        default:
            return state;
    }
};
