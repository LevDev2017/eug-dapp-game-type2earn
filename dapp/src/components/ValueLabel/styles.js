import styled from 'styled-components'

export const ValueLabelContainer = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;

    height: 100%;

    .col-center {
        position: absolute;

        left: 0;
        top: 0;
        right: 0;
        bottom: 0;

        display: flex;
        flex-direction: column;
        justify-content: center;

        padding: 10px;
    }

    .content-frame {
        display: flex;
        flex-direction: row;

        font-family: 'Rubik';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        /* identical to box height */

        text-align: center;
        text-transform: capitalize;

        .value {
            flex: 1 1 0;
        }

        .icon {
            width: 40px;
        }
    }
`