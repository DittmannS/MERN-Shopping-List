import React, { useReducer } from 'react';
import uuid from 'uuid';
import ItemContext from './itemContext';
import itemReducer from './itemReducer';
import {
    ADD_ITEM,
    DELETE_ITEM,
    UPDATE_ITEM,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_ITEMS,
    CLEAR_FILTER
} from '../types';

const ItemState = props => {
    const initialState = {
        items: [
            {
                id: 1,
                name: 'Dogs',
            },
            {
                id: 2,
                name: 'Cats',
            },
            {
                id: 3,
                name: 'Fish',
            },
            {
                id: 4,
                name: 'Cow',
            },
        ],
        current: null,
        filtered: null
    };

    const [ state, dispatch ] = useReducer(itemReducer, initialState);
    
    // Add Item
    const addItem = item => {
        item.id = uuid.v4();
        dispatch({ type: ADD_ITEM, payload: item });
    }

    // Delete Item
    const deleteItem = id => {
        dispatch({ type: DELETE_ITEM, payload: id });
    } 

    // Set Current Item
    const setCurrent = item => {
        dispatch({ type: SET_CURRENT, payload: item });
    } 

    // Clear Current Item
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }
    // Update Item
    const updateItem = item => {
        dispatch({ type: UPDATE_ITEM, payload: item });
    }
    // Filter Items 
    const filterItems = text => {
        dispatch({ type: FILTER_ITEMS, payload: text });
    }
    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    }

    return (
        <ItemContext.Provider
        value={{
            items: state.items,
            current: state.current,
            filtered: state.filtered,
            addItem,
            deleteItem,
            setCurrent,
            clearCurrent,
            updateItem,
            filterItems,
            clearFilter
        }}>
            { props.children }
        </ItemContext.Provider>
    )
};

 export default ItemState;
