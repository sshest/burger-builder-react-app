import React from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.css';

export const IngredientType = {
    breadBottom: 'BreadBottom',
    breadTop: 'BreadTop',
    meat: 'Meat',
    cheese: 'Cheese',
    bacon: 'Bacon',
    salad: 'Salad'
};

const BurgerIngredient = (props) => {
    const propTypes = {
        type: PropTypes.string.isRequired
    };

    let ingredient = null;

    switch (props.type) {
        case IngredientType.breadBottom:
            ingredient = <div className={classes.BreadBottom}></div>;
            break;
        case IngredientType.breadTop:
            ingredient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            );
            break;
        case IngredientType.meat:
            ingredient = <div className={classes.Meat}></div>;
            break;
        case IngredientType.cheese:
            ingredient = <div className={classes.Cheese}></div>;
            break;
        case IngredientType.bacon:
            ingredient = <div className={classes.Bacon}></div>;
            break;
        case IngredientType.salad:
            ingredient = <div className={classes.Salad}></div>;
            break;
        default:
            ingredient = null;
            break;
        }

        return ingredient;
};

export default BurgerIngredient;