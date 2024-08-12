import { useState, useEffect, Fragment, useContext } from "react";
import axios from "axios";
import { AppContext, historyType } from "../../App";
import CommonLi from "./CommonLi";
import HistorySVG from "../Header/svg/HistorySVG";

function ShoppingHistory(){

    const { backendURL } = useContext(AppContext)
    const [ history, setHistory ]=useState<Array<historyType>>([])

    useEffect(()=>{
        axios.post(`${backendURL}/history/get`,{user_id:localStorage.getItem('id')})
        .then((res:any)=>{
            setHistory([...res.data])
        })
    },[])

    let sum=0

    return (
        <section className='historySection'>

            <div className="titleflex">
                <HistorySVG/>
                <h2>Shopping-History</h2>
            </div>

            <hr/>

            <ul>

                {history.length==0 && <li className='noProduct'>No items in History</li>}

                {history.map((product:historyType,key:number)=>{

                    const date= new Date(Date.parse(product.shopping_date))

                    key>0 && product.shopping_date!==history[key-1].shopping_date?
                    sum=product.product_quantity*product.price:
                    sum+=product.product_quantity*product.price

                    return (
                        <Fragment key={key}>

                            {(key==0 || (product.shopping_date!==history[key-1].shopping_date)) &&
                                <h3 className="purchaseDate">
                                    {date.toLocaleString('default', { month: 'short' })}&nbsp;
                                    {date.getDate()},&nbsp;
                                    {date.getFullYear()}&nbsp;&nbsp;
                                    {date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                                </h3>
                            }

                            <CommonLi product={product} which='history'></CommonLi>

                            {product.shopping_date!==history[key+1]?.shopping_date &&
                                <>
                                    <hr/>
                                    <h3 className='total'>
                                        Total:&nbsp;<span>{`$ ${sum.toLocaleString()}`}</span>
                                    </h3>
                                </>
                            }                            
                        </Fragment>
                    )
                })}
            </ul>
        </section>
    )
}

export default ShoppingHistory;