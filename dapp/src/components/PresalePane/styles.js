import styled from 'styled-components'

export const PresalePaneContainer = styled.div`
  width: 100%;
  height: 100%;

  overflow: hidden;
  overflow-y: auto;

  display: flex;
  flex-direction: row;
  justify-content: center;

  .info-frame {
    background: #30392c;
    border: 1px solid #fff1;
    overflow: hidden;

    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);

    border-radius: 12px;

    filter: drop-shadow(2px 2px 4px #111);
  }

  .info-frame-1 {
    background: #56532060;
    border: 1px solid #fff1;
    overflow: hidden;

    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);

    border-radius: 12px;

    filter: drop-shadow(2px 2px 4px #111);
  }

  .top-frame {
    margin: 10px 20px;

    display: flex;
    flex-direction: column;
    flex-gap: 20px;
    gap: 20px;

    width: 100%;
    max-width: 833px;

    .subtitle {
      text-align: center;
      font-family: 'Poppins';
      font-size: 32px;

      sup {
        font-size: 16px;
      }
    }

    .admin-panel-label {
      text-align: center;
      font-family: 'Poppins';
      font-size: 24px;

      sup {
        font-size: 16px;
      }
    }

    .admin-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 8px;
      row-gap: 8px;

      @media (max-width: 576px) {
        grid-template-columns: 1fr;
      }
    }

    .summary-frame {
      display: flex;
      flex-wrap: wrap;

      flex-gap: 8px;
      gap: 8px;

      .p2-frame {
        flex: 1 1 45%;
        padding: 20px;
        margin: 8px;

        display: flex;
        flex-direction: column;
        justify-content: center;

        @media (max-width: 1076px) {
          flex: 1 1 90%;
        }
      }

      .p3-frame {
        flex: 1 1 30%;
        padding: 12px;
        margin: 4px;

        display: flex;
        flex-direction: column;
        justify-content: center;

        @media (max-width: 1076px) {
          flex: 1 1 90%;
        }
      }

      .padding-20 {
        padding: 20px;
      }

      .padding-10 {
        padding: 10px;
      }

      .margin-8 {
        margin: 8px;
      }

      .p1-frame {
        flex: 1 1 90%;

        display: flex;
        flex-direction: column;
        justify-content: center;

        flex-gap: 10px;
        gap: 10px;
      }

      .small-description {
        font-size: 12px;
        font-weight: 400;

        .description-emphasis {
          font-size: 14px;
          padding-bottom: 10px;
          color: #fc0;
          text-align: center;
          line-height: 150%;

          a {
            font-size: 14px;
            text-decoration: none;
            color: #0cf;
          }
        }

        span {
          font-size: 14px;
          color: rgb(182,234,26);
          a {
            font-size: 14px;
            text-decoration: none;
            color: rgb(182,234,26);
          }
        }
      }

      .row-center {
        justify-content: center;
      }

      .row-1 {
        display: flex;
        flex-direction: row;
        align-items: center;

        flex-gap: 10px;
        gap: 10px;
      }

      .row-2 {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 4px 0px;

        flex-gap: 8px;
        gap: 8px;
      }

      .grid-4 {
        width: fit-content;
        display: grid;
        align-items: center;
        grid-template-columns: repeat(4, max-content);
        row-gap: 8px;
        column-gap: 10px;
      }

      .grid-2 {
        width: 100%;
        display: grid;
        align-items: center;
        grid-template-columns: max-content 1fr;
        row-gap: 8px;
        column-gap: 10px;
      }

      .sale-label {
        font-size: 12px;
      }

      .sale-price-label {
        font-size: 12px;
        color: #0cf;
      }

      .sale-type {
        padding: 8px 12px;
        border-radius: 18px;
        background: #fff1;
        font-size: 12px;

        user-select: none;
        cursor: pointer;
      }

      .sale-type-selected {
        background: #0003! important;
        color: #0fc;
        font-size: 14px! important;
      }

      .total-sold-label, .claim-label {
        font-size: 14px;
        white-space: nowrap;
      }

      .ref-unit, .equal-op, .real-unit {
        font-size: 12px;
      }

      .claim-amount-input {
        border: none;
        outline: none;

        padding: 4px 10px;
        border-radius: 12px;

        background: #fffa;
        color: black;

        max-width: 100px;
      }

      .target-address-input {
        border: none;
        outline: none;

        padding: 4px 10px;
        border-radius: 12px;

        background: #fffa;
        color: black;
      }

      .claim-button {
        background: linear-gradient(176deg, #17c139, #28e868 70%, #e5f57a);
        border-radius: 8px;
        text-align: center;
        color: black;
        font-size: 16px;
        padding: 4px 8px;
        user-select: none;
        cursor: pointer;
        transition: all .2s ease-in-out;

        &:hover {
          transform: scale(1.02, 1.02);
        }

        &:active {
          background: linear-gradient(176deg, #0e6c18, #144432 70%, #186578);
          transform: scale(0.98, 0.98);
          color: #ccc;
        }
      }

      .plot-name {
        border: none;
        outline: none;
        padding: 4px 8px;
        border-radius: 8px;
        background: #ccc;
        font-size: 16px;
        max-width: 120px;
      }

      .fix-error {
        background: #fff1;
        border-radius: 8px;
        text-align: center;
        font-size: 14px;
        padding: 4px 8px;
      }

      .custom-info {
        font-size: 12px;
        line-height: 150%;

        .coin-balance-frame span {
          color: #0ff;
          font-size: 14px;
        }
      }

      .black-bg-10 {
        background: #0002;
        border-radius: 10px;
      }

      .real-amount {
        font-size: 16px;
        color: #0fc;
      }

      .flip-time-prefix {
        font-size: 14px;
      }

      .token-contract {
        width: 100%;
        text-align: center;
        cursor: pointer;
        font-size: 16px;
        padding: 8px 0px;

        &:hover {
          text-decoration: underline;
        }
      }

      .token-address {
        color: white;
        width: 100%;
        font-size: 14px;
        font-weight: 800;
        text-align: center;

        user-select: none;

        background: linear-gradient(275.5deg,#07befa 10.87%,#754dc8 47.12%,#f53d84 71.89%,#fe7f32 99.3%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        fill: #7148d0;
        color: #7148d0;

        transition: all 0.2s ease-in-out;
        transform: scale(1.0, 1.0);

        &:hover {
          transform: scale(1.2, 1.2);
        }
      }
    }
  }
`;

