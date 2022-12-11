import styled from 'styled-components'

export const RoadmapContentContainer = styled.div`
    display: flex;
    flex-direction: column;

    padding: 40px 80px;

    flex-gap: 100px;
    gap: 100px;

    .title {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 20px;
        /* identical to box height, or 83% */

        letter-spacing: 0.2em;
        text-transform: uppercase;

        color: #61F908;
    }

    .description {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 32px;
    }

    .segment-frame {
        display: grid;
        grid-template-columns: 1fr;

        .border-left-dot {
            border-left: 6px dashed #61F908 !important;
        }

        .segment-1 {
            border-left: 6px solid #61F908;

            display: flex;
            flex-direction: column;

            flex-gap: 10px;
            gap: 10px;

            position: relative;

            .circle-1 {
                position: absolute;
                z-index: 1;

                left: -16px;
                top: -13px;
                width: 26px;
                height: 26px;

                border: 4px solid #61F908;
                background: #fff;
                border-radius: 50%;
            }

            .circle-2 {
                position: absolute;
                z-index: 1;

                left: -13px;
                top: -10px;
                width: 20px;
                height: 20px;

                border: 4px solid #61F90860;
                background: #fff;
                border-radius: 50%;
            }

            .segment-title-frame {
                padding-left: 100px;

                position: relative;

                .line-1 {
                    position: absolute;

                    left: 0;
                    top: 0;
                    width: 100px;
                    height: 1px;

                    border-top: 2px solid #0f04;
                }

                .line-2 {
                    position: absolute;

                    left: 0;
                    top: 0;
                    width: 320px;
                    height: 1px;

                    border-top: 2px solid #0f04;
                }

                display: flex;
                flex-direction: row;

                .segment-title {
                    position: relative;
                    top: -20px;
                    height: fit-content;
                    
                    font-family: 'Rubik';
                    font-style: normal;
                    font-weight: 700;
                    font-size: 20px;
                    line-height: 24px;
                    /* identical to box height, or 120% */

                    text-transform: capitalize;
                    
                    span {
                        color: #61F908;
                    }

                    background: #191C25;
                    border-bottom: 4px solid #61F908;

                    padding: 8px 200px 8px 20px;
                }
            }

            .segment-content-frame {
                width: 100%;

                padding: 0px 0px 100px 100px;

                .segment-content {
                    position: relative;

                    .main-back {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                    }

                    .piece-back {
                        position: absolute;
                        left: 97.3%;
                        top: -2%;
                        width: 3.2%;
                        height: 26%;
                    }

                    display: flex;
                    flex-direction: row;

                    flex-gap: 10px;
                    gap: 10px;

                    .content-item {
                        flex: 1 1 0;

                        padding: 10px;

                        display: flex;
                        flex-direction: column;

                        flex-gap: 4px;
                        gap: 4px;

                        font-family: 'Rubik';
                        font-style: normal;
                        font-weight: 400;
                        font-size: 14px;
                        line-height: 160%;

                        opacity: 0.8;

                        .image-frame {
                            width: 100%;
                            min-width: 120px;
                            max-width: 160px;
                            height: 100%;
                            position: relative;

                            img {
                                position: absolute;

                                left: 0;
                                bottom: -10px;
                                width: 100%;
                                height: auto;
                            }
                        }
                    }
                }
            }
        }
    }
`
