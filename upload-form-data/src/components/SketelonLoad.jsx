import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const SketelonLoad = () => {
  return (
    <div className='card bg-white shadow-black overflow-hidden p-3 mt-10'>
    <SkeletonTheme highlightColor="#e8ffd1">
    <Skeleton circle={true} width={200} height={200} className='block m-auto rounded'/>
      <h2 className='font-semibold mb-5 mt-10'>      <Skeleton count={1} /></h2>
      <p  className='font-semibold mb-5'> <Skeleton count={1} /></p>
      <h3  className='font-semibold mb-5'> <Skeleton count={1} /></h3>
      <p  className='font-semibold mb-5'> <Skeleton count={1} /></p>
    </SkeletonTheme>



    </div>
 
  )
}

export default SketelonLoad