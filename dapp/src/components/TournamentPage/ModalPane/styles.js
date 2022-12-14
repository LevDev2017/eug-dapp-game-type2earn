import styled from 'styled-components'

export const ModalPaneContainer = styled.div`
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

            .label1, .label2 {
                font-size: 16px;

                text-align: center;
                text-transform: uppercase;
            }

            .label2 {
                font-weight: 700;
            }

            .button-frame {
                display: flex;
                flex-direction: row;
                justify-content: center;

                flex-gap: 20px;
                gap: 20px;
            }

            .button-1 {
                margin-top: 30px;
                position: relative;

                font-weight: 700;
                font-size: 24px;

                cursor: pointer;
                user-select: none;

                .black {
                    color: #444;
                    transition: all .1s ease-in-out;

                    &:hover {
                        color: #6c6;
                    }

                    &:active {
                        color: black;
                    }
                }

                .white {
                    color: #ccc;
                    transition: all .1s ease-in-out;

                    &:hover {
                        color: #eee;
                    }

                    &:active {
                        color: #888;
                    }
                }

                .button-label {
                    position: absolute;

                    left: 50%;
                    top: calc(50% - 3px);

                    transform: translate(-50%, -50%);
                }
            }
        }
    }
`