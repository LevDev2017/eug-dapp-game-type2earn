import styled from 'styled-components'

export const PreparePaneContainer = styled.div`
    display: flex;
    flex-direction: row;

    flex-gap: 20px;
    gap: 20px;

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

    .player-outline {
        padding-top: 100px;
    }

    .max-width-300 {
        max-width: 300px;
    }

    .remaining-frame {
        font-weight: 500;
        font-size: 16px;
        line-height: 28px;

        white-space: nowrap;

        text-transform: uppercase;

        span {
            padding-left: 10px;
            font-size: 24px;
            color: #61F908;
        }
    }

    .player-description {
        font-size: 16px;
        padding: 0px 20px;
        text-align: center;
    }

    .search-input {
        max-width: 200px;

        outline: none;
        border: none;
        background: #fff4;

        font-size: 16px;

        text-align: right;
        padding: 10px 20px;
        border-radius: 12px;

        color: #fff;

        ::placeholder {
            color: #fff4;
        }
    }

    .room-frame {
        display: flex;
        flex-direction: column;

        flex-gap: 6px;
        gap: 6px;

        max-height: 500px;

        overflow-x: hidden;
        overflow-y: auto;
    }

    .leave-room-link {
        color: white;
        text-decoration: none;
    }
`