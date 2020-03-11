import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ItemContext from '../../context/item/itemContext';

const SingleItem = ({ item }) => {
    const itemContext = useContext(ItemContext);
    const { deleteItem, setCurrent, clearCurrent } = itemContext;

    const { id, name } = item;

    const onDelete = () => {
        deleteItem(id);
        clearCurrent();
    }

    return (
        <div className='card bg-light'>
            <p>
                <span className='p-1'>{name}</span>
                <button className='edit btn btn-dark btn-sm' onClick={() => setCurrent(item)}>Edit</button>
                <button className='delete btn btn-danger btn-sm' onClick={onDelete}>Delete</button>
            </p>
        </div>
    )
}

SingleItem.propTypes = {
    item: PropTypes.object.isRequired
};

export default SingleItem
