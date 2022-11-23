import React, { useState } from 'react'
import { Car } from '../components/Car'
import NavBar from '../components/NavBar'
import SideMenuBar from '../components/SideMenuBar'
import { useParams } from 'react-router-dom'
import  OrderCountProvider  from '../context/OrderCount'


const CarPage = () => {
    const { carName } = useParams()
    const [menu, setMenu] = useState(false)

    const [car, setCar] = useState("")

    let textColor = "white"
    if (carName === "modelx") {
        textColor = ""
    }


    const handleSideBarOpen = () => {
        setMenu(true)
    }

    const handleSideBarClose = () => {
        setMenu(false)
    }

    const handleCar = (car) => {
        console.log(car)
        setCar(car)
    }

    return (

        <div>
            <OrderCountProvider>
                <NavBar openSideBar={handleSideBarOpen} menu={menu} text={textColor} carName={carName} handleCar={handleCar} />
                <Car carLive={car} text={textColor} />
                <SideMenuBar closeSideBar={handleSideBarClose} menu={menu} />
            </OrderCountProvider>
        </div>
    )
}

export default CarPage

