import styled from 'styled-components'
import BackgroundImage from '../../assets/images/background.jpg'

export const HomeContainer = styled.div`
  width: 100vw;
  height: fit-content;

  position: relative;
  color: #fff;

  .center-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100vh;
  }

  .not-launched-label {
    font-size: 36px;
    text-align: center;
    animation: label-flicker 4s linear infinite;
  }

  @keyframes label-flicker {
    0% {
      opacity: 1;
      transform: scale(1.04, 1.04);
    }
    50% {
      opacity: 0.4;
      transform: scale(1, 1);
    }
    100% {
      opacity: 1;
      transform: scale(1.04, 1.04);
    }
  }
`;

export const BackgroundImageContainer = styled.div`
  position: absolute;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  z-index: -100;
  overflow: hidden;

  .back1 {
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: -20;
    background-color: #181818;
    background-image: url(${BackgroundImage});
    background-repeat: no-repeat;
    background-position: center 0;
    background-size: cover;
    opacity: 0.2;
    color: #fff;
  }

  .motion-1 {
    position: fixed;
    width: 250px;
    height: 250px;
    left: 10%;
    top: 20%;
    background: linear-gradient(120deg, #b7eb3a, #ffc800);
    border-radius: 50%;
    opacity: 0.1;
    z-index: -10;
    filter: blur(10px);
    animation: move-1 12s ease-in-out infinite;

    @keyframes move-1 {
      0% {
        transform: translate(0px, 0px);
      }
      50% {
        transform: translate(40px, -40px);
      }
      100% {
        transform: translate(0px, 0px);
      }
    }
  }

  .motion-2 {
    position: fixed;
    width: 300px;
    height: 300px;
    left: 80%;
    top: 90%;
    background: linear-gradient(210deg, #b7eb3a, #ffc800);
    border-radius: 50%;
    opacity: 0.1;
    z-index: -10;
    filter: blur(10px);
    animation: move-1 12s ease-in-out infinite;

    @keyframes move-1 {
      0% {
        transform: translate(0px, 0px);
      }
      50% {
        transform: translate(-70px, -70px);
      }
      100% {
        transform: translate(0px, 0px);
      }
    }
  }

  .motion-3 {
    position: fixed;
    width: 600px;
    height: 600px;
    left: 50%;
    top: 50%;
    background: linear-gradient(210deg, #b7eb3a, #ffc800);
    border-radius: 50%;
    opacity: 0.2;
    z-index: -10;
    filter: blur(20px);
    animation: move-1 4s ease-in-out infinite;

    @keyframes move-1 {
      0% {
        transform: translate(-50%, -50%);
      }
      50% {
        transform: translate(calc(-50% - 80px), calc(-50% - 80px));
      }
      100% {
        transform: translate(-50%, -50%);
      }
    }
  }
`;

