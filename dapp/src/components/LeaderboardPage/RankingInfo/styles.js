import styled from 'styled-components'

export const RankingInfoContainer = styled.div`
    ${props => props.sticky === true?
        'position: sticky; top: 0; z-index: 1; font-weight: 600;':
        'position: relative; font-weight: 300;'};

    display: flex;
    flex-direction: row;

    flex-gap: 6px;
    gap: 6px;

    font-size: 16px;

    cursor: pointer;

    .ranking-id, .username, .typing-level, .wallet, .total-earned {
        display: flex;
        flex-direction: row;

        justify-content: center;
        align-items: center;

        flex-gap: 10px;
        gap: 10px;
    }

    .ranking-id {
        flex: 0 0 10%;
    }

    .username {
        flex: 1 1 30%;

        img {
            height: 100%;
        }
    }

    .typing-level {
        flex: 0 0 20%;
    }

    .wallet {
        flex: 0 0 20%;
    }

    .total-earned {
        flex: 0 0 20%;
    }

    .green-1 {
        background: #61F908;
        color: #0E052D !important;

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

    .selected-border {
        position: absolute;

        left: 0;
        top: 30%;
        bottom: 30%;
        width: 1px;

        border-left: 2px solid #61F908;
    }
`
