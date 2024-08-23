import React from 'react'
import { Link } from 'react-router-dom'
Link

const Home = () => {
  return (
    <>
        <div className="mx-auto mt-10 flex h-[80vh] w-4/5 flex-col items-center justify-center">
      <h1 className="mb-10 break-words font-poppins text-orange-500 text-center text-4xl font-bold lg:text-5xl">
        Engineering React Quiz Challenge
      </h1>
      <Link
        to="/quiz"
        className="rounded-md font-poppins px-6 py-2 text-lg border-orange-500 border-solid border-2 hover:text-[25px] transition-all text-orange-500 hover:bg-orange-500 hover:text-white"
      >
        Let's Begin
      </Link>
    </div> 
    </>
  )
}

export default Home
