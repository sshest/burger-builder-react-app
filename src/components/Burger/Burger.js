import React from 'react';

import classes from './Burger.css';

import BurgerIngredient, { IngredientType } from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let ingredientsArray = Object.keys(props.ingredients)
        .map(key => {
            return [...Array(props.ingredients[key])].map((_, i) => {
                return <BurgerIngredient key={key + i} type={key} />
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (ingredientsArray.length === 0) {
        ingredientsArray = <p>Please start entering ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={IngredientType.breadTop} />
            {ingredientsArray}
            <BurgerIngredient type={IngredientType.breadBottom} />
        </div>
    );
};

export default burger;