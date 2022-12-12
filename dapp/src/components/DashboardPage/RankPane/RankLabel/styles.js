import styled from 'styled-components'

export const RankLabelContainer = styled.div`
    display: flex;
    flex-direction: column;

    flex-gap: 10px;
    gap: 10px;

    align-items: center;

    .label {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 28px;
        text-align: center;
        text-transform: capitalize;
    }

    .image-frame {
        position: relative;

        .value {
            position: absolute;
            
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);

            font-family: 'Rubik';
            font-style: normal;
            font-weight: 700;
            font-size: 40px;
            line-height: 47px;
            text-align: center;
            text-transform: capitalize;
        }
    }
`