import React, { useEffect, useState } from 'react'
import image from '/download.jpeg'
import SketelonLoad from './SketelonLoad'
const Sketelon = () => {
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(true)
  const getAllUsers = async() => {
    const res = await fetch('https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole')
    const data = await res.json()
    setUsers(data)
    setLoading(false)
  }

  useEffect(()=>{
    setTimeout(()=>{
      getAllUsers()

    }, 2000)
  },[])
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
      
      {loading ?
      (
        <>
        <SketelonLoad /> 
        <SketelonLoad /> 
        <SketelonLoad /> 
        <SketelonLoad /> 
        <SketelonLoad /> 
        <SketelonLoad /> 
        <SketelonLoad /> 
        <SketelonLoad /> 
        </>

      )
      : (
      users?.map((item, index)=>(
      <div className='card bg-white shadow-black overflow-hidden p-3 mt-10' key={index}>
      <img src={`https://joesch.moe/api/v1/${item.first}`} height={200} width={200} className='block m-auto rounded'/>
        <h2 className='font-semibold mb-5 mt-10 text-[25px] text-black'>{item.first+' '+item.last}</h2>
        <p  className='font-semibold mb-5 text-black'>{item.email}</p>
        <h3  className='font-semibold mb-5 text-black'>{item.address}</h3>
        <p  className='font-semibold mb-5 text-black'>{item.balance}</p>
      </div>
      ))
      )}


    </div>
  )
}

export default Sketelon