import { useState, useEffect } from 'react'

import BG1 from '../../../public/room.png'
import BG2 from '../../../public/cooking.png'
import BG3 from '../../../public/hiking.png'
import BG4 from '../../../public/grass.png'

function Banner() {
  
    const [ count, setCount ] = useState<number>(0)
    const [ opacity, setOpacity ] = useState<number>(0)
    
    useEffect(()=>{
        
        [7,14,21,25,26].map(num=>{
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

    const predicate:string = count==0?'better':count==7?'easy':count==14?'valuable':'amazing'

    return (
        <>
            <div
                className='mainBanner'
                style={{
                    backgroundImage: `url(${count==0?BG1:count==7?BG2:count==14?BG3:BG4})`,
                    animationName:`${count==7?'moveDown':count>=21?'moveDown2':'moveUp'}`
                }}
            >
                <span style={{opacity:count>=25?0:1}}>Make your life</span>
                <span
                    style={{
                        opacity: count>=25?0:opacity,
                        color: count==7?'#FFAF25':count==14?'#FF3E3E':'#FFFFFF'
                    }}
                >&nbsp;{predicate}</span>

            </div>

            <div style={{opacity:count==26?1:0}} className='subBanner'></div>
        </>
    )
}

export default Banner