import styled from 'styled-components'

export const RoomInfoContainer = styled.div`
    ${props => props.sticky === true?
        'position: sticky; top: 0; z-index: 1; font-weight: 600;':
        'position: relative; font-weight: 300;'};

    display: flex;
    flex-direction: row;

    flex-gap: 6px;
    gap: 6px;

    font-size: 16px;

    cursor: pointer;

    .room-id, .owner, .typing-level, .bet-amount {
        display: flex;
        flex-direction: row;

        justify-content: center;
        align-items: center;

        flex-gap: 10px;
        gap: 10px;
    }

    .room-id {
        flex: 0 0 15%;
    }

    .owner {
        flex: 1 1 35%;

        img {
            height: 100%;
        }
    }

    .typing-level {
        flex: 0 0 20%;
    }

    .bet-amount {
        flex: 0 0 30%;
    }

    .green {
        background: #61F908;
        color: #0E052D;

        height: ${props => props.sticky === true? '60px': '90px'};
    }

    .dark {
        background: #150F22;
        color: white;

        height: ${props => props.sticky === true? '60px': '90px'};
    }

    .show {
        display: block;
    }

    .hide {
        display: none;
    }

    .hover-frame {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        background: #0008;
    }

    .button-frame {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(0, -50%);
    }
`
