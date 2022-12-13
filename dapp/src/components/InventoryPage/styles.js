import styled from 'styled-components'

export const InventoryPageContainer = styled.div`
    display: flex;
    flex-direction: row;

    .right-area {
        flex: 1 1 0;

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

        .frame-2 {
            .stand-out-frame {
                padding-top: 100px;
                align-items: center;

                .gap-5 {
                    flex-gap: 5px !important;
                    gap: 5px !important;
                }

                .line-1 {
                    font-family: 'Rubik';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 12px;
                    text-transform: uppercase;
                }

                .line-2 {
                    font-family: 'Rubik';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 16px;
                }
            }

            .loadout-label {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 500;
                font-size: 24px;
                text-transform: capitalize;
            }

            .loadout-images {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;

                flex-gap: 10px;
                gap: 10px;

                overflow-y: auto;
                overflow-x: hidden;

                max-height: 600px;
            }
        }
    }
`
