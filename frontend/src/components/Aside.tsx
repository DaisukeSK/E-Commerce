import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext, categoriesType } from '../App'
import { AsideLi } from './StyledComponents'

function Aside(){

    const { categories } =useContext(AppContext)

    const loc=useLocation()

    return loc.pathname.split('/')[1]!=='signIn' && (
        <aside>

            <ul>
                {categories.map((category:categoriesType,key:number)=>{
                    return (
                        <AsideLi key={key} selected={+loc.pathname.split('/category/')[1]==category.category_id?true:false}>
                            <Link to={`/category/${category.category_id}`}>{category.category_name}</Link>
                        </AsideLi>
                        )
                })}
            </ul>

        </aside>
    )
}

export default Aside