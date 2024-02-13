import { useContext, useEffect } from 'react'
import { AppContext, productsType } from '../App'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SearchBar from './SearchBar.tsx'

function ProductList() {

  const { products, setProducts, backendURL } =useContext(AppContext)

  useEffect(()=>{

    location.href.split('/search/')[1] &&
    axios.post(`${backendURL}/product/searchProducts`,{categoryId:location.href.split('/search/')[1],keyword:''})
      .then((res:any)=>{
        setProducts([...res.data])
      })
  },[])

  return (
    <>
      <SearchBar/>
      <div className='productList'>

        {products.map((product:productsType, key:number)=>{
          return (
            <Link to={`/product/${product.product_id}`} className='productDiv' key={key} id={`productID_${product.product_id}`}>
              {/* <div>{product.product_id}, {product.category_name}</div> */}
              <img src={product.images[0]}/>
              <div className='titleDiv'>{product.title}</div>
              <div className='priceDiv'>$ {product.price.toLocaleString()}</div>
            </Link>
          )
        })}

      </div>
    </>
  )
}

export default ProductList