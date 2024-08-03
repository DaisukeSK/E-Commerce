import { useContext } from 'react'
import SearchBar from '../SearchBar.tsx'
import Category from './Category.tsx'
import { AppContext, categoriesType } from '../../App.tsx'

function HomePage() {
  
    const { categories } =useContext(AppContext)

    window.scrollTo(0,0)
    
    return (
        <section className='homepage'>
            <SearchBar/>
            {categories.map((category:categoriesType, key:number)=>{
                return <Category category={category} key={key}/>
            })}
        </section>
    )
}

export default HomePage