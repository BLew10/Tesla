import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import CarSectionHome from '../components/CarSectionHome'
import SideMenuBar from '../components/SideMenuBar'
import '../components/index.css'
import  OrderCountProvider from '../context/OrderCount'

const Home = () => {
    const [menu, setMenu] = useState(false)


    const handleSideBarOpen = () => {

        setMenu(true)

    }

    const handleSideBarClose = () => {
        setMenu(false)
    }


    return (
        <div className="flex">
            <OrderCountProvider>
                <NavBar openSideBar={handleSideBarOpen} menu={menu} order="/" orderCount={{}} />
                <CarSectionHome />
                <SideMenuBar closeSideBar={handleSideBarClose} menu={menu} order="/" />
            </OrderCountProvider>



        </div>
    )
}

export default Home