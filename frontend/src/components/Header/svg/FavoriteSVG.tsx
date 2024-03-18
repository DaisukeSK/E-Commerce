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
        >
            <g
                fill={props.fillColor}
                className="favG"
                transform="translate(0,-289.0625)"
            >
                <Path
                    d="m 3.8865985,292.31713 a 6.4438956,6.4294585 0 0 0 -1.7765542,2.98908 6.4438956,6.4294585 0 0 0 1.6675358,6.21011 l 9.1130439,9.09263 9.113045,-9.09263 a 6.4438956,6.4294585 0 0 0 1.667537,-6.21011 6.4438956,6.4294585 0 0 0 -4.556524,-4.54632 6.4438956,6.4294585 0 0 0 -6.224058,1.6638 6.4438956,6.4294585 0 0 0 -6.2240574,-1.6638 6.4438956,6.4294585 0 0 0 -2.7799681,1.55724 z"
                />
            </g>
        </svg>
    )
}

export default FavoriteSVG;