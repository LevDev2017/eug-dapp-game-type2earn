import styled from 'styled-components'

import TokenomicsBackgroundPNG from '../../../assets/images/tokenomics-background.png'

export const TokenomicsPaneContainer = styled.div`
    background: url(${TokenomicsBackgroundPNG});
    background-size: 100% 100%;

    display: flex;
    flex-direction: column;

    img {
        width: 100%;
    }

    .content-frame {
        display: flex;
        flex-direction: row;

        padding: 80px 40px;

        flex-gap: 20px;
        gap: 20px;

        .left-frame {
            flex: 1 1 0;

            display: flex;
            flex-direction: column;

            flex-gap: 20px;
            gap: 20px;

            .title1 {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 700;
                font-size: 24px;
                line-height: 200%;
                /* identical to box height, or 83% */

                letter-spacing: 0.2em;
                text-transform: uppercase;

                color: #61F908;
            }

            .title2 {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 600;
                font-size: 36px;
                line-height: 130%;
                /* identical to box height, or 47px */

                letter-spacing: 0.05em;
                text-transform: uppercase;
            }

            .description {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 400;
                font-size: 20px;
                line-height: 32px;
            }
        }

        .right-frame {
            flex: 0 0 50%;

            display: flex;
            flex-direction: column;
            align-items: flex-end;

            .big-letters {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 800;
                font-size: 72px;
                line-height: 130%;
                /* identical to box height, or 94px */

                text-align: right;
                letter-spacing: 0.05em;
                text-transform: uppercase;

                background: linear-gradient(90deg, #61F908 0%, #3DBFBB 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
            }

            .small-letters {
                padding-left: 20px;

                font-family: 'Rubik';
                font-style: normal;
                font-weight: 700;
                font-size: 14px;
                line-height: 20px;
                /* identical to box height, or 143% */

                letter-spacing: 0.2em;
                text-transform: uppercase;

                color: #61F908;

            }

            .item-array-frame {
                display: flex;
                flex-direction: row;

                flex-gap: 20px;
                gap: 20px;
            }
        }
    }
`
