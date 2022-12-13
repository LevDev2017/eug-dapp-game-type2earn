import styled from 'styled-components'

export const PlayPaneContainer = styled.div`
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

        .play-frame {
            display: flex;
            flex-direction: row;

            align-items: center;
            justify-content: space-between;
            flex-gap: 20px;
            gap: 20px;

            .reward-label {
                font-size: 20px;
                line-height: 200%;

                text-transform: uppercase;
            }
        }
    }
`