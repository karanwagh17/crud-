import React, { useEffect, useState } from 'react';
import '../app.css';
import DisplayProduct from './DisplayProduct';

const Product = () => {
  const [data, setdata] = useState([]);
  const [update, setupdate] = useState({ id: " ", price: "" });


  function fetchData() {
    fetch("http://localhost:3000/pitches")
      .then((res) => res.json())
      .then((data) => setdata(data))
      .catch((err) => console.log(err));
  }


  const DeleteData = (id) => {
    fetch(`http://localhost:3000/pitches/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Delete success");
        
      })
      .catch((err) => alert("Delete failed"));
  };

  fetchData();
  const updateData = (id, price) => {
    setupdate({ id, price });
  };

  const HandleUpdate = () => {
 {
      fetch(`http://localhost:3000/pitches/${update.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: update.price }),
      })
        .then((res) => res.json())
        .then(() => {
          alert("Update success");
          fetchData();
          setupdate({ id: " ", price: "" }); 
        })
        .catch((err) => alert("Update failed"));
    }
  };

 
  useEffect(() => {
    fetchData();
  }, [Product]);

  return (
    <div>
      <>
      <DisplayProduct/>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            HandleUpdate();
          }}
        >
          <input
            type="text"
            placeholder="Enter new price"
            value={update.price}
            onChange={(e) =>
              setupdate({...update, price: e.target.value })
            }
          />
          <button type="submit">Update Price</button>
        </form>
      </>

      <h1>Product</h1>
      <div className="mainsection">
        {data.map((el) => (
          <div key={el.id}>
                <div>{el.id}</div>
            <img src={el.image} alt="" />
                 <h2>{el.title}</h2>
            <h2>{el.price}</h2>
            <button onClick={() => DeleteData(el.id)}>Delete</button>
            <button onClick={() => updateData(el.id, el.price)}>
              Update Price
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;