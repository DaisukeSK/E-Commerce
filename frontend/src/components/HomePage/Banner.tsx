import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { BannerForLaptop, BannerForMobile } from '../StyledComponents.tsx'
import logo from '../../../public/logo.svg'

function Banner() {
  
    const [ count, setCount ] = useState<number>(0)
    const [ opacity, setOpacity ] = useState<number>(0)

    const loc=useLocation()

    useEffect(()=>{

        window.scrollTo(0,0)

        let interval:any;

        setCount(0)
        setOpacity(0)
        
        if(!loc.pathname.split('/')[1]){

            let i=0;
    
            interval=setInterval(()=>{

                i++
                // console.log("count",i)

                i==28 && clearInterval(interval)

                switch(true){
                    case (i==7 || i==14 || i==21 || i==24 || i==25 || i==26):
                        setCount(i);
                        break;
                    case (i==2 || i==9 || i==16 || i==23):
                        setOpacity(1)
                        break;
                    case (i==6 || i==13 || i==20):
                        setOpacity(0)
                        break;
                }

            },1000);
        }

        return () => clearInterval(interval);
        
    },[loc])

    return !loc.pathname.split('/')[1] && (
       
        <>
            <BannerForLaptop opacity={opacity} count={count}>

                <div>
                    Make your life&nbsp;
                    <span>{count==0?'better':count==7?'easy':count==14?'valuable':'amazing'}</span>
                </div>
                
                <img src={logo}/>

            </BannerForLaptop>

            <BannerForMobile>
                <img src={logo}/>
            </BannerForMobile>
        
        </>

    )
}

export default Banner