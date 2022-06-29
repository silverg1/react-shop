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
        upCount(state) {
            // array에서 변경하는 법 검색하기
            return state[0].count += 1;
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
export let { upCount } = cart.actions;