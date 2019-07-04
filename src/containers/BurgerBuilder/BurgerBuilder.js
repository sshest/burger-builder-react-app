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
import * as ingredientTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get('https://react-burger-builder-6d0b6.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                });
            })
            .catch(error => {
                this.setState({error: true});
            });
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
        const burger = this.state.error ? <p>Ingredients can't be loaded!</p> : this.props.inds ? (
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
        inds: state.ingredients,
        price: state.totalPrice
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (name) => dispatch({type: ingredientTypes.ADD_INGREDIENT, ingredientName: name}),
        onIngredientRemoved: (name) => dispatch({type: ingredientTypes.REMOVE_INGREDIENT, ingredientName: name})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));