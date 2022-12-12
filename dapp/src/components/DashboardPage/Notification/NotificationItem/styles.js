import styled from 'styled-components'

export const NotificationItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-gap: 20px;
    gap: 20px;

    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    /* or 160% */

    .button-frame {
        display: flex;
        justify-content: center;

        .link-frame {
            border: 2px solid #fff2;
            padding: 10px 20px;

            font-family: 'Rubik';
            font-style: normal;
            font-weight: 700;
            font-size: 20px;
            line-height: 24px;

            border-radius: 20px;

            text-decoration: none;

            transition: all .2s ease-in-out;
            color: #fff8;

            &:hover {
                color: #fff;
                border: 2px solid #fff6;
            }

            &:active {
                color: #fff4;
                border: 2px solid #fff1;
            }
        }
    }

    .gap-bar {
        width: 100%;
        height: 1px;

        border-top: 1px solid #fff2;
    }
`