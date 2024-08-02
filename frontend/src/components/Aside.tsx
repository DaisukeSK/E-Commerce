import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext, categoriesType } from '../App'

function Aside(){
    const { categories } =useContext(AppContext)

    return (
        <aside>
            <ul>

            {categories.map((category:categoriesType,key:number)=>{
                return (
                    <li key={key}>
                        <Link to={`/category/${category.category_id}`}>{category.category_name}</Link>
                    </li>
                    )
            })}

            </ul>
        </aside>
    )
}

export default Aside