import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import GetItem from './getInMap';

const error_message = "Backend site is not working ! \nPlease code: \"python manage.py runserver\" in Django \nXML request is not defined !"

const App = () => {

  const [product, setProduct] = useState([])
  const [category, setCategory] = useState([])

  const [error, setError] = useState({
    "is_valid":true,
  })

  const [state, setState] = useState({
    "title":"",
    "price":"",
    "image":null,
    "category":1,
  })

  const axiosRefresh = () => {
    // fetch all categories from backend
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/api/category/"
    }).then(response => {
      setCategory(response.data)
    }).catch(error => {
      alert(error_message)
    })

    // fetch all products from backend
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/api/product/"
    }).then(response => {
      setProduct(response.data)
    }).catch(error => {
      console.log(error_message)
    })
  }

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const notValid = (bool) => {
    if (bool)
        setError({is_valid: false})
    else
        setError({is_valid: true})
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const url = "http://127.0.0.1:8000/api/product/"
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type":"application/json",
      },
      body: JSON.stringify(state)
    }).then((response) => {
      axiosRefresh();
      setState({
        "title":"",
        "price":"",
        "image":null,
        "category":1,
      })
      response.status === 400 ? notValid(true) : notValid(false)
    }).catch(error => {
      console.log("Bad Request")
      console.log(error)
    })
  }

  useEffect(() => {
    axiosRefresh();
  }, [])

  const validClass = error.is_valid ? "marginable" : "marginable in-valid"

  const category_id = state.category ? parseInt(state.category) : 1
  const selectedCategory = category.filter(i => i.id === category_id )[0];

  return (
    <div className="wrapper">
        <h1 className="centerable marginable">
            Title: {state.title ? state.title : " - "}<br /><br />
            Price: {state.price ? state.price : " - "}<br /><br />
            Category: {selectedCategory ? selectedCategory.title : state.category[0]}<br /><br />
            Is Valid ? : {error.is_valid ? "valid" : "invalid"}
        </h1>

        <div className="leftable">
            <br />
            <h2>Categories</h2>
            <ul>
                {category.map((category) => (
                  <li key={category.id}> {category.title}</li>
                ))}
            </ul>
        </div>

        <form className="centerable" onSubmit={handleFormSubmit}>
            <h1>Create Product</h1>

            <label>
                Title:<br />
                <input
                className={validClass}
                type="text"
                name="title"
                value={state.title}
                onChange={handleChange}
                placeholder="title" /><br />
            </label>

            <label>
                Price:<br />
                <input
                className={validClass}
                type="number"
                name="price"
                value={state.price}
                onChange={handleChange}
                placeholder="price" /><br />
            </label>

            <label>
                Category:<br />
                <select
                  className={validClass}
                  value={state.category}
                  onChange={handleChange}
                  name="category"
                >
                    {category.map((category) => (
                      <option value={category.id} key={category.id}>{category.title}</option>
                    ))}
                </select>
            </label>

            <br />
            <button className="marginable" type="submit">Create</button>
        </form>

        <div className="rightable">
            <h2>Products</h2>
            <ul>
                {product.map((product) => (
                  <li key={product.id}> ${product.price} - {product.title} - {<GetItem array={category} id={product.category} />}</li>
                ))}
            </ul>
        </div>

    </div>
  );

}

export default App;
