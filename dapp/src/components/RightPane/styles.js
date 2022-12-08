import styled from 'styled-components'

export const RightPaneContainer = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  padding: 0px 20px;

  transition: all .4ms ease-in;

  @media (max-width: 864px) {
    left: 0px;
    width: calc(100vw);
  }

  .section-frame {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 20px 0 30px;

    position: relative;
    z-index: 10;

    .button-frame {
      margin: 0px 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      max-width: 833px;
      flex-gap: 10px;
      gap: 10px;
  
      justify-content: left;
  
      font-weight: 600;
      letter-spacing: 2px;

      .site-load {
        font-size: 12px;
        color: white;
        cursor: pointer;
        font-weight: 400;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }

        span {
          padding-left: 6px;

          @media (max-width: 640px) {
            display: none;
          }
        }
      }

      .gap {
        flex: 1 1 0;
      }

      .connect-wallet {
        cursor: pointer;
        user-select: none;

        padding: 8px 16px;
        border-radius: 12px;
        background: linear-gradient(90deg,#7148d0 2.93%,#e03fa2 51.73%,#fa5245 93.9%);
        font-size: 12px;
        font-weight: 400;

        transition: all 0.2s ease-in-out;
        -webkit-transition: all 0.2s ease-in-out;

        position: relative;
        top: 0px;
        &:hover {
          top: -1px;
        }

        opacity: 1.0;
        &:active {
          opacity: 0.9;
        }

        ::before {
          position: absolute;
          content: '';
          left: 0;
          right: 0;
          top: 0;
          bottom: -1px;

          border-radius: 12px;
          background: #ccc;
          z-index: -1;
        }
      }

      .switch-network {
        font-size: 10px;
        font-weight: 400;

        cursor: pointer;
        user-select: none;

        display: flex;
        flex-direction: row;
        flex-gap: 6px;
        gap: 6px;
        align-items: center;

        .circle {
          background-color: #fff2;
          padding: 4px;
          border-radius: 50%;
        }

        span {
          &:hover {
            text-decoration: underline;
          }

          @media (max-width: 640px) {
            display: none;
          }
        }
      }

      .logout-wallet {
        cursor: pointer;
        user-select: none;

        padding: 8px 16px;
        border-radius: 12px;
        background: rgba(0,0,0,0.4);
        border: 1px solid rgba(255,255,255,0.2);
        font-size: 12px;
        font-weight: 400;

        transition: all 0.2s ease-in-out;
        -webkit-transition: all 0.2s ease-in-out;

        &:hover {
          background: rgba(0,0,0,0.2);
        }
      }

      .left-pane-button-frame {
        flex: 1 1 auto;

        .left-pane-button {
          @media (min-width: 864px) {
            display: none;
          }

          transition: all 0.2s ease-in-out;

          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: rgba(255,255,255,0.2);
          cursor: pointer;
  
          &:hover {
            background: rgba(255,255,255,0.25);
          }
  
          &:active {
            background: rgba(255,255,255,0.1);
          }
  
          position: relative;
  
          .mid-bar {
            position: absolute;
            top: 50%;
            left: 25%;
            width: 50%;
            border: 1px solid #ccc;
          }
  
          .mid-bar:before,
          .mid-bar:after {
            display: block;
            content: "";
            width: 100%;
            height: 2px;
            background: #ccc;
            position: absolute;
          }
          
          .mid-bar:before { top: -5px; }
          .mid-bar:after { top: 3px; }
        }
      }
    }
  }

  .another-small-group {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .route-frame {
    position: relative;
    height: fit-content;
  }

  .route-transition-element {
    width: 100%;
    padding-bottom: 20px;

    .wallet-connect-frame {
      text-align: center;
      font-size: 24px;
    }
  }

  .fade-enter {
    opacity: 0;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }
`;
