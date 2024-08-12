import { useContext } from "react"
import { AppContext, productsType, cartType, historyType } from "../../App"
import axios from "axios"
import { Link } from "react-router-dom"

function CommonLi(props:{product: productsType|cartType|historyType, which:string}){

    const { backendURL, setFavList, setShoppingCart } =useContext(AppContext)

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

    const removeFromCart=(productId:number)=>{
        axios.post(`${backendURL}/cart/removeFromCart`,{user_id:localStorage.getItem('id'), product_id:productId})
        .then((res:any)=>{
            if(res.status==200){
                setShoppingCart((prev:Array<cartType>)=>{
                    return prev.filter((product:cartType) => product.product_id!== productId)
                })
            }
        })
    }

    return (
        <li>

            <Link className='imgA' to={`/product/${props.product.product_id}`}>
                <img src={props.product.images[0]}/>
            </Link>

            <div className='right'>

                <Link to={`/product/${props.product.product_id}`}>
                    <h3 className='productName'>{props.product.title}</h3>
                </Link>
                <div className="flex">

                    <div className='price'>
                        {props.which=='fav'?
                            <span>{`$ ${props.product.price.toLocaleString()}`}</span>
                            :
                            <>
                                {`$ ${props.product.price.toLocaleString()} x ${props.product.product_quantity!} = `}
                                <span className='sum'>{`$ ${(props.product.price*props.product.product_quantity!).toLocaleString()}`}</span>
                            </>
                        }
                    </div>

                    {props.which!=='history' &&
                        <button
                            className='redButton'
                            onClick={()=>props.which=='cart'?
                                removeFromCart(props.product.product_id)
                                :props.which=='fav' &&
                                removeFromFav(props.product.product_id)
                            }
                        >
                            Remove
                        </button>
                    }

                </div>
                
            </div>

        </li>
    )
}

export default CommonLi