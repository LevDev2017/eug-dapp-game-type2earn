import React, { useState } from 'react'

import {
    HistoryContainer
} from './styles'

import TTESVG from '../../../assets/svg/tte-logo.svg'

const History = (props) => {
    const [data, setData] = useState(
        [
            {
                date: '11/05/2022',
                id: 2365,
                mode: 'PvP',
                opponent: 'Johny Blaze',
                win: true,
                result: {
                    amount: 215,
                    token: 'tte'
                }
            },
            {
                date: '11/05/2022',
                id: 2365,
                mode: 'PvP',
                opponent: 'Johny Blaze',
                win: false,
                result: {
                    amount: 0,
                    token: 'tte'
                }
            },
            {
                date: '11/05/2022',
                id: 2365,
                mode: 'PvE',
                opponent: 'Computer #1',
                win: false,
                result: {
                    amount: 0,
                    token: 'tte'
                }
            },
            {
                date: '11/05/2022',
                id: 2365,
                mode: 'PvE',
                opponent: 'Computer #1',
                win: true,
                result: {
                    amount: 400,
                    token: 'tte'
                }
            }
        ]
    )
    return (
        <HistoryContainer>
            <div className='label'>history fight</div>
            <div className='content-frame'>
                <div className='content-grid'>
                    <div className='header'><span>Time</span></div>
                    <div className='header'><span>ID Match</span></div>
                    <div className='header'><span>Mode</span></div>
                    <div className='header'><span>Opponent</span></div>
                    <div className='header'><span>Status</span></div>
                    <div className='header end-item'><span>Result</span></div>
                    {
                        data.map((d, idx) => {
                            return (
                                <>
                                    <div key={`date-${idx}`} className='value'>{d.date}</div>
                                    <div key={`id-${idx}`} className='value'>{d.id}</div>
                                    <div key={`mode-${idx}`} className='value'>{d.mode}</div>
                                    <div key={`opponent-${idx}`} className='value'>{d.opponent}</div>
                                    <div key={`status-${idx}`}className={`value ${d.win === true? 'win': 'lose'}`}>{d.win === true? 'WIN': 'LOSE'}</div>
                                    <div key={`result-${idx}`} className='value end-item row-1'>
                                        <span>+{d.result.amount}</span>
                                        {
                                            d.result.token === 'tte'? 
                                                <img src={TTESVG} alt='' />
                                                :
                                                <></>
                                        }
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </HistoryContainer>
    )
}

export default History;
