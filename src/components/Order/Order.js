import React from 'react';

import classes from './Order.css';
import BurgerIngredient from "../Burger/BurgerIngredient/BurgerIngredient";

const order = (props) => {
    let ingredientsArray = Object.keys(props.ingredients)
        .map(key => {
            return [...Array(props.ingredients[key])].map((_, i) => {
                return <span
                    style={{
                        textTransform: 'capitalize',
                        display: 'inline-block',
                        margin: '0 8px',
                        padding: '5px',
                        border: '1px solid #ccc'
                    }}
                    key={key}>{key} ({props.ingredients[key].amount})</span>
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsArray}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
};

export default order;