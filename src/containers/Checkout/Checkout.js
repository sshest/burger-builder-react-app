import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ContactData from './ContactData/ContactData';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.back();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    };
    render() {
        let summary = <Redirect to="/"/>;
        if (this.props.inds) {
            summary = <div>
                <CheckoutSummary
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.props.inds}/>
                <Route
                    path={this.props.match.path + '/contact-data'}
                 component={ContactData}/>
            </div>
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        inds: state.ingredients
    }
};

export default connect(mapStateToProps)(Checkout);