import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const OrderCountContext = createContext({
    currentOrderCount: null,
    setValue: (value) => { }
})

export const useOrderCount = () => useContext(OrderCountContext)


function OrderCountProvider({ children }) {
    const navigate = useNavigate()



    if (!JSON.parse(window.sessionStorage.getItem("currentOrderCount"))) {
        window.sessionStorage.setItem("currentOrderCount", JSON.stringify({}))
    }

    const [currentOrderCount, setCurrentOrderCount] = useState(JSON.parse(window.sessionStorage.getItem("currentOrderCount")))

    const setDelete = (updatedOrder, updatedCars) => {

        window.sessionStorage.setItem("currentOrderCount", JSON.stringify({...updatedOrder}))
        setCurrentOrderCount(updatedOrder)
        
    }
   


    const setOrderEvent = (car, count) => {
        
            window.sessionStorage.setItem("currentOrderCount", JSON.stringify({ ...currentOrderCount, [car.title]: count }));
            setCurrentOrderCount({ ...currentOrderCount, [car.title]: count })
        

    }

    const value = { currentOrderCount, setOrderEvent, setDelete}



    return (
        <OrderCountContext.Provider value={value}>
            {children}
        </OrderCountContext.Provider>
    )
}

export default OrderCountProvider