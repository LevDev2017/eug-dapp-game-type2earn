import styled from 'styled-components'

export const HomePaneContainer = styled.div`
    position: relative;
    
    width: 100%;

    .video-frame {
        position: absolute;
        z-index: -1;

        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        
        display: flex;
        justify-content: center;

        .card-video {
            flex: 0 0 100%;
            object-fit: fill;
        }
    }

    .clip-align {
        display: flex;
        flex-direction: column;

        .gap {
            height: 108px;
        }

        .main-clips {
            display: flex;
            flex-direction: row;

            .left-clip {
                flex: 0 0 50%;
                .container {
                    position: relative;

                    width: 100%;
                    height: 100%;

                    .line-pos {
                        position: absolute;

                        left: 0%;
                        top: 10%;
                        width: 60%;
                        height: 40%;
                    }

                    .circle-pos {
                        position: absolute;

                        left: 0%;
                        top: 0%;
                        width: 100%;
                        height: 100%;
                    }

                    .image1 {
                        position: absolute;

                        left: 50%;
                        top: 10%;
                        width: 20%;
                        height: auto;
                    }

                    .image2 {
                        position: absolute;

                        left: 40%;
                        top: 20%;
                        width: 20%;
                        height: auto;
                    }
                }
            }

            .right-clip {
                flex: 0 0 50%;

                padding: 60px 20px 60px 0px;

                display: flex;
                flex-direction: column;
                flex-gap: 20px;
                gap: 20px;

                .welcome-text {
                    font-family: 'Chakra Petch';
                    font-weight: 700;
                    font-size: 100px;
                    line-height: 110%;
                    /* or 110px */

                    text-transform: capitalize;
                    white-space: nowrap;

                    .white {
                        color: #fff;
                    }

                    .green {
                        color: #61f908;
                    }
                }

                .description {
                    font-family: 'Rubik';
                    font-size: 20px;
                    font-weight: 500;
                    line-height: 36px;
                }

                .button-frame {
                    display: flex;
                    flex-direction: row;
                    flex-gap: 20px;
                    gap: 20px;

                    align-items: center;
                }
            }

            .clip-footer {

            }
        }
    }
`