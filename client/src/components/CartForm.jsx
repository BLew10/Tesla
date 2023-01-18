import React, { useEffect, useState } from 'react'
import { useOrderCount } from '../context/OrderCount'
import { carsData } from './carData'
import { HiOutlineX } from "react-icons/hi";
import { HiCheck } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import Confetti from "react-confetti";


const CartForm = (props) => {
    const cars = carsData
    const { setEmpty } = props
    const navigate = useNavigate()
    const { currentOrderCount, setOrderEvent, setDelete } = useOrderCount()
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const [carCost, setCarCost] = useState({
        "Model 3": 0,
        "Model S": 0,
        "Model X": 0,
        "Model Y": 0
    })
    const [carCount, setCarCount] = useState({
        "Model 3": 1,
        "Model S": 1,
        "Model X": 1,
        "Model Y": 1
    })
    const [confetti, setConfetti] = useState(false)


    useEffect(() => {
        if (!confetti) {
            let sum = 0
            let carsOrdered = []
            let cost ={}
            for (let orderedCar of Object.keys(currentOrderCount)) {
                for (let car of cars) {

                    if (car.title === orderedCar) {
                        cost[car.title] = car.price
                        sum += car.price
                        carsOrdered.push(car)
                    }
                }
            }

            setTotal(sum)
            setCarCost(cost)
            setCart(carsOrdered)
        }
    }, [currentOrderCount]);

    const handleChange = (e, price) => {
        let sum = 0
        let costOf = { ...carCost, [e.target.id]: parseInt(e.target.value) * parseInt(price) }
        
        for (let cost in costOf) {
            sum += costOf[cost]
        }
        setCarCost({...costOf})
        setTotal(sum)

    }

    const handleDelete = (index) => {
        let updatedCars = cart.filter((car, i) => i !== index)
        let updatedOrder = {}

        for (let car of updatedCars) {
            updatedOrder[car.title] = 1
        }
        setDelete(updatedOrder, updatedCars)

        setCart(updatedCars)
    }

    const triggerConfetti = () => {
        setConfetti(true)
        setDelete({}, [])
    }

    return (


        <div className="flex flex-col lg:flex-row justify-between w-[90%] mx-auto">
            {confetti && <Confetti className="w-screen" />}
            {total ?
                <div className='flex flex-col mt-40 basis-2/3 w-full mx-5'>
                    {cart.map((car, idx) =>
                        <div className="flex   my-3 ">
                            <img src={require(`./images/${car.display}`)} className="w-[200px] lg:w-[300px] rounded mx-3" alt="" />
                            <div className="">
                                <p>{car.title}</p>
                                <p className='text-sm font-thin   max-w-prose  '>{car.description.substring(0, 150)
                                    .concat("...")}</p>
                                <p>${new Intl.NumberFormat("en-GB").format(car.price)}</p>

                            </div>
                            <select name="ordered" id={car.title} value={carCount[car.title]} onChange={(e) => {handleChange(e, car.price); setCarCount({...carCount, [car.title]:e.target.value})}} className="self-start my-1 mx-3" >
                                {[1, 2, 3, 4, 5].map(option => <option value={option} key="">{option}</option>)}
                            </select>
                            {!confetti ? <HiOutlineX size={30} className={`self-start cursor-pointer mx-3`} onClick={() => handleDelete(idx)} /> :
                                <img src="https://img.icons8.com/ios-filled/50/2DD868/checkmark--v1.png" className='w-[20px] h-[20px] mx-3' />}

                        </div>
                    )}
                </div> :
                <>
                    <div className='mt-40 flex justify-center items-center  [&>*]:mx-10 w-full'>
                        <p>
                            Cart is Empty...
                        </p>
                        <div className='p-3 bg-indigo-500 h-fit rounded text-white hover:bg-indigo-200 cursor-pointer' onClick={() => navigate("/")}>Shop Now!</div>
                    </div>
                </>}


            <div className='flex flex-col mx-4 justify-start mt-40 basis-1/3 [&>*]:flex [&>*]:justify-between font-thin  '>
                <p>Order Summary</p>
                <div className='my-3'><p>Subtotal</p><p>${new Intl.NumberFormat("en-GB").format(total)}</p></div>
                <div className='my-3'><p>Shipping Estimate</p><p>${new Intl.NumberFormat("en-GB").format(`${total ? 500 : 0}`)}</p></div>
                <div className='my-3'><p>Tax Estimate</p><p>${new Intl.NumberFormat("en-GB").format(total * 0.085)}</p></div>
                <div className='my-3'><p>Order Total</p><p>${new Intl.NumberFormat("en-GB").format(`${total ? total + 500 + (total * 0.085) : 0}`)}</p></div>
                <button className={`w-full p-3 ${confetti ? "bg-green-300 font-bold" : "bg-indigo-500 hover:bg-indigo-200"}  cursor-pointer rounded flex-none text-white text-center `} onClick={() => {
                    total && !confetti && triggerConfetti()
                }}><span className='w-full text-white  text-center self-center'>{confetti ? "Ordered Submitted!" : "Checkout"}</span></button>

            </div>
        </div>
    )
}

export default CartForm