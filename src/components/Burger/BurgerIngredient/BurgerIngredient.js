import React from 'react';

import { IngredientType } from './IngredientType';
import classes from './BurgerIngredient.css';

const burgerIngredient = (props) => {
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
        case IngredientType.meet:
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

export default burgerIngredient;