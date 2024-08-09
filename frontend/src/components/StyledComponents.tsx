import Styled from "styled-components"
import BG1 from '../../public/room.png'
import BG2 from '../../public/cooking.png'
import BG3 from '../../public/hiking.png'
import BG4 from '../../public/grass.png'

const A_orange='rgb(246, 166, 31)';

export const BannerSec=Styled.section<{opacity:number, count:number}>`
    @keyframes moveUp {
        0% {
            background-position-y: 60%;
            opacity: 0;
        }
        25% {
            opacity: 1;
        }
        50% {
            opacity: 1;
        }
        100% {
            background-position-y: 40%;
            opacity: 0;
        }
    }

    @keyframes moveDown {
        0% {
            background-position-y: 30%;
            opacity: 0;
        }
        25% {
            opacity: 1;
        }
        50% {
            opacity: 1;
        }
        100% {
            background-position-y: 70%;
            opacity: 0;
        }
    }

    @keyframes moveDown2 {
        0% {
            background-position-y: 20%;
            opacity: 0;
        }
        25% {
            opacity: 1;
        }
        50% {
            opacity: 1;
        }
        100% {
            background-position-y: 50%;
            opacity: 1;
        }
    }

    height: 300px;
    width: 100%;
    position: relative;

    background-image: url(${props=>props.count==0?BG1:props.count==7?BG2:props.count==14?BG3:BG4});
    animation-name: ${props=>props.count==7?'moveDown':props.count>=21?'moveDown2':'moveUp'};
    
    background-size: cover;

    animation-duration: 7s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: both;

    div, img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    div {
        font-size: 3rem;
        font-weight: bold;
        color: #FFFFFF;
        text-shadow: rgba(0, 0, 0, 0.5) 2px 2px 5px;
        opacity: ${props=>props.count>=25?0:1};
        transition: all 1s ease-in-out;
        white-space: nowrap;
    
        span {
            
            opacity: ${props=>props.opacity};
            color: ${props=>props.count==0?'#0C53D9':props.count==7?'#35BB1A':props.count==14?'#FF3E3E':'#F6A61F'};
            transition: all 1s ease-in-out;
        }
    }
    
    img {
        
        height: 70%;
        opacity: ${props=>props.count>=26?1:0};
        transition: all 5s;
        display: block;
        z-index: 2;
    }

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        opacity: ${props=>props.count>=24?.5:0};
        transition: all 3.5s;
        z-index: 1;
    }
    
`;

export const AsideLi=Styled.li<{selected:boolean}>`

    padding: 5px 0;
    a {
        color: #ffffff;
        padding: 3px 7px;
        border-radius: 3px;
        transition: all .3s;
        background-color: ${props=>props.selected?'rgb(100, 100, 100)':'transparent'};
        outline: 1px solid ${props=>props.selected?'grey':'transparent'};
        pointer-events: ${props=>props.selected?'none':'auto'};
        &:hover {
            background-color: ${A_orange};
            color: #000000;
        }
    }
            
`;