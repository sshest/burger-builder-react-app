import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axois-orders';
import * as burgerBuilderActions from '../../store/actions/index';

const BurgerBuilder = props => {
   const [purchasing, setPurchasing] = useState(false);

   useEffect(() => {
        props.onInitIngredients();
        // eslint-disable-next-line
    }, []);

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    };

    const purchaseHandler = () => {
        setPurchasing(true);
    };

    const updatePurchasableState = () => {
        const ingredients = props.inds;
        const sum = Object.values(ingredients)
            .reduce((sum, quantity) => {
                return sum + quantity
            }, 0);
        return sum > 0;
    };

        const disabledInfo = {
            ...props.inds
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        const orderSummary = !props.inds || props.loading ? <Spinner/> : <OrderSummary
            ingredients={props.inds}
            price={props.price}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}/>;
        const burger = props.error ? <p>Ingredients can't be loaded!</p> : props.inds ? (
            <Aux>
                <Burger ingredients={props.inds}/>
                <BuildControls
                    price={props.price}
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    purchasable={updatePurchasableState()}
                    onPurchase={purchaseHandler}
                    disabled={disabledInfo}/>
            </Aux>
        ) : <Spinner/>;
        return (
            <Aux>
                <Modal
                    show={purchasing}
                    modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
}

const mapStateToProps = state => {
    return {
        inds: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (name) => dispatch(burgerBuilderActions.addIngredient(name)),
        onIngredientRemoved: (name) => dispatch(burgerBuilderActions.removeIngredient(name)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));