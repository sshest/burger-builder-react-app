import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utilities';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    Salad: 0.5,
    Cheese: 0.4,
    Meat: 1.3,
    Bacon: 0.7
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
            return updateObject(state, updatedState);
        case actionTypes.REMOVE_INGREDIENT:
            const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
            const updatedIngrs = updateObject(state.ingredients, updatedIng);
            const updatedSt = {
                ingredients: updatedIngrs,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
            return updateObject(state, updatedSt);

        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: action.ingredients,
                totalPrice: initialState.totalPrice,
                error: false
            });
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true});
        default:
            return state;

    }
};

export default reducer;