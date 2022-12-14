import styled from 'styled-components'

export const PlayerItemContainer = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;

    .image-frame {
        position: relative;

        flex: 1 1 0;

        .background-image {
            width: 100%;
            height: 100%;
        }

        .icon-image {
            position: absolute;

            height: 120%;
            left: 50%;
            bottom: 0;

            transform: translate(-50%, 0);
        }

        .lose-label {
            width: 100%;

            padding: 4px 0px;

            font-size: 14px;
            text-align: center;
            color: black;

            text-transform: uppercase;
            background: #F96108;

            position: absolute;

            left: 0;
            bottom: 20%;
        }
    }

    .name-label {
        font-size: 0.7rem;
        text-align: center;
    }
`
