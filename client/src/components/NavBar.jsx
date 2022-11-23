import React, { useState, useEffect, useRef } from 'react'
import teslaLogo from './images/logo.svg'
import teslalogowhite from './images/teslalogowhite.png'
import { Link, useNavigate } from 'react-router-dom'

import { carsData } from './carData'
import { useOrderCount } from '../context/OrderCount'


const NavBar = (props) => {
    let cars = carsData
    let pictureColor = "000000"
    const navigate = useNavigate()

    const { openSideBar, text, carName, order, orderCount, empty} = props
    const [count, setCount] = useState(JSON.parse(window.sessionStorage.getItem("count")))
    const { currentOrderCount } = useOrderCount()
    const previousCount = useRef()
 

    useEffect(() => {
        let current = 0

        for (let count of Object.keys(currentOrderCount)) {
           current += currentOrderCount[count]
        }    

        if (current !== 0) {
            setCount(current)
        }  else {
            setCount(0)
        }
    }, [order, currentOrderCount]);



    const modelClasses = `p-3  rounded-lg hover:bg-slate-500 hover:bg-opacity-50 cursor-pointer text-${text} `
    if (text === "white" && carName !== "modelx") {
        pictureColor = "FFFFFF"
    }



    return (
        <div className='flex items-center justify-between bg-transparent mb-4 top-0  fixed w-[99%] pt-4 mx-5'>
            <div className='basis-1/3 '>
                {text === "white" ? <img src={teslalogowhite} alt="Tesla Logo" className={`ml-5 w-[200px] hover:cursor-pointer`} onClick={() => navigate(`/`)} /> : <img onClick={() => navigate(`/`)} src={teslaLogo} alt="Tesla Logo" className={`ml-5  w-[200px] h-[25px] hover:cursor-pointer`} />}
            </div>
            <div className={`hidden lg:flex items-center justify-center [&>*]:mx-1 justify-self-center basis-1/3`}>
                {cars.map(car => order ? <p className={modelClasses} onClick={() => navigate(`/${car.url}${order}`)}>{car.title}</p> : <p className={modelClasses} onClick={() => navigate(`/${car.url}`)}>{car.title}</p>
                )}

            </div>
            <p className={`lg:hidden text-right mx-10  basis-0 px-5 py-2 rounded-lg bg-slate-500 bg-opacity-25 hover:bg-opacity-75 cursor-pointer text-${text}`} onClick={() => openSideBar()}>Menu</p>
            <div className='hidden lg:flex items-center justify-end [&>*]:mx-4 [&>*]:cursor-pointer basis-1/3 mx-4'>
                <img src={`https://img.icons8.com/pastel-glyph/64/${pictureColor}/gender-neutral-user.png`} className='w-[40px]' />
                <div>
                    <img src={`https://img.icons8.com/pastel-glyph/64//${pictureColor}/fast-cart.png`} className='w-[40px]' onClick={()=> navigate("/cart/checkout")} />
                    <p className={`rounded-full bg-red-500 w-fit px-[6.5px] py-[0.5px] text-sm text-white absolute right-[105px] lg:top-[30%] xl:top-[25%] ${count ? "" : "hidden"}`}>{count}</p>

                </div>
                <p className={`text-${text}`}>Logout</p>
            </div>


        </div>

    )
}

export default NavBar