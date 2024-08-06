import { useContext, useEffect, useState } from 'react'
import { AppContext, categoriesType, productsType } from '../App'
import { Link, useLocation } from 'react-router-dom'
import SearchBar from './SearchBar.tsx'

function ProductList() {

    const { products, categories } =useContext(AppContext)
    const [ category, setCategory ] =useState<number>(-1)
    const [ searchResult, setSearchResult ] =useState<Array<number>>([])

    const loc = useLocation();
    
    useEffect(()=>{

        setCategory(-1)
        setSearchResult([])

        const allCategories:Array<number>=categories.map((category:categoriesType)=>category.category_id)

        if(loc.pathname.split('/')[1]=='search'){
            
            const params:Array<string>=loc.search.split('?keyword=')[1].split('&category=')
            const keyword:string=params[0].toUpperCase()
            const categoryArray:Array<number>=params[1]=='all'?allCategories:[+params[1]]
            const resultArray:Array<number>=[]

            products.map((product:productsType)=>{

                (categoryArray.includes(product.category_id) &&
                    (product.title.toUpperCase().includes(keyword) || product.description.toUpperCase().includes(keyword))
                ) && resultArray.push(product.product_id)

            })

            setSearchResult([...resultArray,-1])

        }else{
            setCategory(+loc.pathname.split('/category/')[1])
        }

        window.scrollTo(0, 0);

    },[loc])

    return (
        <section className='productList'>

            <SearchBar/>

            {searchResult.length>0 && <div className='itemFound'>{`${searchResult.length-1} item(s) found.`}</div>}
            <ul>

                {products.map((product:productsType, key:number)=>{
                    return (product.category_id==category || searchResult.includes(product.product_id)) && (
                        <li key={key}>
                        {/* <div>id:{product.product_id}</div> */}
                            <Link to={`/product/${product.product_id}`} key={key}>
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