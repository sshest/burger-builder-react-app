import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ContactData from './ContactData/ContactData';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state={
        ingredients: {
            Salad: 1,
            Cheese: 1,
            Bacon: 1,
            Meat: 1
        }
    };

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients});
    }

    checkoutCancelledHandler = () => {
        this.props.history.back();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    render() {
        return (
            <div>
                <CheckoutSummary
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.state.ingredients}/>
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}/>
            </div>
        )
    }
}

export default Checkout;