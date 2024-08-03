import { useContext, useEffect } from "react"
import { AppContext, productsType } from "../App"
import axios from "axios"
import { Link } from "react-router-dom"
import FavoriteSVG from "./Header/svg/FavoriteSVG"

function Favorite(){

    const { products, backendURL, favList, setFavList } =useContext(AppContext)

    const removeFromFav=(id:number):void=>{

        axios.post(`${backendURL}/favorite/removeFromFavorite`,{user_id:localStorage.getItem('id'),product_id:id})
            .then((res)=>{
                res.status==200 && (
                    setFavList((prev:Array<number>) => {
                        return prev.filter((fav:number) => fav !== id)
                    })
                )
        })
    }

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

            <ul className='greyUl'>

                {favList.length==0 && <li className='noProduct'>No items in Favorite</li>}

                {products.map((product:productsType,key:number)=>{
                    return (
                        favList.includes(product.product_id) &&
                        <li key={key}>
                            
                            <Link className='imgDiv' to={`/product/${product.product_id}`}>
                                <img src={product.images[0]}/>
                            </Link>

                            <div className='flexRight'>
                                <Link to={`/product/${product.product_id}`} key={key}>
                                    <h3 className='productName'>{product.title}</h3>
                                </Link>
                                <div className='productDetail'><span>{`$ ${product.price.toLocaleString()}`}</span></div>
                                <button className='redButton' onClick={()=>removeFromFav(product.product_id)}>Remove</button>
                            </div>

                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default Favorite