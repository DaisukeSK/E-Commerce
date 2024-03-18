import { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { productsType, categoriesType, AppContext } from '../../App.tsx'

function Category(props:{category:categoriesType}) {

    const { backendURL, setSearchResult } = useContext(AppContext)

    const [ categorizedProducts, setcategorizedProducts ]=useState<Array<productsType>>([])

    useEffect(()=>{
        axios.post(`${backendURL}/product/searchProducts`,{categoryId:props.category.category_id,keyword:''})
        .then((res:any)=>{
        setcategorizedProducts([...res.data])
        })
    },[])

    return (
        <div className='categorizedProduct'>

            <h2>{props.category.category_name}</h2>

            <div className='flex'>

                {categorizedProducts!.map((product:productsType, key:number)=>{
                    return key<4 && (
                        <Link to={`/product/${product.product_id}`} className='imgA' key={key}>
                            <h3>{product.title}</h3>
                            <img src={product.images[0]}/>
                        </Link>
                    )
                })}

                <Link to={`/search/${props.category.category_id}`} className='seeMore' onClick={()=>setSearchResult({searched:false,result:0})}>
                    <svg width='10' height='16'>
                        <path d='m0 0 v16 l10 -8'/>
                    </svg>
                    <span>See More</span>
                </Link>

            </div>

        </div>
    )
}

export default Category