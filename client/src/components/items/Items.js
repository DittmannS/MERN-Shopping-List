import React, { Fragment, useContext } from 'react';
import SingleItem from './SingleItem';
import ItemContext from '../../context/item/itemContext';


const Items = () => {
    const itemContext = useContext(ItemContext);

    const { items, filtered } = itemContext;
    
    if (items.length === 0) {
        return <h4>Please add a item</h4>;
    }

    return (
        <Fragment>
            {filtered !== null
                ? filtered.map(item => (
                    <SingleItem key={item.id} item={item} />
                ))
                : 
                items.map(item => (
                    <SingleItem key={item.id} item={item} />
                ))
            }
        </Fragment>
    );
};

export default Items
 