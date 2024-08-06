import { useContext } from "react"
import { AppContext, productsType } from "../../App"
import FavoriteSVG from "../Header/svg/FavoriteSVG"

import CommonLi from "./CommonLi"

function Favorite(){

    const { products, favList } =useContext(AppContext)

    window.scrollTo(0,0)

    return (
        <section className="favoriteSection">

            <div className="titleflex">
                <FavoriteSVG fillColor={'#ffffff'}/>
                <h2>Favorite:</h2>
            </div>
            
            <hr/>

            <ul>

                {favList.length==0 && <li className='noProduct'>No items in Favorite</li>}

                {products.map((product:productsType,key:number)=>{
                    return favList.includes(product.product_id) && (
                        <CommonLi product={product} which='fav' key={key}/>
                    )
                })}
            </ul>
            
        </section>
    )
}

export default Favorite