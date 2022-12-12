import styled from 'styled-components'
import ConnectBackSVG from '../../../assets/svg/connect.svg'

export const ConnectButtonContainer = styled.div`
    padding: 15px 30px;
    background: url(${ConnectBackSVG});
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
