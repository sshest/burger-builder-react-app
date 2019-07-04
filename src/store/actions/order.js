import * as actionTypes from './actionTypes';
import axios from '../../axois-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderID: id,
        orderData
    }
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        error
    }
};

export const purchaseBurgerStart = (orderData) => {
    return dispatch => {
        axios.post('/orders.json', orderData)
            .then((response) => {
                dispatch(purchaseBurgerSuccess(response.data, orderData));
            })
            .catch((error) => {
                dispatch(purchaseBurgerFail(error));
            });
    };
};