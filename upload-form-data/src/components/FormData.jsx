import React, { useEffect, useState } from 'react';
import axios from 'axios'
import UploadImage from './UploadImage';
import {toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email("Email format is not valid").required('Email is required')
})
const FormData = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
    resolver: yupResolver(schema),
  });

  axios.defaults.baseURL = 'http://localhost:8000';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage]= useState(null)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  // const delay = ms => new Promise(
  //   resolve => setTimeout(resolve, ms)
  // );
  const resetAllItems = () =>{
    setName('')
    setEmail('')
    setPhone('')
    setImage('')
  }
  async function getDataFromServer() {
    try {
      const response = await axios.get('/api/v1'); // Make a GET request to the server
      const alldata = response.data; // Extract the data from the response]
      setData(alldata);
      setLoading(true)
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // const convertImagefrom64base = (img) =>{
  //   const reader = new FileReader();
  //   return 

  // }
  const onSubmitHandler = async (e) => {
    // e.preventDefault();
    const allDataSend = { name, email, phone, image };
    console.log(allDataSend);
    try {
      const response = await fetch('http://localhost:8000/api/v1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(allDataSend),
      });
      console.log(response);
      if (response.ok) {
        // Data successfully sent to the server
        toast.success('Data sent successfully!', {
          position: toast.POSITION.TOP_RIGHT
      });
        resetAllItems()
        // You can also reset the form here
      } else {
        console.error('Failed to send data to the server.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <>
    <form className="border p-2 px-4 bg-white" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="form-control">
        <label className="label">
          <span className="text-black label-text font-semibold text-[18px]">Your Name</span>
        </label>
        <label className="input-group">
          <input
            type="text"
            placeholder="Enter your Name"
            value={name}
            {...register("name")}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
          />
        </label>
        <p className="text-left error text-red-600">{errors.name?.message}</p>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="text-black label-text font-semibold text-[18px]">Email</span>
        </label>
        <label className="input-group">
          <input
            type="text"
            placeholder="Enter your Email"
            value={email}
            {...register("email")}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
          />
        </label>
        <p className="text-left error text-red-600">{errors.email?.message}</p>

      </div>

      <div className="form-control">
        <label className="label">
          <span className="text-black label-text font-semibold text-[18px]">Phone</span>
        </label>
        <label className="input-group">
          <input
            type="number"
            placeholder="Enter your phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input input-bordered w-full"
          />
        </label>
        <p className="text-left error text-red-600">{errors.phone?.message}</p>

      </div>

      <UploadImage image={image} setImage={setImage}  />

      <div className="flex gap-5 mt-10">
        <input type="submit" className="btn" value="Add" />
      </div>
    </form>

    <button onClick={getDataFromServer}>Access server using proxy</button>
      <p>data : </p>
      {loading ? data.map((user)=>(
      <div className='flex justify-between items-center gap-[30px] border shadow bg-orange-400 p-2 px-5 mt-10 rounded overflow-hidden' key={user.id}>
        <h1 className='font-semibold text-black'>{user.name} </h1> 
        <h3 className='font-semibold text-blue-900'>{user.email} </h3> 
        <h3 className='font-semibold text-green-900'>{user.phone} </h3> 
        <img className='w-[300px] h-[300px]' src={user.image} />
        </div>)) : (<p> loading...</p>)} 
      
    </>
  );
};

export default FormData;
