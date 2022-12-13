import styled from 'styled-components'

export const PvePageContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;

    .right-area {
        flex: 1 1 0;

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

        .remaining-frame {
            text-align: center;

            font-family: 'Rubik';
            font-style: normal;
            font-weight: 500;
            font-size: 24px;
            line-height: 28px;

            text-transform: uppercase;

            span {
                padding-left: 20px;
                color: #61F908;
            }
        }

        .level-frame {
            width: 100%;

            overflow-y: hidden;
            overflow-x: auto;

            .level-contents {
                display: flex;
                flex-direction: row;

                flex-gap: 10px;
                gap: 10px;
            }
        }

        .play-frame {
            display: flex;
            flex-direction: row;

            justify-content: center;
        }
    }
`
