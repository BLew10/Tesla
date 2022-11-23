import React, {useState} from 'react'
import CartForm from "../components/CartForm"
import  OrderCountProvider  from '../context/OrderCount'
import NavBar from '../components/NavBar'
import SideMenuBar from '../components/SideMenuBar'

const Cart = () => {
    const [menu, setMenu] = useState(false)

    const handleSideBarOpen = () => {
        setMenu(true)
    }

    const handleSideBarClose = () => {
        setMenu(false)
    }



    return (

        <div className=''>
            <OrderCountProvider>
                <NavBar openSideBar={handleSideBarOpen} menu={menu} order="/add" />
                <CartForm />
                <SideMenuBar closeSideBar={handleSideBarClose} menu={menu} order="/add" />
            </OrderCountProvider>
        </div>
    )
}

export default Cart