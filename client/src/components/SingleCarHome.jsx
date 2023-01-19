import React, { useRef } from 'react'
import { Link,useNavigate } from 'react-router-dom'

const SingleCarHome = (props) => {
    const { cars, car, idx } = props
    const navigate = useNavigate()
    let backgroundImg = `./images/${car.backgroundImg}`

    return (
        <div className="snap-start snap-always w-screen  scroll-smooth" id={car.title}>
            <div className=' w-screen h-[100vh] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-between' style={{ backgroundImage: `url(${require(`./images/${car.backgroundImg}`)})` }} >
                <div className="my-[100px]">
                    <p className='text-5xl text-center'>{car.title}</p>
                    <p className=' mx-auto my-4 text-center underline hover:font-bold cursor-pointer' onClick={() => navigate("/test/drive")}>Schedule a Test Drive</p>
                </div>
                <div className='flex flex-col items-center justify-center w-full lg:w-1/2'>
                    <div className={`flex items-center w-full justify-center  ${idx === 3 ? "my-10" : ""}`}>
                        <button className={`rounded-md bg-black bg-opacity-50 font-semibold text-white p-3 w-[250px] mx-5 animate-pulse hover:bg-opacity-75 hover:animate-none hover:scale-105 `} onClick={()=>navigate(`/${car.url}/add`)}>Custom Order</button>
                        <button className='rounded-md bg-white bg-opacity-50 font-semibold text-black p-3 w-[250px]  mx-5 animate-pulse hover:bg-opacity-75 hover:animate-none hover:scale-105' onClick={()=>navigate(`/${car.url}`)}>More Details</button>
                    </div>
                    {idx !== 3 ?
                        <img src="https://img.icons8.com/sf-black/64/393c41/expand-arrow.png" className="text-center mb-5 mt-10 animate-bounce cursor-pointer w-[25px]" onClick={() =>
                            document.getElementById(cars[idx+1].title).scrollIntoView()} /> : <p className="p-3  rounded-lg hover:bg-slate-500 hover:bg-opacity-50 cursor-pointer"  onClick={() =>
                                document.getElementById(cars[0].title).scrollIntoView()}>Back to Top</p>}
                </div>
            </div>
        </div>
    )
}

export default SingleCarHome

