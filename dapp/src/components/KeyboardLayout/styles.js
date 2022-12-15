import styled from 'styled-components'

export const KeyboardLayoutContainer = styled.div`
    padding: 20px;

    display: flex;
    flex-direction: column;
    flex-gap: 6px;
    gap: 6px;

    align-items: center;

    .key-row {
        display: flex;
        flex-direction: row;

        flex-gap: 6px;
        gap: 6px;

        align-items: center;

        .key {
            font-weight: 700;
            font-size: 14px;
            padding: 6px 12px;
            border: 3px solid #61F908;
            text-transform: uppercase;

            user-select: none;
            cursor: pointer;

            transition: all .14s ease-in-out;
            &:hover {
                background: #61F90880;
            }

            &:active {
                background: #61F90840;
                color: black;
            }
        }

        .green {
            background: #61F908;
            color: black;
        }

        .space {
            min-width: 200px;
            color: transparent !important;
        }
    }
`