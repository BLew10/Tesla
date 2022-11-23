
import React, { useState, useEffect } from 'react'
import { carsData } from '../components/carData'
import { useNavigate } from 'react-router-dom'

const TestDriveForm = () => {
    let cars = carsData
    const navigate =useNavigate()
    const [testDrive, setTestDrive] = useState({
        "Model 3": true,
        "Model S": false,
        "Model X": false,
        "Model Y": false
    })
    const [image, setImage] = useState("model-3-drive.avif")

    useEffect(() => {
        console.log("here")
        if (testDrive["Model 3"]) {
            setImage("model-3-drive.avif")
        } else if (testDrive["Model Y"]) {
            setImage("model-y-drive.avif")
        } else if (testDrive["Model S"]) {
            setImage("model-s-drive.avif")
        } else {
            setImage("model-x-drive.avif")
        }
    }, [testDrive]);

    const handleClick = (carTitle) => {
        let currentTest = testDrive
        for (var key in testDrive) {
            testDrive[key] = false;
        }

        testDrive[carTitle] = true

        setTestDrive({ ...currentTest })


    }



    return (
        <div className='w-full lg:w-3/4 mx-auto'>
            <p className='w-[80%] font-semibold text-3xl mt-40 mx-auto'>Schedule a Test Drive</p>
            <p className='w-[80%] mx-auto'>Test Drive a Tesla at a store near you. Drivers must have a valid U.S. driver's license and be 18 years of age or older.

            </p>

            <div className="w-[80%] h-[400px] bg-contain bg-no-repeat bg-center mx-auto " style={{ backgroundImage: `url(${require(`../components/images/${image}`)})` }}> </div>
            <div className='flex justify-between w-full md:w-[80%] mx-auto'>
                {cars.map(car =>
                    <div className={`${testDrive[car.title] ? "border-indigo-500 border-2" : ""} border-2 rounded p-2 cursor-pointer basis-1/4  text-center  mx-3`} onClick={() => handleClick(car.title)}>{car.title}</div>
                )}
            </div>

            <form className="flex-col flex mt-10 w-3/4 lg:w-1/3 mx-auto">
                <div className="flex-col flex " >
                    <label className='ml-4 text-gray-700'> First Name</label>
                    <input type="text" className=' rounded bg-opacity-30 bg-gray-300 '/>
                </div>
                <div className="flex-col flex ">
                    <label className='ml-4 text-gray-700'> Last Name</label>
                    <input type="text" className=' rounded bg-opacity-30 bg-gray-300  '/>
                </div>
                <div className="flex-col flex ">
                    <label className='ml-4 text-gray-700'> Email</label>
                    <input type="email" className=' rounded bg-opacity-30 bg-gray-300  '/>
                </div>
                <div className="flex-col flex ">
                    <label className='ml-4 text-gray-700'> Date</label>
                    <input type="datetime-local" className=' rounded bg-opacity-30 bg-gray-300  ' />
                </div>
                    <button type="submit" className='bg-indigo-500 p-3 rounded text-white my-3' onClick={()=>navigate("/")}>Confirm Test Drive</button>
            </form>

        </div>
    )
}

export default TestDriveForm