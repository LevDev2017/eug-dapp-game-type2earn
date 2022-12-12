import styled from 'styled-components'

export const PlayerOutlineContainer = styled.div`
    width: 100%;
    height: 100%;

    position: relative;

    img {
        height: 100%;
    }

    .stand-image {
        position: absolute;
        left: 50%;
        bottom: -2px;
        transform: translate(-50%, 0);
    }

    .id-field {
        position: absolute;

        right: 20px;
        bottom: 20px;

        font-family: 'Rubik';
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 28px;
        text-transform: capitalize;
    }
`
