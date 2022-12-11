import styled from 'styled-components'

export const HeaderContainer = styled.div`
    position: fixed;

    z-index: 1;
    
    width: 100%;
    height: 108px;
    padding: 0 20px;

    background: #191C25BF;

    display: flex;
    flex-direction: row;
    align-items: center;

    flex-gap: 20px;
    gap: 20px;

    backdrop-filter: blur(4px);

    .menu-item {
        font-family: 'Inter';
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        /* identical to box height, or 125% */

        letter-spacing: 0.1em;
        text-transform: uppercase;
        white-space: nowrap;

        transition: all 0.2s ease-in-out;

        cursor: pointer;
        user-select: none;

        &:hover {
            color: #ffccaa;
        }

        &:active {
            color: #664422;
        }
    }

    .menu-item-selected {
        color: #61F908;
    }
`
