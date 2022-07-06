import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name: 'user',
    initialState: 'ahn',
    reducers: {
        changeName(state){
            return 'happy ' + state
        }
    }
})

let cart = createSlice({
    name: 'cart',
    initialState: [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers: {
        upCount(state, action) {
            const target = state.find(s => s.id === action.payload);
            target.count++;
        },
        addItem(state, action) {
            state.push(action.payload);
        }
    }
})

export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer
   }
}) 

export let { changeName } = user.actions;
export let { upCount, addItem } = cart.actions;