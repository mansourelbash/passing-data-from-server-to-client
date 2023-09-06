import { useState } from "react"
import React from 'react'

const UploadImage = ({image, setImage}) => {
  const [file, setFile] = useState(null)
  const setNewFile = (e) =>{
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0])
    setFile(e.target.files[0])
    reader.onload = ()=>{
      setImage(reader.result)
    }
    reader.onerror = ()=>{
      console.log(reader.error)
    }
  }
  return (
    <>
      <div className="form-control">
        <label className="label">
          <span className="text-black label-text font-semibold text-[18px]">Please Choose your photo</span>
        </label>
        <label className="input-group">
          <input type="file" className="file-input w-full max-w-xs" onChange={setNewFile} />
        </label>
        {/* <p className="text-left error text-red-600">{errors.image?.message}</p> */}
      </div>
       {image == '' || image == null ? ''  : <img className="w-[300px] h-[300px] rounded border shadow"  src={image} />}
    </>
  )
}

export default UploadImage