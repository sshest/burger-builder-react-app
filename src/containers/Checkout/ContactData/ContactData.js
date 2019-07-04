import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axois-orders';

import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Sergey',
                address: {
                    street: 'Any street 1',
                    country: 'Uk',
                    postalCode: '61000'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };
        this.setState({loading: true});

    }

    render() {
        const form = this.state.loading ? <Spinner/> : (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                <input className={classes.Input} type="text" name="email" placeholder="Your Email"/>
                <input className={classes.Input} type="text" name="street" placeholder="Your Street"/>
                <input className={classes.Input} type="text" name="postalCode" placeholder="Your Postal Code"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
};

export default connect(mapStateToProps)(ContactData);