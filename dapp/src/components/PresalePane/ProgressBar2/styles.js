import styled from 'styled-components'

export const ProgressBar2Container = styled.div`
    width: 100%;
    padding: 26px 26px 10px 26px;
    
    .back-frame {
        width: 100%;
        height: 6px;
        background: rgba(255,255,255,0.2);

        position: relative;
        cursor: pointer;
    }

    .value-frame {
        position: absolute;

        left: 0px;
        top: 0px;
        width: ${props => (props.value - props.min) * 100 / (props.max - props.min)}%;
        height: 6px;
        background: #cf0;
    }

    .min-value {
        position: absolute;

        left: -24px;
        top: -18px;
        width: 48px;
        height: 16px;

        border-radius: 4px;
        background: #cf03;
        border: 1px solid #cf0;

        text-align: center;
        font-size: 10px;
        line-height: 16px;

        user-select: none;
    }

    .max-value {
        position: absolute;

        right: -24px;
        top: -18px;
        width: 48px;
        height: 16px;

        border-radius: 4px;
        background: #cf03;
        border: 1px solid #cf0;

        text-align: center;
        font-size: 10px;
        line-height: 16px;

        user-select: none;
    }

    .value {
        position: absolute;

        left: calc(${props => (props.value - props.min) * 100 / (props.max - props.min)}% - 24px);
        top: -18px;
        width: 48px;
        height: 16px;

        border-radius: 4px;
        background: #032e;
        border: 1px solid #0fc;

        text-align: center;
        font-size: 10px;
        line-height: 16px;

        user-select: none;
    }
`;
