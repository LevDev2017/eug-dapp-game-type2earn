import styled from 'styled-components'

export const TopBarContainer = styled.div`
    display: flex;
    flex-direction: row;

    flex-gap: 10px;
    gap: 10px;

    .gap {
        flex: 1 1 0;
    }

    .buy-button {
        img {}
    }

    .wallet-address {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        padding: 0px 20px;

        background: #61F908;

        font-family: 'Rubik';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;

        text-align: center;
        text-transform: capitalize;

        color: #191C25;
    }
`
