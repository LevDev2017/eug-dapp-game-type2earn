import styled from 'styled-components'
import BuyButtonSVG from '../../../../assets/svg/buy-button-frame.svg'

export const BuyButtonContainer = styled.div`
    padding: 15px 15px;
    background: url(${BuyButtonSVG});
    background-size: 100% 100%;

    font-family: 'Rubik';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    /* identical to box height */

    text-align: center;
    text-transform: capitalize;

    user-select: none;
    cursor: pointer;
    color: #afc;

    &:hover {
        color: #fff;
    }

    &:active {
        color: #486;
    }
`
