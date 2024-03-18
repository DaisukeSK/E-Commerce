import Styled from "styled-components";

const Path=Styled.path`
    fill-opacity:0;
    stroke:#ffffff;
    stroke-linecap:round;
    stroke-linejoin:round;
    stroke-dasharray:none;
`;

const Path1=Styled(Path)`
    stroke-width:1.1;
`;

const Path2=Styled(Path)`
    stroke-width:0.5;
`;

const Circle=Styled.circle`
    fill-opacity:0;
    stroke:#ffffff;
    stroke-width:0.8;
    stroke-linecap:round;
    stroke-linejoin:round;
    stroke-dasharray:none;
`;

function Cart2SVG(){
    return (
        <svg
            width="46"
            height="40"
            viewBox="0 0 12.170834 10.583337"
        >
            <g className="cartG">
                <Path1
                    d="M 0.77893554,0.65068722 2.1588547,1.1681569 2.9638075,6.5728403 H 10.524615 L 11.415813,2.0881032 3.6825156,1.714375"
                />
                <Path2
                    d="M 3.6675158,6.597874 2.6325764,8.0065418 h 7.9639896"
                />
                <Circle
                    cx="3.9837472"
                    cy="9.3114939"
                    r="0.80495286"
                />
                <Circle
                    cx="9.4171791"
                    cy="9.2514544"
                    r="0.80495286"
                />
            </g>
        </svg>
    )
}

export default Cart2SVG;