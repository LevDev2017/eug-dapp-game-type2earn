import styled from 'styled-components'

export const LeaderboardPageContainer = styled.div`
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

        .green {
            color: #61F908 !important;
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

        .ranking-frame {
            display: flex;
            flex-direction: column;

            flex-gap: 6px;
            gap: 6px;

            overflow-x: hidden;
            overflow-y: auto;
        }
    }
`
