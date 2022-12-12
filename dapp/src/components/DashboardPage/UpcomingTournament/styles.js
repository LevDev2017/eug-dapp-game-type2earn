import styled from 'styled-components'

export const UpcomingTournamentContainer = styled.div`
    .title {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        text-align: center;
        text-transform: uppercase;
    }

    .content-frame {
        background: #13141F;

        padding: 10px;

        display: flex;
        flex-direction: column;

        flex-gap: 10px;
        gap: 10px;

        .row-frame {
            display: flex;
            flex-direction: row;

            justify-content: space-between;

            font-family: 'Rubik';
            font-style: normal;
            font-weight: 700;
            font-size: 14px;
            line-height: 17px;
            /* identical to box height */

            text-transform: uppercase;

            .green {
                color: #61F908;
            }

            .col-frame {
                display: flex;
                flex-direction: column;

                justify-content: space-between;
            }
        }

        .gap-line {
            width: 100%;
            height: 1px;

            border-top: 1px solid #fff1;
        }
    }
`
