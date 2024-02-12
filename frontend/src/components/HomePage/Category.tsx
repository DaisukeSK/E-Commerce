import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { productsType, categoriesType } from '../../App.tsx'

function Category(props:{category:categoriesType}) {

  const [categorizedProducts, setcategorizedProducts]=useState<Array<productsType>>([])

  useEffect(()=>{
    axios.post('http://localhost:8080/product/searchProducts',{categoryId:props.category.category_id,keyword:''})
    .then((res:any)=>{
      setcategorizedProducts([...res.data])
    })
  },[])

  return (
    <div className='categorizedProduct'>

      {/* <div className='categoryFlex'>
      </div> */}

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

        

        <Link to={`/search/${props.category.category_id}`} className='seeMore'>
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