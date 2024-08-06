import { useState, useEffect, useRef, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext, productsType } from '../App';
import FavoriteSVG from './Header/svg/FavoriteSVG';
import TruckSVG from './Header/svg/TruckSVG';
import axios from 'axios'

function Product(props:{product:productsType}){

    const { setShoppingCartQ, backendURL, favList, setFavList }=useContext(AppContext)
    const [ favorite, setFavorite ]=useState<boolean>(false)
    const [ currentImg, setCurrentImg ]=useState<string>(props.product.images[0])
    const [ estimatedDate, setEstimatedDate ]=useState('')
    const navigate = useNavigate();

    const quantity: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
    const productId: number = props.product.product_id
    const userId: number = +localStorage.getItem("id")!

    const addToFavorite=():void=>{

        if(userId){

            if(!favorite){
                axios.post(`${backendURL}/favorite/addToFavorite`,{user_id:userId,product_id:productId})
                .then((res)=>{
                    if(res.status==200){
                        setFavorite(true)
                        setFavList([...favList, productId])
                    }
                })
            }else{
                axios.post(`${backendURL}/favorite/removeFromFavorite`,{user_id:userId,product_id:productId})
                .then((res)=>{
                    if(res.status==200){
                        setFavorite(false)
                        setFavList((prev:Array<number>) => {
                            return prev.filter((fav:number) => fav !== productId)
                        })
                    }
                })
            }
            
        }else{
            navigate('/signIn')
        }
    }

    const addToCart=():void=>{
        if(userId){

            axios.post(`${backendURL}/cart/addToCart`,{user_id:userId,product_id:productId, quantity:quantity.current!.value})
            .then((res)=>{
                if(res.status==200){
                    setShoppingCartQ((prev:number)=>+quantity.current!.value+prev)
                    alert('Product added to cart')
                }
            })

        }else{
            navigate('/signIn')
        }
    }

    useEffect(()=>{

        const rand1: number = Math.ceil(1+Math.random()*7)
        const rand2: number = rand1+Math.ceil(1+Math.random()*2)

        const date1: Date = new Date(Date.now() + ( 3600 * 1000 * 24*rand1))
        const date2: Date = new Date(Date.now() + ( 3600 * 1000 * 24*rand2))
        
        switch(true){
            case date1.getFullYear()!==date2.getFullYear():
                setEstimatedDate(`${date1.toLocaleString('default', { month: 'short' })} ${date1.getDate()}, ${date1.getFullYear()} - ${date2.toLocaleString('default', { month: 'short' })} ${date2.getDate()}, ${date2.getFullYear()}`)
                break;
            case date1.getMonth()!==date2.getMonth():
                setEstimatedDate(`${date1.toLocaleString('default', { month: 'short' })} ${date1.getDate()} - ${date2.toLocaleString('default', { month: 'short' })} ${date2.getDate()}, ${date2.getFullYear()}`)
                break;
            default :
                setEstimatedDate(`${date1.toLocaleString('default', { month: 'short' })} ${date1.getDate()} - ${date2.getDate()}, ${date2.getFullYear()}`)
        }

        (userId && favList.includes(productId)) && (setFavorite(true))

    },[])

    return(
        <section className='productDetail'>

            <div className='left'>

                <Link to={currentImg}>
                    <img src={currentImg}/>
                </Link>

                {props.product.images.length>1 &&

                    <>
                        <hr/>
                    
                        <div className='imgDiv'>

                            {props.product.images.map((img:string,key:number)=>{
                                return  <img src={img} key={key} style={{outline:currentImg==img?'5px solid cadetblue':'none'}} onClick={()=>setCurrentImg(img)}/>
                            })}

                        </div>
                    </>
                
                }

            </div>

            <div className='right'>

                <div className='favDiv' onClick={addToFavorite}>
                    <FavoriteSVG fillColor={favorite?'rgb(255, 120, 255)':'#aaaaaa'}/>
                </div>

                <h2>{props.product.title}</h2>
                
                <div className='addToCartDiv'>
                    <div className='priceDiv'><b>{`$ ${props.product.price.toLocaleString()}`}</b></div>
                    <div className='x'>x</div>
                    <input type='number' min='1' defaultValue='1' ref={quantity}/>
                    <button className='redButton' onClick={addToCart}>Add to Cart</button>

                </div>

                <div className='estimatedDeriverly'>
                    <div className='truck'>
                        <TruckSVG/><div>Estimated Deriverly</div>
                    </div>

                    <div className='dates'>{estimatedDate}</div>

                </div>
                <hr/>
                <p>{props.product.description}</p>

            </div>
                    
        </section>
    )
}

export default Product;