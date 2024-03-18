import { useContext, useRef } from 'react'
import { AppContext, categoriesType } from '../App'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function SearchBar(){

    const { setProducts, categories, backendURL, setSearchResult } =useContext(AppContext)

    const categoryRef: React.RefObject<HTMLSelectElement> = useRef<HTMLSelectElement>(null)
    const keywordRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)

    const navigate=useNavigate()

    const searchProducts=()=>{
        navigate('/search')
        axios.post(`${backendURL}/product/searchProducts`,{categoryId:categoryRef.current?.value,keyword:keywordRef.current?.value})
        .then((res:any)=>{
            setProducts([...res.data])
            setSearchResult({searched:true,result:res.data.length})
        })
    }

    const categoryId=+location.href.split('/search/')[1]
    window.scrollTo(0, 0);

    return (
        <div className="searchBar">

            <select name='category' ref={categoryRef}>
                <option value='all'>All</option>
                {categories.map((category:categoriesType, key:number)=>{
                    return <option key={key} value={category.category_id} selected={category.category_id==categoryId?true:false}>{category.category_name}</option>
                })}

            </select>
            <input type='text' placeholder=' Type keywords.' ref={keywordRef}/>
            <button onClick={searchProducts}></button>
        </div>
    )
}

export default SearchBar