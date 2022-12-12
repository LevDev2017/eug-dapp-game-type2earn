import styled from 'styled-components'

export const HistoryContainer = styled.div`
    height: 100%;

    display: flex;
    flex-direction: column;

    .label {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 48px;
        text-transform: uppercase;
    }

    .content-frame {
        flex: 1 1 0;
        
        background: #13141F;
        max-height: 320px;

        padding: 20px;

        overflow-x: hidden;
        overflow-y: auto;

        .content-grid {
            display: grid;
            grid-template-columns: max-content max-content max-content max-content max-content 1fr;
            
            .header {
                background: #0008;
                margin-bottom: 20px;

                span {
                    padding: 10px;
                    font-family: 'Rubik';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 19px;

                    text-align: left;
                }
            }

            .value {
                padding: 10px;
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                line-height: 19px;
            }

            .end-item {
                text-align: center;
            }

            .row-1 {
                display: flex;
                flex-direction: row;

                flex-gap: 8px;
                gap: 8px;

                align-items: center;
                justify-content: center;
            }

            .win {
                color: #61F908;
            }

            .lose {
                color: #E92662;
            }
        }
    }
`