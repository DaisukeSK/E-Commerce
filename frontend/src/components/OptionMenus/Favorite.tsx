import { useContext, useEffect } from "react"
import { AppContext, productsType } from "../../App"
import axios from "axios"
import FavoriteSVG from "../Header/svg/FavoriteSVG"

import CommonLi from "./CommonLi"

function Favorite(){

    const { products, backendURL, favList, setFavList } =useContext(AppContext)

    useEffect(()=>{
        axios.post(`${backendURL}/favorite/getFavorite`,{userId:localStorage.getItem('id')})
        .then((res:any)=>{
            let favListArray:Array<number>=[]
            res.data.map((data:{favorite_id:number,user_id:number,product_id:number})=>{
                favListArray.push(data.product_id)
            })
            setFavList([...favListArray])
        })

        window.scrollTo(0,0)
    },[])

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
                    return (
                        favList.includes(product.product_id) &&
                        <CommonLi product={product} which='fav' key={key}></CommonLi>
                    )
                })}
            </ul>
        </section>
    )
}

export default Favorite