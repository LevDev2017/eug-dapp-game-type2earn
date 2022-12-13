import styled from 'styled-components'

export const LoadoutItemContainer = styled.div`
    position: relative;

    &:hover {
        .in-use-fitler {
            display: none;
        }
    }

    img {
        width: 180px;
        height: auto;
    }

    .in-use-filter {
        position: absolute;

        left: 0;
        top: 0;
        right: 0;
        bottom: 6px;

        background: #0002;
    }

    .in-use, .select {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;

        cursor: pointer;
        user-select: none;

        text-transform: uppercase;

        padding: 4px 10px;
        background: #61F908a0;
        color: #444;

        &:hover {
            background: #61F908;
            color: #000;
        }

        &:active {
            background: #222;
            color: #fff;
        }

        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translate(-50%, 0);
    }

    .select-show {
        display: block;
    }

    .select-hide {
        display: none;
    }

    .select-back {
        position: absolute;

        left: 0;
        top: 0;
        right: 0;
        bottom: 6px;

        background: linear-gradient(180deg, rgba(97, 249, 8, 0) 77.46%, #61F908 112.88%), url(6.png);
        border: 2px solid #61F908;
    }
`
