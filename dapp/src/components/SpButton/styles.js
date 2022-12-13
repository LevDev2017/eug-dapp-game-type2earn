import styled from 'styled-components'

export const SpButtonContainer = styled.div`
    position: relative;

    cursor: pointer;
    user-select: none;

    .label {
        position: absolute;
        left: 0;
        top: calc(50% - 3px);
        right: 0;
        bottom: 6px;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-gap: 10px;
        gap: 10px;

        transform: translate(0, -50%);

        font-weight: 700;
        font-size: 20px;

        text-align: center;
        text-transform: capitalize;

        color: #13141F;

        transition: all .14s ease-in-out;

        &:hover {
            color: #567;
            transform: translate(0, -50%) scale(105%, 105%);
        }

        &:active {
            color: #000;
            transform: translate(0, -50%) scale(95%, 95%);
        }
    }
`
