import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import {useInput} from './customHook'

const App = () => {

  const [product, setProduct] = useState([])

  const [state, setState] = useState({
    "title":"",
    "price":"",
    "image":null,
    "category":0
  })

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/api/product"
    }).then(response => {
      setProduct(response.data)
    })

  }, [])

  return (
    <div>
        <div className="rightble">
            <h1>Fetch API {state.title} {state.price}</h1>
            <ul>
                {product.map((product) => (
                  <li key={product.id}> {product.title}</li>
                ))}
            </ul>
        </div>
        <form className="centerable">
            <h1>Create Product</h1>
            <label>
                Title:<br />
                <input
                className="marginable"
                type="text"
                name="title"
                value={state.title}
                onChange={handleChange}
                placeholder="title" /><br />
            </label>
            <label>
                Price:<br />
                <input
                className="marginable"
                type="number"
                name="price"
                value={state.price}
                onChange={handleChange}
                placeholder="price" /><br />
            </label>

            <br />
            <button type="submit">Create</button>
        </form>
    </div>
  );

}

export default App;
