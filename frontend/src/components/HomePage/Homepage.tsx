import { useContext } from 'react'
import SearchBar from '../SearchBar.tsx'
import Category from './Category.tsx'
import Banner from './Banner.tsx'
import Aside from '../Aside.tsx'
import { AppContext, categoriesType } from '../../App.tsx'

function HomePage() {
  
    const { categories } =useContext(AppContext)

    window.scrollTo(0,0)
    
    return (
        <>
            <Banner></Banner>
            <div className='homepageFlex'>
                <Aside></Aside>

                <div className='right'>

                    <SearchBar/>
                    {categories.map((category:categoriesType, key:number)=>{
                        return <Category category={category} key={key}/>
                    })}
                </div>
            </div>
        </>
    )
}

export default HomePage