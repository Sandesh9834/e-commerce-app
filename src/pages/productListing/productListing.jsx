import './productListing.css';
import { Navigation } from '../../components/Navigation'
import img1 from '../../assets/sneakers-shoes-adidas-shoes.jpg';
import img2 from '../../assets/backpack.jpg';
import img3 from '../../assets/cycles.png';

import { useEffect, useState} from 'react';

export default function ProductListingPage (){

  const[productData, setData] = useState([])
  const[productRange, setProductRange] = useState(0)
  const[addToCart, setAddToCart] = useState(true)
  const [category, setCategory] = useState("all");
  const [rating, setRating] = useState("all");

  const fetchData = async () => {
    const response = await fetch("/api/products")
    const data = await response.json()
    console.log(data)
    setData(data.products)
  }

    useEffect(() => {
      fetchData();
  }, []);

  function HandleCategories(event) {
    const category = event.target.value;
    setCategory(category);
    filterProducts(category, rating);
  }

  function HandleRatings(event) {
    const rating = event.target.value;
    setRating(!rating);
    filterProducts(category, rating);
  }

  function filterProducts(category, rating) {
    let filteredData = productData;
    if (category !== "all") {
      filteredData = filteredData.filter(
        (product) => product.categoryName === category);
    }
    if (rating !== "all") {
      filteredData = filteredData.filter(
        (product) => product.rating >= Number(rating)
      );
    }
    setData(filteredData);
  }

return (
  <>
  <Navigation />
  <div className="main-body-sec">
    <div className="filter-sidebar">
      <div className="filter-sidebar-heading">
        <p><b>Filters</b></p>
        <p>clear</p>
      </div>
      <div className="filter-price">
        <h2 className="price-heading">Rating</h2>
        <div className="range">
          <span>0</span>
          <span>5</span>
        </div>
        <input type="range" min="0" max="5" value={productRange} className="price-range" onChange={(event) => setProductRange(event.target.value)} />{productRange}
      </div>
      <div className="filter-cat">
        <p><b>Category</b></p>
        <div className="filter-item">
          <input type="checkbox" value="men" name="category" onChange = {HandleCategories} />
          Men
        </div>
        <div className="filter-item">
          <input type="checkbox" value="women" name="category" onChange = {HandleCategories} />
          Women
        </div>
        <div className="filter-item">
          <input type="checkbox" value="kids" name="category" onChange = {HandleCategories} />
          Kids
        </div>
      </div>
      {/* <div className="filter-cat">
        <span><b>Rating</b></span>
        <div className="filter-item">
          <input type="checkbox" value= "4" onClick={HandleRatings} />
          <label>4stars and above</label>
        </div>
        <div className="filter-item">
          <input type="checkbox" value= "4" onClick={HandleRatings} />
          <label>3stars and above</label>
        </div>
        <div className="filter-item">
          <input type="checkbox" value="4" onClick={HandleRatings} />
          <label>2stars and above</label>
        </div>
      </div> */}
      <div className="filter-cat">
        <span><b>Price</b></span>
        <div className="filter-item">
          <input type="radio" />
          Price - Low to High
        </div>
        <div className="filter-item">
          <input type="radio" />
          Price - High to Low
        </div>
      </div>
      </div>
      <div className="right-body-section">
        <h1 className="showing-heading">Showing all products</h1>
        <div className="product-flex">
          {productData.length > 0 && (
            <>
              {productData.map(product => (
                <div className="card-container">
                  <h4 className="card-with-badge"><i className="fas fa-heart"></i></h4>
                  <img className="card-image" src={product.image} alt="Adidas Shoe" />
                  <div className="description">
                    <p className="card-heading">{product.title}</p>
                    <p className="price">{product.price}</p>
                    <button className="add-cart-btn" onClick={() => setAddToCart(!addToCart)}>{addToCart ? "Add to Cart" : "Added to Cart"}</button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  </>
  )
}