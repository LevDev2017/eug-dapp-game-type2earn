import styled from 'styled-components'
import BgButtonSVG from '../../assets/svg/bg_button.svg'
import BgButtonDisabledSVG from '../../assets/svg/bg_button_disabled.svg'
import BgButtonDenseSVG from '../../assets/svg/bg_button_dense.svg'

export const BgButtonContainer = styled.div`
    background: url(${props => props.disabled === true? BgButtonDisabledSVG: props.dense === true? BgButtonDenseSVG: BgButtonSVG});
    background-size: 100% 100%;

    width: 210px;
    height: 60px;

    font-family: 'Rubik';
    font-weight: 700;
    font-size: 20px;
    line-height: 60px;
    /* identical to box height */

    text-align: center;
    text-transform: capitalize;
    white-space: nowrap;

    color: ${props => props.disabled === true? '#ccc' : props.dense === true? '#000': '#fff'};

    transition: all .2s ease-in-out;
    cursor: pointer;
    user-select: none;

    &:hover {
        color: ${props => props.disabled === true? '#ccc' : props.dense === true? '#365': '#cfa'};
    }

    &:active {
        color: ${props => props.disabled === true? '#ccc' : props.dense === true? '#afa': '#264'};
    }
`
