import { useContext } from "react";
import { AppContext, cartType } from "../../App";
import Cart2SVG from "../Header/svg/Cart2SVG";
import CommonLi from "./CommonLi";
import axios from "axios";

function ShoppingCart(){

    const { setShoppingCartQ, backendURL, shoppingCart, setShoppingCart }=useContext(AppContext)

    const userId=localStorage.getItem('id')

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

    let sum=0;

    return (
        <section className="cartSection">

            <div className="titleflex">
                <Cart2SVG/>
                <h2>Shopping-Cart:</h2>
            </div>

            <hr/>

            <ul>

                {shoppingCart.map((product:cartType, key:number)=>{
                    sum+=product.price*product.product_quantity
                    return <CommonLi product={product} which='cart' key={key}></CommonLi>
                })}

                {shoppingCart.length==0?
                
                    <li className='noProduct'>No items in Shopping-Cart</li>
                    :
                    <>
                        <hr/>
                        <li className='order'>
                            <div>Total:&nbsp;<span>{`$ ${sum.toLocaleString()}`}</span></div>
                            <button className='redButton' onClick={order}>Order</button>
                        </li>
                    </>
                }

            </ul>
        </section>
    )
}

export default ShoppingCart;