import {
    GET_ITEMS,
    ADD_ITEM,
    DELETE_ITEM,
    UPDATE_ITEM,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_ITEMS,
    CLEAR_FILTER,
    ITEM_ERROR
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case ADD_ITEM:
            return {
                ...state,
                items: [...state.items, action.payload],
                loading: false
            };
        case UPDATE_ITEM:
            return {
                ...state,
                items: state.items.map( item => item.id === action.payload.id ? action.payload : item),
                loading: false
            };
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
                loading: false
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case FILTER_ITEMS:
            return {
                ...state,
                filtered: state.items.filter(item => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return item.name.match(regex);
                })
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
        case ITEM_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}