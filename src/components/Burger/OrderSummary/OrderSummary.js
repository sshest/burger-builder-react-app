import React from 'react';

import Aux from '../../../hoc/Auxilary';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map((key) => {
            return <li key={key}>{key}: {props.ingredients[key]}</li>
        });
    return (
        <Aux>
            <h3>Your order</h3>
            <p>A delicious burger with the next ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to checkout?</p>
            <button>Cancel</button>
            <button>Continue</button>
        </Aux>
    );
};

export default orderSummary;