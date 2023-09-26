// Libraries
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: []
};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        loadCartFromLocalStorage: (state) => {
            const cart = localStorage.getItem('cart');
            if (cart) state.products = JSON.parse(cart);
        },
        addProductToCart: (state, action) => {
            if (state.products.every((product) => product.id !== action.payload.id))
                state.products.push(action.payload);
            else
                state.products.forEach((product) => {
                    if (product.id === action.payload.id) product.cartQuantity = ++product.cartQuantity;
                });
            localStorage.setItem('cart', JSON.stringify(state.products));
        },
        removeProductFromCart: (state, action) => {
            state.products = state.products.filter((product) => product.id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state.products));
        },
        setProductQuantity: (state, action) => {
            state.products.forEach((product) => {
                if (product.id === action.payload.id) product.cartQuantity = action.payload.quantity;
            });
            localStorage.setItem('cart', JSON.stringify(state.products));
        },
        clearCart: (state) => {
            state.products = [];
            localStorage.setItem('cart', JSON.stringify(state.products));
        }
    }
});

export const cartReducer = cartSlice.reducer;
export const selectCart = (state) => state.cart;
export const { loadCartFromLocalStorage, addProductToCart, removeProductFromCart, setProductQuantity, clearCart } =
    cartSlice.actions;
