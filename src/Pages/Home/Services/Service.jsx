import React from 'react';
import { FaArrowLeft, FaArrowRight, FaBeer } from 'react-icons/fa';


const Service = ({ service }) => {

    const { title, img, price } = service;

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={img} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>Price: ${price}</p>
                <div className="card-actions">
                    <button className='ml-auto'><FaArrowRight></FaArrowRight></button>
                </div>
            </div>
        </div>
    );
};

export default Service;