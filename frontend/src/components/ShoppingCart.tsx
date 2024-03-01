import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AppContext, cartType } from "../App";
import Cart2SVG from "./Header/svg/Cart2SVG";

function ShoppingCart(){

    const { setShoppingCartQ, backendURL }=useContext(AppContext)

    const [shoppingCart,setShoppingCart]=useState<Array<cartType>>([])

    const userId=localStorage.getItem('id')

    const removeFromCart=(productId:number,quantity:number)=>{
        axios.post(`${backendURL}/cart/removeFromCart`,{user_id:userId, product_id:productId})
        .then((res:any)=>{

            if(res.status==200){
                setShoppingCart((prev:Array<cartType>)=>{
                    return prev.filter((product:cartType) => product.product_id!== productId)
                })
                setShoppingCartQ((prev:number)=> prev-quantity)
            }
        })
    }

    const order=()=>{

        axios.post(`${backendURL}/history/add`,{state:shoppingCart})
        .then((res:any)=>{
            
            if(res.status==200){

                axios.post(`${backendURL}/cart/order`,{user_id:userId})
                .then((res:any)=>{
                    
                    if(res.status==200){
                        setShoppingCart([])
                        setShoppingCartQ(0)
                        alert('Order confirmed.')
                    }
                })
            }
        })
    }

    useEffect(()=>{
        axios.post(`${backendURL}/cart/getCart`,{user_id:userId})
        .then((res:any)=>{
            setShoppingCart([...res.data])
        })
    },[])

    let sum=0;

    return (
        <main className="cartMain">
            <div className="titleflex">

                <Cart2SVG></Cart2SVG>
                <h2>Shopping-Cart:</h2>
            </div>
            <hr/>

            <ul className='greyUl'>

                {shoppingCart.map((product:cartType, key:number)=>{
                    sum+=product.price*product.product_quantity
                    return (

                        <li key={key}>

                            <Link className='imgDiv' to={`/product/${product.product_id}`}>

                                <img src={product.images[0]}/>

                            </Link>

                            <div className='flexRight'>

                                <Link to={`/product/${product.product_id}`}>

                                    <h3 className='productName'>{product.title}</h3>
                                </Link>
                                
                                <div className='productDetail'>
                                    {`$ ${product.price.toLocaleString()} x ${product.product_quantity} = `}
                                    
                                    <span className='sum'>{`$ ${(product.price*product.product_quantity).toLocaleString()}`}</span>
                                </div>
                                <button className='redButton' onClick={()=>removeFromCart(product.product_id,product.product_quantity)}>Remove</button>

                            </div>

                        </li>
                    )
                })}

                
                {shoppingCart.length==0 && <li className='noProduct'>No items in Shopping-Cart</li>}
                {shoppingCart.length>=1 &&

                <>
                
                    <hr/>
                    <li className='order'>
                        <div>Total:&nbsp;<span>{`$ ${sum.toLocaleString()}`}</span></div>
                        <button className='redButton' onClick={order}>Order</button>
                    </li>
                </>
                }

            </ul>

        </main>
    )
}

export default ShoppingCart;