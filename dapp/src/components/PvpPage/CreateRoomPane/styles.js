import styled from 'styled-components'

export const PlayPaneContainer = styled.div`
    .ambient-dark {
        position: fixed;
        z-index: 50;

        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        background: #0008;
    }

    .model-frame {
        position: fixed;
        z-index: 50;

        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        width: fit-content;

        display: flex;
        flex-direction: column;

        .content-frame {
            padding: 20px;

            border: 1px solid #61F908;
            background: #150F22;

            display: flex;
            flex-direction: column;

            flex-gap: 10px;
            gap: 10px;

            .label1 {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                text-transform: uppercase;
            }

            .tte-input-frame {
                padding: 10px 20px;
                background: #fff2;

                display: flex;
                flex-direction: row;
                align-items: center;

                .tte-amount-input {
                    flex: 1 1 0;
                    outline: none;
                    border: none;
                    background: none;

                    font-size: 16px;
                    color: #fff;

                    ::placeholder {
                        color: #fff2;
                    }
                }

                .max-button {
                    font-size: 16px;
                    font-weight: 700;
                    color: #fffc;

                    text-transform: uppercase;
                    cursor: pointer;
                    user-select: none;

                    &:hover {
                        color: #fff;
                    }

                    &:active {
                        color: #fff4;
                    }
                }
            }

            .label2 {
                font-size: 16px;
            }

            .error {
                font-weight: 700;
                font-size: 14px;
                color: #E92662;
            }

            .gap-line {
                height: 1px;
                border-top: 1px solid #fff4;
            }

            .typing-level-frame {
                display: flex;
                flex-direction: row;

                flex-gap: 20px;
                gap: 20px;

                .typing-level {
                    font-weight: 300;
                    font-size: 18px;
                    white-space: nowrap;

                    text-transform: capitalize;
                }

                .levels {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;

                    flex-gap: 6px;
                    gap: 6px;

                    .level-item, .level-item-selected {
                        width: 40px;
                        height: 40px;
                        line-height: 40px;

                        font-size: 16px;

                        text-align: center;
                        cursor: pointer;
                    }

                    .level-item {
                        background: #53555C;
                        color: white;
                    }

                    .level-item-selected {
                        background: #61F908;
                        color: black;
                    }
                }
            }

            .confirm-frame {
                display: flex;
                flex-direction: row;

                justify-content: right;
            }
        }
    }
`