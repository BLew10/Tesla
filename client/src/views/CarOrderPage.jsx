import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import SideMenuBar from '../components/SideMenuBar'
import { useParams } from 'react-router-dom'
import CarOrder from '../components/CarOrder'
import  OrderCountProvider  from '../context/OrderCount'


const CarOrderPage = () => {
    const [menu, setMenu] = useState(false)

    const handleSideBarOpen = () => {
        setMenu(true)
    }

    const handleSideBarClose = () => {
        setMenu(false)
    }

    return (

        <div>
            <OrderCountProvider>
                <NavBar openSideBar={handleSideBarOpen} menu={menu} order="/add"  />
                <CarOrder />
                <SideMenuBar closeSideBar={handleSideBarClose} menu={menu} order="/add" />
            </OrderCountProvider>
        </div>
    )
}

export default CarOrderPage
