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

            .leave-room-link {
                color: white;
                text-decoration: none;
            }
        }

        .typing-bar {
            width: 100%;
            height: 2px;
            background: #fff2;

            position: relative;

            .typing-progress {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 60%;

                background: #61F908;
            }
        }

        .typing-content {
            font-size: 20px;
            word-break: break-all;
            text-transform: uppercase;

            position: relative;
        }

        .typed-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
    }
`
