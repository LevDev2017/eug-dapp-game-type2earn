import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter-xxx',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state, action) => {
            console.log('>>> action', action)
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            // action = {type: '<name>/incrementByAmount', payload: {…}}
            state.value += action.payload
        },
    },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
