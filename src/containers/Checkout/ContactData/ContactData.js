import React, { useState } from 'react';
import { connect } from 'react-redux';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axois-orders';
import withErrorHandler from '../../../hoc/withErrorHandler';
import * as orderActions from '../../../store/actions/index';

import classes from './ContactData.css';

const ContactData = props => {
    const initialOrderState = {
            name: {
                inputType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: ''
            },
            street: {
                inputType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: ''
            },
            country: {
                inputType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your country'
                },
                value: ''
            },
            postalCode: {
                inputType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your postal code'
                },
                value: ''
            },
            email: {
                inputType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your email'
                },
                value: ''
            },
            deliveryMethod: {
                inputType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheepest', displayValue: 'Cheepest'}]
                },
                value: 'fastest'
            }
    };

    const [orderState, setOrderState] = useState(initialOrderState);

    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in orderState) {
            formData[formElementIdentifier] = orderState[formElementIdentifier].value;
        }
        const order = {
            ingredients: props.ingredients,
            price: props.price,
            orderData: formData
        };
        // this.setState({loading: true});
        props.onOrder(order);
    };

    const inputChangeHadler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...orderState
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        setOrderState(updatedOrderForm);
    };

    const formelementArray = [];
    for (let key in orderState) {
        formelementArray.push({
            id: key,
            config: orderState[key]
        })
    }
    const form = props.loading ? <Spinner/> : (
        <form onSubmit={orderHandler}>
            {formelementArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => inputChangeHadler(event, formElement.id)}
                />
            ))}
            <Button btnType="Success">ORDER</Button>
        </form>
    );
    return (
        <div className={classes.ContactData}>
            <h4>Enter your contact data</h4>
            {form}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.orders.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrder: (orderData) => dispatch(orderActions.purchaseBurger(orderData))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));