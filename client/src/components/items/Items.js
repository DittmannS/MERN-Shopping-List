import React, { Fragment, useContext, useEffect } from 'react';
import SingleItem from './SingleItem';
import Spinner from '../layout/Spinner';
import ItemContext from '../../context/item/itemContext';


const Items = () => {
    const itemContext = useContext(ItemContext);

    const { items, filtered, getItems, loading } = itemContext;
    
    useEffect(() => {
        getItems();
        // eslint-disable-next-line
    }, []);
    
    if (items !== null && items.length === 0 && !loading) {
        return <h4>Derzeit sind keine Artikel auf dem Einkaufzettel.</h4>;
    }
    
    
    return (
        <Fragment>
            {items !== null && !loading ? (
                <Fragment>
                    {filtered !== null
                        ? filtered.map(item => (
                            <SingleItem 
                            key={item._id} item={item} />
                            ))
                            : 
                            items.map(item => (
                                <SingleItem key={item._id} item={item} />
                                ))
                    }
                </Fragment>
            ) : <Spinner />}
            
        </Fragment>
    );
};

export default Items
 