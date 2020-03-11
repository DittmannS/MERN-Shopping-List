import React, { useReducer } from 'react';
import axios from 'axios';
import ItemContext from './itemContext';
import itemReducer from './itemReducer';
import {
    GET_ITEMS,
    ADD_ITEM,
    DELETE_ITEM,
    UPDATE_ITEM,
    SET_CURRENT,
    CLEAR_CURRENT,
    ITEM_ERROR,
    CLEAR_ITEMS,
    FILTER_ITEMS,
    CLEAR_FILTER
} from '../types';

const ItemState = props => {
    const initialState = {
        items: null,
        current: null,
        filtered: null,
        error: null
    };

    const [ state, dispatch ] = useReducer(itemReducer, initialState);
    
    // Get Items
    const getItems = async () => {
        try {
            const res = await axios.get('/api/items');
            dispatch({ 
                type: GET_ITEMS, 
                payload: res.data 
            });
        } catch (err) {
            dispatch({ 
                type: ITEM_ERROR,
                payload: err.response.msg
            });
        }       
    };

    // Add Item
    const addItem = async item => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/items', item, config);
            dispatch({ 
                type: ADD_ITEM, 
                payload: res.data 
            });
        } catch (err) {
            dispatch({ 
                type: ITEM_ERROR,
                payload: err.response.msg
            });
        }        
    };

    // Delete Item
    const deleteItem = id => {
        dispatch({ type: DELETE_ITEM, payload: id });
    };

    // Set Current Item
    const setCurrent = item => {
        dispatch({ type: SET_CURRENT, payload: item });
    };

    // Clear Current Item
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };
    // Update Item
    const updateItem = item => {
        dispatch({ type: UPDATE_ITEM, payload: item });
    };
    // Filter Items 
    const filterItems = text => {
        dispatch({ type: FILTER_ITEMS, payload: text });
    };
    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <ItemContext.Provider
        value={{
            items: state.items,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            getItems,
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
    );
};

 export default ItemState;
