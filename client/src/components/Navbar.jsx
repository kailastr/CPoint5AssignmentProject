import React, { useState, Fragment, useEffect } from 'react'
import { FaPlus } from "react-icons/fa";
import { Dialog, Transition } from '@headlessui/react';

function NavbarLg() {

    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    let [ProductName, setProductName] = useState("");
    let [imageURL, setImageURL] = useState("");
    let [ProductPrice, setProductPrice] = useState();
    let [IsInWeight, setIsInWeight] = useState("");
    let [Quantity, setQuantity] = useState("");
    let [Description, setDescription] = useState("");

    function handleForm(event) {
        event.preventDefault();
        let data = {
            ItemName: ProductName,
            ImageURL: imageURL,
            price: ProductPrice,
            IsQuantityInWeight: IsInWeight,
            quantity: Quantity,
            description: Description
        }

        // fetch('http://localhost:2255/items', {
        //     //method
        //     method: 'POST',
        //     //headers
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     //body
        //     body: JSON.stringify(data)
        // }).then(response => response.json()).then(data => {
        //     console.log(data);
        // })
        fetch('http://localhost:2255/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setIsOpen(false);

                return response.json();

            })
            .then(data => {
                console.log('Data received:', data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });


    }



    return (
        <>
            {/* Navbar */}
            <div className='container flex mx-auto px-4 items-center justify-between'>
                <div className='flex items-center w-3/4 gap-3'>
                    <h1 className='font-medium text-white text-2xl hover:text-blue-200 hover:cursor-pointer'>Grocery DashBoard</h1>
                </div>
                <div className='lex items-center w-1/4'>
                    {/* <input type="button" value="{<CiSquarePlus />} Add New Item" className='bg-blue-100 h-10 w-40 rounded-md border border-gray-300' /> */}
                    <button
                        onClick={openModal}
                        className='bg-blue-100 h-10 w-40 rounded-md border border-gray-300 container flex items-center justify-center gap-2 font-medium hover:text-white hover:bg-indigo-600'>
                        <FaPlus /> Add New Item
                    </button>
                </div>
            </div>

            {/* Modal */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as='div' className="relative z-10" onClose={closeModal} >
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-100'
                        leave='ease-in duration-100'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-black/25' />
                    </Transition.Child>

                    <div className='fixed inset-0 overflow-y-auto'>
                        <div className='flex min-h-full items-center justify-center p-4 text-center'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-100 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Add New Grocery Items
                                    </Dialog.Title>
                                    <form onSubmit={handleForm}>
                                        <div className="mt-2">

                                            <label htmlFor="itemName" className='block m-1'>Product Name </label>
                                            <input
                                                type="text"
                                                name="ItemName"
                                                id="itemName"
                                                className='block m-1 w-3/4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500  required'
                                                placeholder='Tomato/Soap/Rice..'
                                                onChange={e => setProductName(e.target.value)}
                                            />

                                            <label htmlFor="itemName" className='block m-1' >Product Image URL </label>
                                            <input
                                                type="URL"
                                                name="ImageURL"
                                                id="itemName"
                                                className='block m-1 w-3/4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500' required
                                                placeholder='https://....image.jpg'
                                                onChange={e => setImageURL(e.target.value)}
                                            />

                                            <label htmlFor="IsWeight" className='block m-1' >Is product is measured in weight </label>
                                            <select className="block m-1 w-3/4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" name='IsQuantityInWeight' id='IsWeight' onChange={e => setIsInWeight(e.target.value)} required >
                                                <option value="" disabled selected >Select Yes or No</option>
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                            </select>

                                            <label htmlFor="itemName" className='block m-1' >Price </label>
                                            <input type="number" name="price" id="itemName" placeholder='Enter price per Kg or per item' className='m-1 w-3/4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500' onChange={e => setProductPrice(e.target.value)} required />

                                            <label htmlFor="itemName" className='block m-1' >Product Quantity</label>
                                            <input type="number" name="quantity" id="itemName" className='block m-1 w-3/4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500' onChange={e => setQuantity(e.target.value)} required />

                                            <label htmlFor="description" className='block m-1' >Product Description </label>
                                            <textarea name="" id="description" cols="50" rows="3" className='block m-1 w-3/4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500' onChange={e => setDescription(e.target.value)} ></textarea>
                                        </div>

                                        <div className="mt-4">
                                            <input
                                                type="reset"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 m-2"
                                                onClick={closeModal}
                                                value="Cancel"
                                            />
                                            <input
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 m-2"
                                                value="Submit"
                                            />
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>

                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

const Navbar = () => {
    return (
        <>
            <nav className='bg-blue-600 px-4 py-3'>
                <div className=' hidden md:hidden lg:flex'>
                    <NavbarLg />
                </div>
            </nav>
        </>
    )
}

export default Navbar