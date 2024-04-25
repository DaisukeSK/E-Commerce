import { useState, useEffect, createContext } from 'react'
import axios from 'axios';
import ProductList from './components/ProductList'
import SignIn from './components/SignIn'
import ShoppingCart from './components/ShoppingCart'
import ShoppingHistory from './components/ShoppingHistory'
import Setting from './components/Setting'
import Header from './components/Header/Header'
import Product from './components/Product'
import Favorite from './components/Favorite'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage/Homepage.tsx'

const backendURL:string='https://e-commerce-q1y2.onrender.com'
// const backendURL:string='http://localhost:8080'

export type productsType={
    category_id:number,
    category_name:string,
    description:string,
    images:Array<string>,
    price:number,
    product_id:number,
    title:string
}

export type categoriesType={
    category_id:number,
    category_name:string
}

export type cartType={
    category_id:number,
    description:string,
    images:Array<string>,
    price:number,
    product_id:number,
    title:string,
    product_quantity:number,
    shopping_cart_id:number,
    user_id:number
}

export type AppContextType={
    backendURL:string,
    products:Array<productsType>,
    setProducts: React.Dispatch<React.SetStateAction<productsType[]>>,
    categories:Array<categoriesType>,
    shoppingCartQ:number,
    setShoppingCartQ: React.Dispatch<React.SetStateAction<number>>,
    favList:Array<number>,
    setFavList: React.Dispatch<React.SetStateAction<number[]>>,
    setLoaded: React.Dispatch<React.SetStateAction<boolean>>,
    loaded:boolean,
    setSearchResult: React.Dispatch<React.SetStateAction<{
        searched: boolean;
        result: number;
    }>>,
    searchResult:{
        searched: boolean;
        result: number;
    }
}

export const AppContext=createContext<AppContextType>({} as AppContextType)

export const getShoppingCart=(id:number, setter:(q:number)=>void):void=>{
    axios.post(`${backendURL}/cart/getCart`,{user_id:id})
    .then((res:any)=>{
        let num:number=0
        res.data.map((q:cartType)=>{
        num+=q.product_quantity
        })
        setter(num)
    })
}

export function App() {

    const [products, setProducts] = useState<Array<productsType>>([])
    const [categories, setCategories] = useState<Array<categoriesType>>([])
    const [shoppingCartQ, setShoppingCartQ] = useState<number>(0)
    const [favList, setFavList]=useState<Array<number>>([])
    const [loaded, setLoaded]= useState<boolean>(false)
    const [searchResult, setSearchResult]= useState<{searched:boolean,result:number}>({searched:false,result:0})
    
    useEffect(()=>{

        axios.all([
            axios.get(`${backendURL}/product/getAllProducts`),
            axios.get(`${backendURL}/product/getAllCategories`)
        ])
        .then(axios.spread((obj1,obj2)=>{
            setProducts([...obj1.data])
            setCategories([...obj2.data])
            setLoaded(true)
        }))

        localStorage.getItem('id') &&
        axios.post(`${backendURL}/favorite/getFavorite`,{userId:localStorage.getItem('id')})
            .then((res:any)=>{
                let favListArray:Array<number>=[]
                res.data.map((data:{favorite_id:number,user_id:number,product_id:number})=>{
                    favListArray.push(data.product_id)
                })
                setFavList([...favListArray])
            })
        getShoppingCart(+localStorage.getItem('id')!,setShoppingCartQ)
    },[])

    return (
        <AppContext.Provider value={{favList,setFavList,backendURL,products,setProducts,categories,shoppingCartQ, setShoppingCartQ,setLoaded,loaded,setSearchResult,searchResult}}>
        <BrowserRouter>
            <Header/>
            <div className='loading' style={{display:loaded?'none':'block'}}>
                <div className='spin'></div>
                <div className='message'>Loading...<br/>It may take some time.</div>
            </div>
            <Routes>
                <Route path={'/'} element={<HomePage></HomePage>}></Route>
                <Route path={'/search/:category?'} element={<ProductList></ProductList>}></Route>
                <Route path={'/cart'} element={<ShoppingCart></ShoppingCart>}></Route>
                <Route path={'/history'} element={<ShoppingHistory></ShoppingHistory>}></Route>
                <Route path={'/favorite'} element={<Favorite></Favorite>}></Route>
                <Route path={'/setting'} element={<Setting></Setting>}></Route>
                <Route path={'/signIn'} element={<SignIn></SignIn>}></Route>
                {products.map((product:productsType,key:number)=>{
                    return <Route key={key} path={`/product/${product.product_id}`} element={<Product product={product}></Product>}></Route>
                })}
            </Routes>
        </BrowserRouter>
        </AppContext.Provider>
    )
}