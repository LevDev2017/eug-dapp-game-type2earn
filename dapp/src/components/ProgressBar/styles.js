import styled from 'styled-components'

export const ProgressBarContainer = styled.div`
    width: 100%;
    height: 2px;
    background: #fff2;

    position: relative;

    .typing-progress {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: ${props => `${props.percent}%`};

        background: #61F908;
    }
`