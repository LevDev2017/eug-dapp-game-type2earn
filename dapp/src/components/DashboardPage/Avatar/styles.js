import styled from 'styled-components'

import AvatarBackSVG from '../../../assets/svg/avatar-back.svg'

export const AvatarContainer = styled.div`
    background-image: url(${AvatarBackSVG});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: 0% 0%;

    height: 100%;

    padding: 20px;
    display: grid;
    grid-template-columns: max-content max-content;
    column-gap: 10px;
    row-gap: 10px;

    grid-template-areas:
        "a b"
        "a c";
    
    .column-align {
        grid-area: a;

        display: flex;
        flex-direction: column;
        justify-content: center;

        .avatar {
            border-radius: 50%;
        }
    }

    .bnb-balance {
        grid-area: b;
    }

    .tte-balance {
        grid-area: c;
    }
`
