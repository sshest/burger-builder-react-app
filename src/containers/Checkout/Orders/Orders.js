import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../../components/Order/Order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axois-orders';
import withErrorHandler from '../../../hoc/withErrorHandler';
import * as actions from '../../../store/actions/index';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        return (
            <div>
                {this.props.loading ?
                    <Spinner/> :
                    this.props.orders.map(order => (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={+order.price}
                        />
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));