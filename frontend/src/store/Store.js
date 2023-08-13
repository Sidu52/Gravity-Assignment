import { createSlice } from '@reduxjs/toolkit';

//Initial state for  the datareducer
const initialState = {
    product: []
}

// Create a datareducer slice using createSlice from Redux Toolkit
const datareducer = createSlice({
    name: 'user',// Name of the slice
    initialState: initialState,// Initial state
    reducers: {
        setproduct: (state, action) => {
            const data = action.payload;
            state.product = data;
        },
        addproduct: (state, action) => {
            const data = action.payload;
            state.product.push(data) // Update the loading state with the payload
        },
        deleteproduct: (state, action) => {
            const data = action.payload;
            state.product = state.product.filter(product => product.id !== data);
        },
    },
});

export const { addproduct, setproduct, deleteproduct } = datareducer.actions;
export default datareducer.reducer;
