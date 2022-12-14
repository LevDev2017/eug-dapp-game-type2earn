import styled from 'styled-components'

import TournamentBack1PNG from '../../assets/images/tournament-back-1.png'

export const TournamentMatchPageContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;

    .right-area {
        flex: 1 1 0;

        position: relative;

        width: 90%;

        display: flex;
        flex-direction: column;
        flex-gap: 40px;
        gap: 40px;

        padding: 20px;

        .row-frame {
            display: flex;
            flex-direction: row;

            flex-gap: 20px;
            gap: 20px;
        }

        .col-frame {
            display: flex;
            flex-direction: column;

            flex-gap: 20px;
            gap: 20px;
        }

        .no-gap {
            flex-gap: 0px !important;
            gap: 0px !important;
        }

        .gap-40 {
            flex-gap: 40px !important;
            gap: 40px !important;
        }

        .align-center {
            align-items: center;
        }

        .justify-center {
            justify-content: center;
        }

        .variable-item {
            flex: 1 1 0;
        }

        .frame-1 {
            .label-frame {
                .big-label {
                    font-family: 'Rubik';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 40px;
                    line-height: 60px;
                    text-transform: uppercase;
                }

                .small-label {
                    font-family: 'Rubik';
                    font-style: normal;
                    font-weight: 700;
                    font-size: 20px;
                    line-height: 24px;
                    /* identical to box height */

                    text-transform: capitalize;
                }
            }
        }

        .category-label {
            font-size: 20px;
            text-transform: uppercase;
            text-decoration: none;

            color: white;

            cursor: pointer;
            user-select: none;

            transition: all .1s ease-in-out;

            &:hover {
                transform: translate(-1px, -1px);
            }

            &:active {
                transform: translate(0, 0);
            }

            .selected {
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, rgba(97, 249, 8, 0) 0%, #61F908 49.48%, rgba(97, 249, 8, 0) 100%);
                transform: scale(130%, 100%);
                // border: 2px solid;
                // border-image-source: linear-gradient(90deg, rgba(97, 249, 8, 0) 0%, #61F908 49.48%, rgba(97, 249, 8, 0) 100%);
            }
        }

        .green {
            color: #61F908;
        }
    }
`
