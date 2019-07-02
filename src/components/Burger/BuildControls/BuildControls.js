import React from 'react';

import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';
import { IngredientType } from '../BurgerIngredient/BurgerIngredient';

const controls = [
    { label: 'Salad', type:  IngredientType.salad },
    { label: 'Bacon', type:  IngredientType.bacon },
    { label: 'Cheese', type:  IngredientType.cheese },
    { label: 'Meat', type:  IngredientType.meat },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}>Order burger</button>
    </div>
);

export default buildControls;