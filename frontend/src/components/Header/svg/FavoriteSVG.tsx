import styled from "styled-components";

const Path=styled.path`
   // fill:none;
   // fill-opacity:0;
   stroke-width:2;
   stroke-miterlimit:4;
   stroke-dasharray:none;
`

function FavoriteSVG(props:{fillColor:string}){
    return (
<svg
   width="55"
   height="50"
   viewBox="0 0 25.78125 23.4375"
   // version="1.1"
   // id="svg822"
   
   // fill="#000000"
   
   // xmlns="http://www.w3.org/2000/svg"
   
   >
  {/* <defs
     id="defs166" />
  <g
     id="SVGRepo_bgCarrier"
     strokeWidth="0" />
  <g
     id="SVGRepo_tracerCarrier"
     strokeLinecap="round"
     strokeLinejoin="round" /> */}
  {/* <g
     id="SVGRepo_iconCarrier">
    <defs
       id="defs816">
      
    </defs>
    
      
    <metadata
       id="metadata819">
      
    </metadata> */}
    <g
       fill={props.fillColor}
      //  id="layer1"
      className="favG"
       transform="translate(0,-289.0625)"
       >
      <Path
      //   className="heartPath"
        
        //  style="opacity:1;fill:none;fill-opacity:1;stroke:#000000;stroke-width:2;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
        d="m 3.8865985,292.31713 a 6.4438956,6.4294585 0 0 0 -1.7765542,2.98908 6.4438956,6.4294585 0 0 0 1.6675358,6.21011 l 9.1130439,9.09263 9.113045,-9.09263 a 6.4438956,6.4294585 0 0 0 1.667537,-6.21011 6.4438956,6.4294585 0 0 0 -4.556524,-4.54632 6.4438956,6.4294585 0 0 0 -6.224058,1.6638 6.4438956,6.4294585 0 0 0 -6.2240574,-1.6638 6.4438956,6.4294585 0 0 0 -2.7799681,1.55724 z"
      //   id="rect870"
        />
    {/* </g> */}
  </g>
</svg>




    )
}

export default FavoriteSVG;