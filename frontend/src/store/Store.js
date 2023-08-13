import { createSlice } from '@reduxjs/toolkit';

//Initial state for  the datareducer
const initialState = {
    product: []
}

// Create a datareducer slice using createSlice from Redux Toolkit
const datareducer = createSlice({
    name: 'user',// Name of the slice
    initialState: initialState,
    reducers: {
        //Set all product inside product
        setproduct: (state, action) => {
            const data = action.payload;
            state.product = data;
        },
        //Add product inside product
        addproduct: (state, action) => {
            const data = action.payload;
            state.product.push(data)
        },
        //Delete product from product
        deleteproduct: (state, action) => {
            const data = action.payload;
            state.product = state.product.filter(product => product.id !== data);
        },
    },
});

export const { addproduct, setproduct, deleteproduct } = datareducer.actions;
export default datareducer.reducer;
