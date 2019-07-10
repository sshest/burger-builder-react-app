import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../../components/Order/Order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axois-orders';
import withErrorHandler from '../../../hoc/withErrorHandler';
import * as actions from '../../../store/actions/index';

const Orders = props => {
    useEffect(() => {
        props.onFetchOrders();
        // eslint-disable-next-line
    }, []);


    return (
        <div>
            {props.loading ?
                <Spinner/> :
                props.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}
                    />
            ))}
        </div>
    );
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