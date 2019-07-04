import React, { Component } from 'react';
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

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    };

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    };

    purchaseHandler = () => {
        this.setState({purchasing: true})
    };

    updatePurchasableState() {
        const ingredients = this.props.inds;
        const sum = Object.values(ingredients)
            .reduce((sum, quantity) => {
                return sum + quantity
            }, 0);
        return sum > 0;
    }

    render() {
        const disabledInfo = {
            ...this.props.inds
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        const orderSummary = !this.props.inds || this.state.loading ? <Spinner/> : <OrderSummary
            ingredients={this.props.inds}
            price={this.props.price}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}/>;
        const burger = this.props.error ? <p>Ingredients can't be loaded!</p> : this.props.inds ? (
            <Aux>
                <Burger ingredients={this.props.inds}/>
                <BuildControls
                    price={this.props.price}
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    purchasable={this.updatePurchasableState()}
                    onPurchase={this.purchaseHandler}
                    disabled={disabledInfo}/>
            </Aux>
        ) : <Spinner/>;
        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
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
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));