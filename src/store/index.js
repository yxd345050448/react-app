import React,
{ Component } from 'react'
import { createStore } from 'redux'
var initState = {
    user: {
        name: '',
        pass: '',
        type: ''
    }
}
function reducer(state = initState, action) {
    switch (action.type) {
        case "login":
            state.user = action.payload;
            return state;
    }
}
var store = createStore(reducer)
export default store;