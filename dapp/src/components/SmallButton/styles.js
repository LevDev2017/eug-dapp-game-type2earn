import styled from 'styled-components'

export const SmallButtonContainer = styled.div`
    cursor: pointer;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.04);
    border-radius: 10px;
    padding: 8px 10px;
    margin: 4px 4px;
    height: fit-content;
    color: white;
    font-size: 16px;
    width: fit-content;
    word-break: keep-all;

    display: flex;
    align-items: center;

    &:hover {
        transition: all 160ms ease-in-out;
        background: rgba(255,255,255,0.16);
        filter: drop-shadow(2px 2px 8px rgba(0,0,0,0.4));
    }

    &:active {
        color: #ccc;
        background: rgba(255,255,255,0.1);
    }

    span {
        margin-left: 10px;
    }
`;
