import styled from 'styled-components'

export const ResultModalContainer = styled.div`
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
            align-items: center;

            flex-gap: 10px;
            gap: 10px;

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

            .align-center {
                align-items: center;
            }

            .justify-center {
                justify-content: center;
            }

            .svg-label {
                position: relative;
            }

            .first-label {
                position: absolute;

                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);

                font-weight: 700;
                font-size: 24px;

                text-transform: uppercase;
            }

            .second-label {
                font-size: 18px;
            }
        }
    }
`