import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { BannerSec } from '../StyledComponents.tsx'
import logo from '../../../public/logo.svg'

function Banner() {
  
    const [ count, setCount ] = useState<number>(0)
    const [ opacity, setOpacity ] = useState<number>(0)

    const loc=useLocation()
    
    useEffect(()=>{
        
        [7,14,21,25,24,26].map(num=>{
            setTimeout(()=>{
                setCount(num)
            },num*1000)
        })
        
    },[])

    useEffect(()=>{

        setTimeout(()=>{
            setOpacity(1)
        },2000)

        setTimeout(()=>{
            setOpacity(0)
        },6000)
        
    },[count])

    return !loc.pathname.split('/')[1] && (
       
        <BannerSec opacity={opacity} count={count}>

            <div>
                Make your life&nbsp;
                <span>{count==0?'better':count==7?'easy':count==14?'valuable':'amazing'}</span>
            </div>
            
            <img src={logo}/>

        </BannerSec>

    )
}

export default Banner