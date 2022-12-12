import styled from 'styled-components'

export const HeaderItemContainer = styled.div`
    position: relative;
    padding: 20px 0px;
    background: ${props => props.selected === true? '#13141F': '#191C25'};

    .selected-bar {
        position: absolute;
        left: 0;
        top: 20%;
        width: 5px;
        height: 60%;

        background: #61F908;
        box-shadow: 10px 0px 25px #61F908;
    }

    .icon-frame {
        position: relative;

        svg {
            fill: ${props => props.selected === true? '#fff' : props.def === true? '#61F908': '#53555C'};
        }

        .desc-label {
            position: absolute;

            left: 100%;
            top: 0;
            
            transform: translate(-50%, -50%);

            padding: 2px 6px;

            font-family: 'Rubik';
            font-style: normal;
            font-weight: 700;
            font-size: 10px;

            color: #000000;

            background: linear-gradient(270deg, #FFB800 0%, #FFD15C 100%, #FFD15C 100%);
            border-radius: 5px;
        }
    }

    .link-frame {
        display: flex;
        flex-direction: column;

        align-items: center;

        flex-gap: 10px;
        gap: 10px;

        text-decoration: none;
        color: white;

        &:hover {
            color: #61F908;
        }

        &:active {
            color: #116100;
        }

        .label-frame {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 19px;
            /* identical to box height */

            text-transform: capitalize;
        }
    }
`
