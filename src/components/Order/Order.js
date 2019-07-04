import React from 'react';

import classes from './Order.css';

const order = (props) => {
    console.log(props.ingredients);
    const ingredientsArray = [];
    for (const [key, value] of Object.entries(props.ingredients)) {
        ingredientsArray.push(<span
                    style={{
                        textTransform: 'capitalize',
                        display: 'inline-block',
                        margin: '0 8px',
                        padding: '5px',
                        border: '1px solid #ccc'
                    }}
                    key={key}>{key} ({value})</span>);
            }

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsArray}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
};

export default order;