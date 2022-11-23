import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { carsData } from './carData'

export const Car = (props) => {
    const cars = ["model3", "modely", "modelx", "models"]
    const navigate = useNavigate()
    const { carName } = useParams()
    const [car, setCar] = useState(carsData[cars.indexOf(carName)])
    const [backgroundImg, setBackgrounImg] = useState(car.display)

    useEffect(() => {
        setCar(carsData[cars.indexOf(carName)])
        setBackgrounImg(carsData[cars.indexOf(carName)].display)
    }, [carName]);

    return (
        <div>
            <div className=' w-screen h-[100vh] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-between' style={{ backgroundImage: `url(${require(`./images/${backgroundImg}`)})` }} >
                <div className="my-[20%] lg:my-[10%]">
                    <p className={`text-4xl text-center ${car.title ==="Model X" ? "" : "text-white"}`}>{car.title}</p>
                </div>
                <div className='flex flex-col items-center justify-center w-full lg:w-1/2'>
                    <div className='flex justify-around items-center w-full'>
                        {Object.keys(car.features).map(key =>
                            <div className='flex-col justify-center items-center [&>*]:my-3'>
                                <p className='text-center text-3xl text-white'>{car.features[key]}</p>
                                <p className='text-center text-white'>{key}</p>
                            </div>
                        )}
                    </div>
                    <button className="bg-transparent border-2 border-white rounded my-10 w-3/4 lg:w-1/2 py-1 text-white hover:text-black duration-500 hover:bg-white" onClick={()=>navigate(`/${car.url}/add`)}>Order Now</button>

                </div>
            </div>
        </div>
    )
}




