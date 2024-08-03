import { useContext, useRef } from 'react'
import { AppContext, categoriesType } from '../App'
import { useNavigate } from 'react-router-dom'

function SearchBar(){

    const { categories } =useContext(AppContext)

    const categoryRef: React.RefObject<HTMLSelectElement> = useRef<HTMLSelectElement>(null)
    const keywordRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)

    const navigate=useNavigate()

    const href:string=location.href

    const categoryId:number=href.includes('&category=')?+href.split('&category=')[1]:+href.split('/category/')[1]

    return (
        <>
            <div className="searchBar">

                <select name='category' ref={categoryRef}>
                    <option value='all'>All</option>
                    {categories.map((category:categoriesType, key:number)=>{
                        return <option key={key} value={category.category_id} selected={category.category_id==categoryId?true:false}>{category.category_name}</option>
                    })}

                </select>
                <input type='text' placeholder=' Type keywords.' ref={keywordRef}/>
                <button onClick={()=>navigate(`/search?keyword=${keywordRef.current?.value}&category=${categoryRef.current?.value}`)}></button>
            </div>
            <hr className='underSearchBar'/>
        </>
    )
}

export default SearchBar