import React from 'react'
import { useState } from 'react';

const DisplayProduct = () => {
  const initialstate = {
    image: "",
    title : "",
    price : "",
    description : "",
    category : "",

  };
  const [product, setProduct] = useState(initialstate);
  // console.log(product)
  const Handlesubmit = (e)=>
  {
    
    e.preventDefault();
    fetch("http://localhost:3000/pitches",{
      method: "POST",

      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify(product),



    })
    .then(response => response.json())
    .then(data => {console.log(data)
      setProduct(initialstate);
    }
  )

    .catch(err=>console.log(err))
    
 
  }
  const HandeleChange = (e) =>
  {
    setProduct({ ...product, [e.target.name]: e.target.value });

  }

  return (
    <div>
      <h1>
        DisplayProduct
      </h1>
      <form onSubmit={(e)=>Handlesubmit(e)}>
    <input type='text' placeholder='Image' name='image' value={product.image}  onChange={(e)=>HandeleChange(e)}/><br />
    <input type='text' placeholder='title' name='title' value={product.title} onChange={(e)=>HandeleChange(e)}/><br />
    
    <select name='category' value={product.category} onChange={(e)=>HandeleChange(e)} >
    <option value="">Select Category</option>
    <option value="">Men's Clothing</option>
    <option value="">Jwellery</option>
    <option value="">Electronics</option>
    <option value="">Women's clothing</option>
    </select>
    
    <input type='text' placeholder='price' name='price' value={product.price} onChange={(e)=>HandeleChange(e)}/> <br />
    <input type='text' placeholder='description' name='description' value={product.description} onChange={(e)=>HandeleChange(e)}/><br />
    <input type='submit'/> <br />
    </form>
    </div>
  )
}

export default DisplayProduct


