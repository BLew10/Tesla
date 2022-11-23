import React, { useState } from 'react'
import { carsData } from './carData'
import SingleCarHome from './SingleCarHome'

const CarSectionHome = () => {
    const [cars, setCars] = useState(carsData)

    return (
        <div className=' snap-mandatory overflow-x-hidden overflow-y-auto text-center snap-y w-screen h-screen scroll-smooth '>
  
            {cars.map((car, i) =>
                <div className="" id={car.title}>
                    <SingleCarHome car={car} cars={carsData} idx={i}/>
                </div>
            )}

        </div>
    )
}

export default CarSectionHome