import styled from 'styled-components'

export const ProgressBarContainer = styled.div`
    width: 100%;
    padding: 48px 26px 10px 26px;
    
    .back-frame {
        width: 100%;
        height: 14px;
        border-radius: 16px;
        background: rgba(255,255,255,0.2);

        position: relative;
    }

    .value-frame {
        position: absolute;

        left: 2px;
        top: 2px;
        width: calc(${props => (props.value - props.min) * 100 / (props.max - props.min)}% - 4px);
        height: 10px;
        border-radius: 12px;
        background: linear-gradient(to right, #f0f, #0fc);
    }

    .min-value {
        position: absolute;

        left: -24px;
        top: -48px;
        width: 48px;
        height: 48px;

        border-radius: 50%;
        background: #f0f3;
        border: 1px solid #f0f;

        text-align: center;
        font-size: 10px;
        line-height: 48px;

        user-select: none;
    }

    .max-value {
        position: absolute;

        right: -24px;
        top: -48px;
        width: 48px;
        height: 48px;

        border-radius: 50%;
        background: #cf03;
        border: 1px solid #cf0;

        text-align: center;
        font-size: 10px;
        line-height: 48px;

        user-select: none;
    }

    .value {
        position: absolute;

        left: calc(${props => (props.value - props.min) * 100 / (props.max - props.min)}% - 24px);
        top: -48px;
        width: 48px;
        height: 48px;

        border-radius: 50%;
        background: #032e;
        border: 1px solid #0fc;

        text-align: center;
        font-size: 10px;
        line-height: 48px;

        user-select: none;
    }
`;
