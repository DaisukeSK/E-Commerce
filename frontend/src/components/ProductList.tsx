import { useContext, useEffect, useState } from 'react'
import { AppContext, productsType } from '../App'
import { Link, useLocation } from 'react-router-dom'
import SearchBar from './SearchBar.tsx'

function ProductList() {

    const { products } =useContext(AppContext)
    const [category, setCategory] =useState<number|null>(null)
    const [hitProducts, setHitProducts] =useState<Array<number>>([])

    const loc = useLocation();

    useEffect(()=>{

        setCategory(null)
        setHitProducts([])
        
        if(location.href.includes('/search?')){
            const params=location.href.split('/search?keyword=')[1].split('&category=')

            const keyeword:string=params[0].toUpperCase()
            const categoryArray:Array<number>=params[1]=='all'?[1,2,3,4,5,6,7,8,9,10]:[+params[1]]

            const resultArray:Array<number>=[]

            products.map((product:productsType)=>{

                if(
                    categoryArray.includes(product.category_id)
                    &&
                    (
                        product.title.toUpperCase().includes(keyeword) ||
                        product.description.toUpperCase().includes(keyeword)
                    )
                ){ resultArray.push(product.product_id) }

            })

            setHitProducts([...resultArray])

        }else{

            setCategory(+location.href.split('/category/')[1])
        }

        window.scrollTo(0, 0);

    },[loc])

    return (
        <section className='productList'>

            <SearchBar/>

            {!category && <div className='itemFound'>{`${hitProducts.length} item(s) found.`}</div>}
            <ul>

                {products.map((product:productsType, key:number)=>{
                    return (product.category_id==category || hitProducts.includes(product.product_id)) && (
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