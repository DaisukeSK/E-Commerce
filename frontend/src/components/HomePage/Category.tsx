import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { productsType, categoriesType, AppContext } from '../../App.tsx'
import { SeeMore } from '../StyledComponents.tsx'

function Category(props:{category:categoriesType}) {

    const { products } = useContext(AppContext)

    const link: JSX.Element=
        <Link to={`/category/${props.category.category_id}`}>
            <svg width='10' height='16'>
                <path d='m0 0 v16 l10 -8'/>
            </svg>
            <span>See More</span>
        </Link>

    return (
        <div className='categorizedProduct'>

            <div className='headerFlex'>

                <h1>{props.category.category_name}</h1>
                <SeeMore formobile={false}>{link}</SeeMore>

            </div>


            <div className='productFlex'>

                {products.map((product:productsType, key:number)=>{
                    return props.category.category_id==product.category_id && (
                        <Link to={`/product/${product.product_id}`} className='imgA' key={key}>
                            <h3>{product.title}</h3>
                            <img src={product.images[0]}/>
                        </Link>
                    )
                })}

            </div>

            <SeeMore formobile={true}>{link}</SeeMore>

            <hr/>

        </div>
    )
}

export default Category