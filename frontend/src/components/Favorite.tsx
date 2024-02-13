import { useContext,useState, useEffect } from "react"
import { AppContext, productsType } from "../App"
import axios from "axios"
import { Link } from "react-router-dom"

// const FavContext=createContext(null)

function Favorite(){

    const {products,backendURL} =useContext(AppContext)
    const [favList, setFavList]=useState<Array<number>>([])

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
    },[])

    return (
        <main className="favoriteMain">
            <h2>Your favorite list:</h2>

            <ul className='greyUl'>


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
                                {/* <div className='favLiRightFlex'> */}
                                <div className='productDetail'><span>{`$ ${product.price.toLocaleString()}`}</span></div>
                                <button className='redButton' onClick={()=>removeFromFav(product.product_id)}>Remove</button>

                                {/* </div> */}
                            </div>

                        </li>
                    )
                })}
            </ul>
        </main>
    )
}

export default Favorite