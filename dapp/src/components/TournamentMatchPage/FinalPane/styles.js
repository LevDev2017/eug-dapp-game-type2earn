import styled from 'styled-components'

export const FinalPaneContainer = styled.div`
    padding: 20px;
    width: 100%;

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

    .justify-fit {
        justify-content: space-evenly;
    }

    .full-width {
        width: 100%;
        overflow: hidden;
    }

    .big-label {
        font-weight: 700;
        font-size: 40px;
        text-transform: uppercase;
        text-align: center;
    }

    .label {
        font-size: 24px;
        text-align: center;
    }

    .small-label {
        font-size: 16px;
        text-align: center;
    }

    .capitalize {
        text-transform: capitalize;
    }

    .uppercase {
        text-transform: uppercase;
    }

    .green-square {
        padding: 6px 12px;
        background: #61F908;

        font-size: 16px;
        color: black;
    }

    .green {
        color: #61F908;
    }

    .relative {
        position: relative;
    }

    .players-8 {
        width: 100%;
        aspect-ratio: 16 / 10;

        .small-position {
            position: absolute;

            width: 9.375%;
            height: 15%;

            transform: translate(-50%, -50%);
        }

        .big-position {
            position: absolute;
            
            width: 12.5%;
            height: 20%;

            transform: translate(-50%, -50%);
        }

        .p-1 {
            left: 6.25%;
            top: 10%;
        }

        .p-2 {
            left: 6.25%;
            top: 30%;
        }

        .p-3 {
            left: 6.25%;
            top: 55%;
        }

        .p-4 {
            left: 6.25%;
            top: 75%;
        }

        .p-5 {
            left: 84.375%;
            top: 10%;
        }

        .p-6 {
            left: 84.375%;
            top: 30%;
        }

        .p-7 {
            left: 84.375%;
            top: 55%;
        }

        .p-8 {
            left: 84.375%;
            top: 75%;
        }

        .p-9 {
            left: 18.75%;
            top: 20%;
        }

        .p-10 {
            left: 18.75%;
            top: 65%;
        }

        .p-11 {
            left: 71.875%;
            top: 20%;
        }

        .p-12 {
            left: 71.875%;
            top: 65%;
        }

        .p-13 {
            left: 31.25%;
            top: 40%;
        }

        .p-14 {
            left: 56.25%;
            top: 40%;
        }
    }
`