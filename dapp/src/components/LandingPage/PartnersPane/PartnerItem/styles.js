import styled from 'styled-components'

export const PartnerItemContainer = styled.div`
    position: relative;

    .back-frame {
    }

    .item-image {
        position: absolute;

        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        display: flex;

        img {
            width: 100%;

            object-fit: contain;
            object-position: 50% 50%;
        }
    }
`
