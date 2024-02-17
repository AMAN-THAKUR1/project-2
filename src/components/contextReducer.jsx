import React, { createContext, useReducer, useContext } from 'react';

const cartStateContext = createContext();
const cartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qnt: action.qnt, size: action.size, price: action.price, img: action.img }];
        case "REMOVE":
            let newArr = [...state];
            newArr.splice(action.index,1);
            return newArr;
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qnt, parseInt(action.qnt), action.price + food.price)
                    arr[index] = { ...food, qnt: parseInt(action.qnt) + food.qnt, price: action.price + food.price }
                }
                return arr
            })
            return arr
        case "DROP":
            let empArray = []
            return empArray
        default:
            console.log("Error in reducer:", action.type);
            return state; // Make sure to return state in the default case

    }
};

export const CartProvider = ({ children }) => { // Corrected spelling of children
    const [state, dispatch] = useReducer(reducer, []); // Provide initial state as an empty array
    return (
        <cartDispatchContext.Provider value={dispatch}>
            <cartStateContext.Provider value={state}>
                {children} {/* Corrected spelling */}
            </cartStateContext.Provider>
        </cartDispatchContext.Provider>
    );
};

export const useCart = () => useContext(cartStateContext);
export const useDispatchCart = () => useContext(cartDispatchContext);
