import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo, updateUserAsync } from '../userSlice';
import {useForm} from 'react-hook-form';

export default function UserProfile() {
  
  const dispatch = useDispatch();
  const user=useSelector(selectUserInfo);
  const {register,handleSubmit,reset,setValue,formState:{errors},}=useForm();
  const [selectedEditIndex,setSelectedEditIndex]=useState(-1);
  const [showAddAddressForm,setShowAddAddressForm]=useState(false);
  const handleEdit=(addressUpdate,index)=>{
    const User={...user,addresses:[...user.addresses]};
    
    User.addresses.splice(index,1,addressUpdate);
    
    dispatch(updateUserAsync(User));
    setSelectedEditIndex(-1);
  }
  const handleRemove=(e,index)=>{
    const newUser={...user,addresses:[...user.addresses]};
    newUser.addresses.splice(index,1);
    dispatch(updateUserAsync(newUser));
  }
  const handleEditForm=(index)=>{
    setSelectedEditIndex(index);
    const address=user.addresses[index];
    setValue('name',address.name);
    setValue('email',address.email);
    setValue('street',address.street);
    setValue('city',address.city);
    setValue('state',address.state);
    setValue('pinCode',address.pinCode);
    setValue('phone',address.phone);
  }
  const handleAdd=(address)=>{
    const User={...user,addresses:[...user.addresses,address]};
    dispatch(updateUserAsync(User));
    setShowAddAddressForm(false);
  }
  
  return (
    
       <div className='mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8'>
      
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
      <h1 className='text-4xl my-5 font-boldtracking-tight text-gray-900'>Name: {user.name?user.name:"Guest"}</h1>
      <h3 className='text-xl my-5 font-boldtracking-tight text-red-900'>
        Email Address: {user.email}
      </h3>
      {user.role==='admin' && <h3 className='text-xl my-5 font-boldtracking-tight text-red-900'>
        Role: {user.role}
      </h3>}
                   
                 </div>
               
               <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
               <button
               onClick={e=>{setShowAddAddressForm(true); setSelectedEditIndex(-1);}}
          type="submit"
          className="rounded-md my-5 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add New Address
        </button>
        {showAddAddressForm ? <form noValidate className='bg-white-500 px-5 py-12 mt-12 ' onSubmit={handleSubmit((data)=>{
          handleAdd(data);
          reset();
        })}>
            <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
          <h2 className=" text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Full name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  {...register('name',{required:'name is required'})}
                  
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register('email',{required:'email is required'})}
                  
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone
              </label>
              <div className="mt-2">
              <input
                  id="phone"
                  {...register('phone',{required:'phone is required'})}
                  
                  type="tel"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  id="street"
                  {...register('street',{required:'street address is required'})}
                  
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  {...register('city',{required:'city is required'})}
                  
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  id="state"
                  {...register('state',{required:'state is required'})}
                  
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  id="pinCode"
                  {...register('pinCode',{required:'pin code is required'})}
                  
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
      <button
          onClick={(e)=>setShowAddAddressForm(false)}
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Address
        </button>
      </div>
      
        </form>:null}


                 <p className="mt-0.5 text-sm text-gray-500">Your Address:</p>
        
        
        
        {user.addresses.map((address,index)=>
        <div>
          {selectedEditIndex===index ? <form noValidate className='bg-white-500 px-5 py-12 mt-12 ' onSubmit={handleSubmit((data)=>{
          handleEdit(data,index);
          reset();
        })}>
            <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
          <h2 className=" text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Full name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  {...register('name',{required:'name is required'})}
                  
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register('email',{required:'email is required'})}
                  
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone
              </label>
              <div className="mt-2">
              <input
                  id="phone"
                  {...register('phone',{required:'phone is required'})}
                  
                  type="tel"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  id="street"
                  {...register('street',{required:'street address is required'})}
                  
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  {...register('city',{required:'city is required'})}
                  
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  id="state"
                  {...register('state',{required:'state is required'})}
                  
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  id="pinCode"
                  {...register('pinCode',{required:'pin code is required'})}
                  
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
      <button
          onClick={(e)=>setSelectedEditIndex(-1)}
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Edit Address
        </button>
      </div>
      
        </form>:null}
          <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.phone}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          

            <p className="text-sm leading-6 text-gray-900">{address.city}</p>
            
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <button type="button" className="font-small text-sm text-indigo-600 hover:text-indigo-500" onClick={(e)=>handleEditForm(index)}>
                                    Edit
          </button>
          <button type="button" className="font-small text-sm text-indigo-600 hover:text-indigo-500" onClick={(e)=>handleRemove(e,index)}>
                                    Remove
          </button>

            
          </div>
        </div>
        </div>
        )}
        
                 
               </div>
   </div>
    
  );
}
