import { useContext, useEffect, useState } from 'react'
import { AppContext, productsType } from '../App'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import SearchBar from './SearchBar.tsx'
import { escapeSpecilChars } from './Functions.tsx'

function ProductList() {

    const { products, setProducts, backendURL } =useContext(AppContext)
    const [searchResult, setSearchResult]= useState<{searched:boolean,result:number}>({searched:false,result:0})

    const loc = useLocation();

    useEffect(()=>{

        setProducts([])
        
        if(location.href.includes('/search?')){
            const params=location.href.split('/search?keyword=')[1].split('&category=')
            console.log("params0",params[0])
            console.log("params1",params[1])

            axios.post(`${backendURL}/product/searchProducts`,{categoryId:params[1],keyword:escapeSpecilChars(params[0])})
            .then((res:any)=>{
                console.log("res",res)
                setProducts([...res.data])
                setSearchResult({searched:true,result:res.data.length})
            })
        }else{

            axios.post(`${backendURL}/product/searchProducts`,{categoryId:location.href.split('/category/')[1],keyword:''})
            .then((res:any)=>{
                setProducts([...res.data])
            })
            setSearchResult({searched:false,result:0})
        }

        window.scrollTo(0, 0);

    },[loc])

    return (
        <section className='productList'>

            <SearchBar/>

            {searchResult.searched && <div className='itemFound'>{`${searchResult.result} item(s) found.`}</div>}
            <ul>

                {products.map((product:productsType, key:number)=>{
                    return (
                        <li key={key}>
                        {/* <div>id:{product.product_id}</div> */}
                            <Link to={`/product/${product.product_id}`} key={key} id={`productID_${product.product_id}`}>
                                <img src={product.images[0]}/>
                                <div className='titleDiv'>{product.title}</div>
                                <div className='priceDiv'>$ {product.price.toLocaleString()}</div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default ProductList