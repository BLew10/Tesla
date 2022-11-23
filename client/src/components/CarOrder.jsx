import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { carsData } from './carData'
import { MdOutlineStarHalf } from "react-icons/md";
import { MdOutlineStar } from "react-icons/md";
import { BsCheck2 } from "react-icons/bs"
import { BsX } from "react-icons/bs"
import { useOrderCount } from '../context/OrderCount';


const CarOrder = (props) => {
  const { handleOrder } = props
  const cars = ["model3", "modely", "modelx", "models"]
  const navigate = useNavigate()
  const { carName } = useParams()
  const [ratingsArr, setRatingArr] = useState([])
  const [rating, setRating] = useState([])
  const [car, setCar] = useState(carsData[cars.indexOf(carName)])
  const [backgroundImg, setBackgrounImg] = useState(car.display)
  const {setOrderEvent} = useOrderCount()



  useEffect(() => {
    let arr = []
    setCar(carsData[cars.indexOf(carName)])
    setBackgrounImg(carsData[cars.indexOf(carName)].display)
    for (let i = 1; i <= Math.floor(carsData[cars.indexOf(carName)].rating); i++) {
      arr.push(i)
    }
    setRatingArr([...arr])
  }, [carName]);

  return (
    <div>
      <div className='flex flex-col lg:flex-row items-start justify-around w-3/4 mx-auto'>
        <img src={require(`./images/${car.display}`)} className="rounded  w-full lg:w-1/2  mt-32" alt="" />
        <div className='flex flex-col items-start justify-around mt-20 lg:mt-32 basis-2/3 h-full text-left mx-5 h-full'>
          <p className='text-4xl'>{car.title}</p>
          <div className='flex mb-5'>
            {ratingsArr.map(star =>
              <MdOutlineStar size={20} />
            )}
            {car.rating % 1 !== 0 ? <MdOutlineStarHalf size={20} /> : ""}
          </div>
          <p className='my-5 font-thin '>{car.description}</p>
          <p>Price - ${new Intl.NumberFormat("en-GB").format(car.price)}</p>
          {car.inStock ? <p className='flex items-center font-thin my-3'> <BsCheck2 size={20} className="mr-2" /> In Stock!</p> : <p className='flex items-center font-thin my-3'> <BsX size={20} className="mr-2" /> Out of Stock!</p>}
          <button className={`${!car.inStock ? "bg-indigo-200 cursor-not-allowed" : "bg-indigo-500 hover:scale-105 hover:bg-indigo-300"} my-5 w-1/2 py-2 rounded cursor-pointer text-white`} onClick={()=>{ car.inStock ? setOrderEvent(car, 1) : setOrderEvent(car, 0)}}>Add to Cart</button>
          <ul className='list-disc font-thin mx-4 my-5'>
            {car.highlights.map(highlight => 
              <li>{highlight}</li>
            )}
          </ul>

        </div>

      </div>


    </div>
  )
}

export default CarOrder