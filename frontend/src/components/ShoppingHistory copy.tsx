import { useState, useEffect, Fragment, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import HistorySVG from "./Header/svg/HistorySVG";

type historyType={
    category_id:number,
    description:string,
    history_id:number,
    images:Array<string>,
    price:number,
    product_id:number,
    product_quantity:number,
    shopping_date:string,
    title:string,
    user_id:number
}

function ShoppingHistory(){

    const { backendURL } = useContext(AppContext)

    const [history, setHistory]=useState<Array<historyType>>([])

    useEffect(()=>{
        axios.post(`${backendURL}/history/get`,{user_id:localStorage.getItem('id')})
        .then((res:any)=>{
            console.log("history data:",res.data)
            setHistory([...res.data])
            console.log(res.data)
        })
    },[])

    let sum=0

    return (
        <main className='historyMain'>
            <div className="titleflex">

                <HistorySVG></HistorySVG>
                <h2>Shopping-History:</h2>
            </div>
            <hr/>

            <ul className='greyUl'>

            {history.length==0 &&
                    <li className='noProduct'>No items in History</li>
                }


                {history.map((product:historyType,key:number)=>{

                    const date= new Date(Date.parse(product.shopping_date))
                    // console.log("date", );
                    

                    key>0 && product.shopping_date!==history[key-1].shopping_date?
                    sum=product.product_quantity*product.price:
                    sum+=product.product_quantity*product.price

                    return (
                        <Fragment key={key}>

                            {(key==0 || (product.shopping_date!==history[key-1].shopping_date)) &&
                                <h2>{date.toLocaleString('default', { month: 'short' })}&nbsp;{date.getDate()},&nbsp;{date.getFullYear()}&nbsp;{date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</h2>
                                // <h2>{date.toLocaleTimeString()}{date.toLocaleDateString()}</h2>
                            }
                            <li>
                                <Link className='imgA' to={`/product/${product.product_id}`}>
                                    <img src={product.images[0]}/>
                                </Link>
                                <div className='flexRight'>

                                    <Link to={`/product/${product.product_id}`}>
                                        <h3 className='productName'>{`${product.title}`}</h3>
                                    </Link>
                                    <div>{`$ ${product.price.toLocaleString()} x ${product.product_quantity} = `}<span>{`$ ${(product.product_quantity*product.price).toLocaleString()}`}</span></div>
                                        
                                </div>
                            </li>

                            {product.shopping_date!==history[key+1]?.shopping_date &&
                                <h2 className='total'>Total:&nbsp;<span>{`$ ${sum.toLocaleString()}`}</span></h2>
                            }
                            

                        </Fragment>
                    )
                })}
            </ul>
        </main>
    )
}

export default ShoppingHistory;