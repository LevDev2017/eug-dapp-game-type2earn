import styled from 'styled-components'

export const DocViewContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;

  overflow-x: hidden;
  overflow-y: auto;

  background-color: #0008;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);

  display: flex;
  flex-direction: row;
  justify-content: center;

  z-index: 100;

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

      margin-top: 60px;

      position: relative;

      .close {
        position: absolute;
        top: 0;
        right: 0;
        width: 14px;
        height: 14px;

        font-size: 14px;
        cursor: pointer;
      }
    }

    .summary-frame {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      flex-gap: 20px;
      gap: 20px;
    }

    .pdf-frame {
      font-size: 12px;
      height: fit-content;

      .react-pdf__Document {
        display: flex;
        flex-direction: column;

        flex-gap: 20px;
        gap: 20px;

        .react-pdf__Page {
          .react-pdf__Page__canvas {
            border-radius: 12px;
            width: 100%! important;
            height: 100%! important;
          }
        }
      }
    }
  }
`;
