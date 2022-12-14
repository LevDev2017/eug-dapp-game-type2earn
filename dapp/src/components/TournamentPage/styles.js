import styled from 'styled-components'

import TournamentBack1PNG from '../../assets/images/tournament-back-1.png'

export const TournamentPageContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;

    .right-area {
        flex: 1 1 0;

        position: relative;

        width: 90%;

        display: flex;
        flex-direction: column;
        flex-gap: 40px;
        gap: 40px;

        padding: 20px;

        .row-frame {
            display: flex;
            flex-direction: row;

            flex-gap: 20px;
            gap: 20px;
        }

        .col-frame {
            display: flex;
            flex-direction: column;

            flex-gap: 20px;
            gap: 20px;
        }

        .no-gap {
            flex-gap: 0px !important;
            gap: 0px !important;
        }

        .gap-40 {
            flex-gap: 40px !important;
            gap: 40px !important;
        }

        .align-center {
            align-items: center;
        }

        .justify-center {
            justify-content: center;
        }

        .variable-item {
            flex: 1 1 0;
        }

        .frame-1 {
            .label-frame {
                .big-label {
                    font-family: 'Rubik';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 40px;
                    line-height: 60px;
                    text-transform: uppercase;
                }

                .small-label {
                    font-family: 'Rubik';
                    font-style: normal;
                    font-weight: 700;
                    font-size: 20px;
                    line-height: 24px;
                    /* identical to box height */

                    text-transform: capitalize;
                }
            }
        }

        .frame-2 {
            padding: 20px 30px;
        }

        .subtitle {
            font-size: 16px;

            text-align: center;
            text-transform: capitalize;
        }

        .grey-back {
            background: #191C25;
        }

        .gap {
            flex: 1 1 0;
        }

        .green {
            color: #61F908;
        }

        .label-1 {
            font-weight: 700;
            font-size: 30px;

            text-transform: uppercase;
        }

        .status-1 {
            font-weight: 700;
            font-size: 20px;
            text-transform: uppercase;

            padding: 8px 20px;

            color: black;
            background: #61F908;
        }

        .label-2 {
            font-size: 18px;
            text-transform: capitalize;
        }

        .level-number {
            padding: 6px 12px;
            font-size: 18px;
            font-weight: 700;

            color: black;
            background: #61F908;
        }

        .time-to-1 {
            font-size: 20px;
            text-transform: capitalize;

            text-align: right;
        }

        .bg-image-back {
            background: linear-gradient(#0008, #0008), url(${TournamentBack1PNG});
            background-size: 100%;

            padding: 20px;
        }

        .justify-fit {
            justify-content: space-between;
        }

        .medal-amount-label {
            font-weight: 700;
            font-size: 20px;
        }

        .uppercase {
            text-transform: uppercase;
        }

        .align-end {
            align-items: flex-end;
        }

        .registered-player-frame {
            background: #61F908;
            padding: 8px 30px;
            color: black;

            font-weight: 600;
            font-size: 24px;
            text-align: center;
            width: fit-content;
        }

        .register-description {
            font-size: 16px;
            text-transform: capitalize;
        }

        .padding-top-60 {
            padding-top: 60px;
        }
    }
`
