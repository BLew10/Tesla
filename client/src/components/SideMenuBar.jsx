import React, {useState, useEffect} from 'react'
import { HiOutlineX } from "react-icons/hi";
import { carsData } from './carData'
import { Link, useNavigate } from 'react-router-dom'
import { useOrderCount } from '../context/OrderCount'

const SideMenuBar = (props) => {
  let cars = carsData
  const navigate = useNavigate()
  const { closeSideBar, menu, order } = props
  const modelClasses = 'p-3  rounded-lg hover:bg-slate-500 hover:bg-opacity-25 cursor-pointer'
  const [count, setCount] = useState(JSON.parse(window.sessionStorage.getItem("count")))
  const { currentOrderCount } = useOrderCount()

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




  return (
    <div className={` ${!menu ? "w-0" : "w-1/2 md:w-1/4 "}  lg:hidden fixed bg-white inset-y-0 right-0 duration-300  flex-col flex justify-between `}>
      <div className={`justify-center px-4 [&>*]:my-5 flex flex-col  bg-white ${menu ? "scale-100" : ""} `}>
        {menu ? <HiOutlineX size={30} onClick={() => closeSideBar()} className={`self-end hover:rounded-md my-5 mx-4 hover:bg-slate-500 hover:bg-opacity-25 cursor-pointer `} /> : ""}
        {cars.map(car => order ? <p className={modelClasses} onClick={() => navigate(`/${car.url}${order}`)}>{car.title}</p> : <p className={modelClasses} onClick={() => navigate(`/${car.url}`)}>{car.title}</p>
        )}
      </div>
      <div className='flex justify-around [&>*]:mx-2   items-center my-3 justify-self-end inset-y-0'>
        <img src={`https://img.icons8.com/pastel-glyph/64/000000/gender-neutral-user.png`} before="hello" className='w-[40px] cursor-pointer' />
        <div className=''>
          <img src={`https://img.icons8.com/pastel-glyph/64/000000/fast-cart.png`} before="hello" className='w-[40px] cursor-pointer' onClick={() => navigate("/cart/checkout")}  />
          <p className={`rounded-full bg-red-500 w-fit px-[6.5px] py-[0.5px] text-sm text-white absolute right-[45%] bottom-[4.3%] ${!menu ? "hidden" : ""} ${count ? "" : "hidden"}`}>{count}</p>

        </div>
        <p className={`${modelClasses} ${!menu ? "hidden" : ""} self-center`} >Logout</p>
      </div>
    </div>

  )
}

export default SideMenuBar