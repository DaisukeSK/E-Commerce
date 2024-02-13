import { useState, useEffect, useRef, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppContext, productsType } from '../App';
import FavoriteSVG from './Header/svg/FavoriteSVG';
import TruckSVG from './Header/svg/TruckSVG';

function Product(props:{product:productsType}){

    const {setShoppingCartQ, backendURL, favList, setFavList}=useContext(AppContext)
    const navigate = useNavigate();
    const [favorite, setFavorite]=useState<boolean>(false)
    const [currentImg, setCurrentImg]=useState<string>(props.product.images[0])
    const quantity=useRef<HTMLInputElement>(null)
    const productId:number=props.product.product_id
    const userId:number=+localStorage.getItem("id")!

    const addToFavorite=():void=>{

        if(userId){

            if(!favorite){

                axios.post(`${backendURL}/favorite/addToFavorite`,{user_id:userId,product_id:productId})
                .then((res)=>{
                    // res.status==200 && (setFavorite(true))
                    if(res.status==200){
                        setFavorite(true)
                        setFavList([...favList, productId])
                    }
                })

            }else{

                axios.post(`${backendURL}/favorite/removeFromFavorite`,{user_id:userId,product_id:productId})
                .then((res)=>{
                    res.status==200 && (setFavorite(false))
                    if(res.status==200){
                        setFavorite(false)
                        setFavList((prev:Array<number>) => {
                            return prev.filter((fav:number) => fav !== productId)
                        })
                    }
                })
            }
            
        }else{
            navigate('/signin')
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
            navigate('/signin')
        }
    }

    useEffect(()=>{

        if(userId){
            axios.post(`${backendURL}/favorite/checkFavorite`,{user_id:userId,product_id:productId})
            .then((res)=>{
                res.data=='exist' && (setFavorite(true))
            })
        }
        window.scrollTo(0, 0);
    },[])
    // date.toLocaleString('default', { month: 'long' });
    const dates=():string=>{
        const rand1=Math.ceil(1+Math.random()*7)
        const rand2=rand1+Math.ceil(1+Math.random()*2)
        const getDate=new Date();
        // const date1:string=`${getDate.toLocaleString('default', { month: 'short' })} ${getDate.getDate()+rand1} - ${getDate.getDate()+rand2}, ${getDate.getFullYear()}`
        // const date2:string=`${getDate.toLocaleString('default', { month: 'short' })} ${getDate.getDate()+rand2}, ${getDate.getFullYear()}`
        return `${getDate.toLocaleString('default', { month: 'short' })} ${getDate.getDate()+rand1} - ${getDate.getDate()+rand2}, ${getDate.getFullYear()}`
    }

    return(
        <main className='productDetailPage'>

            <div className='productDetailFlex'>

                <div className='productImgDiv'>

                    <Link to={currentImg}>
                        <img src={currentImg}/>
                    </Link>

                    {props.product.images.length>1 &&
                    
                        <div className='imgDiv'>

                            {props.product.images.map((img:string,key:number)=>{
                                return  <img src={img} key={key} style={{outline:currentImg==img?'5px solid cadetblue':'none'}} onClick={()=>setCurrentImg(img)}/>
                            })}

                        </div>
                    }

                </div>

                <div className='productDetail'>
                    <div className='favDiv' onClick={addToFavorite}>
                        <FavoriteSVG fillColor={favorite?'rgb(255, 120, 255)':'#aaaaaa'}/>
                    </div>


                    <h2>{props.product.title}</h2>
                    {/* <div style={{backgroundColor:favorite?'pink':'#aaaaaa'}} onClick={addToFavorite}>Add to Favorite</div> */}
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

                        <div className='dates'>{dates()}</div>

                        

                    </div>

                    <div className='hr'></div>
                    <p>{props.product.description}</p>

                </div>
                    
            </div>
        </main>
    )
}

export default Product;