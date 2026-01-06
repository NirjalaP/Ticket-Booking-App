import React from 'react'

const Title = ({text1, text2}) => {
  return (
   <h1 className='font-medium text-2xl text-white'>
    {text1} <span className='text-red-600 underline underline-offset-4'>
    {text2}</span>
   </h1>
  )
}


export default Title