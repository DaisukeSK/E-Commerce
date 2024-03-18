import { useContext, useEffect } from 'react'
import { AppContext, productsType } from '../App'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SearchBar from './SearchBar.tsx'

function ProductList() {

    const { products, setProducts, backendURL, searchResult } =useContext(AppContext)

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
            
            <div className='itemFound'>{searchResult.searched && `${searchResult.result} item(s) found.`}</div>
            <hr/>
            <ul className='productList'>

                {products.map((product:productsType, key:number)=>{
                    return (
                        <li className='productLi'>
                            <Link to={`/product/${product.product_id}`} key={key} id={`productID_${product.product_id}`}>
                                <img src={product.images[0]}/>
                                <div className='titleDiv'>{product.title}</div>
                                <div className='priceDiv'>$ {product.price.toLocaleString()}</div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default ProductList