import React, { useState } from 'react'
import { carsData } from '../components/carData'
import TestDriveForm from '../components/TestDriveForm'
import NavBar from '../components/NavBar'
import SideMenuBar from '../components/SideMenuBar'
import OrderCountProvider from '../context/OrderCount'

const TestDrive = () => {

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
                <NavBar openSideBar={handleSideBarOpen} menu={menu} order="/add" />
                <TestDriveForm />
                <SideMenuBar closeSideBar={handleSideBarClose} menu={menu} order="/add" />
            </OrderCountProvider>

        </div>
    )
}

export default TestDrive