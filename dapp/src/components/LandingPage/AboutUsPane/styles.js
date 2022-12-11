import styled from 'styled-components'

export const AboutUsPaneContainer = styled.div`
    padding: 80px 40px;

    display: flex;
    flex-direction: row;
    align-items: center;

    .left-frame {
        flex: 1 1 50%;
        .video-frame {
            position: relative;

            width: 100%;
            min-height: 400px;
            background: #fff3;
            border-radius: 8px;

            .play-icon {
                position: absolute;

                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);

                i {
                    font-size: 40px;
                    color: #fff4;
                }
            }
        }
    }

    .right-frame {
        flex: 1 1 50%;

        padding: 40px;

        display: flex;
        flex-direction: column;

        flex-gap: 20px;
        gap: 20px;

        .green {
            color: #61f908;
        }

        .small {
            font-size: 20px;
            font-family: 'Rubik';
            font-weight: 500;
            line-height: 36px;

            text-transform: capitalize;
        }

        .mid {
            letter-spacing: 0.2em;
            font-size: 24px;
            font-family: 'Rubik';
            font-weight: 700;

            text-transform: uppercase;
        }

        .large {
            font-size: 36px;
            letter-spacing: 0.05em;
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 700;

            line-height: 130%;

            text-transform: uppercase;
        }
    }
`
