import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

const Checkout = props => {
    const checkoutCancelledHandler = () => {
        props.history.back();
    };

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data')
    };

        let summary = <Redirect to="/"/>;

        if (props.inds) {
            const purchasedRedirect = props.purchased ? <Redirect to="/"/> : null;
            summary = <div>
                {purchasedRedirect}
                <CheckoutSummary
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler}
                    ingredients={props.inds}/>
                <Route
                    path={props.match.path + '/contact-data'}
                    component={ContactData}/>
            </div>
        }
        return summary;
}

const mapStateToProps = state => {
    return {
        inds: state.burgerBuilder.ingredients,
        purchased: state.orders.purchased
    }
};

export default connect(mapStateToProps)(Checkout);