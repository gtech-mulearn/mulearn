import React, { useState, useEffect, useCallback } from 'react'
import Style from './MutechLeaderBoard.module.css'
import Navbar from '../../Components/Navbar/Navbar'
import OpenElkAPICall from './Utils/OpenElkAPICall';
import test from './Utils/test';
const MutechLeaderBoard = () => {
    const [data, setData] = useState([])
    const [oldData, setOldData] = useState([])
    const [list, setList] = useState({ overall: [], monthly: [] })
    const spreadsheetLink = 'https://docs.google.com/spreadsheets/d/1gAX7dGO5KFAOiPQfoo8vb22RbwtmjZ4Y1tslcULkrXE/edit#gid=564307130'
    const sheet = "CommitBox", oldSheet = "Old Commit Box"
    const now = new Date()
    useEffect(() => {
        OpenElkAPICall(spreadsheetLink, sheet, setData)
        OpenElkAPICall(spreadsheetLink, oldSheet, setOldData)
    }, [])
    const callTest = useCallback(() => test(oldData, data), [oldData, data])
    useEffect(() => {
        if (data.length > 0 && oldData.length > 0) {
            setList(callTest(oldData, data))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.length, oldData.length])
    return (
        <>
            <Navbar />
            <div className={Style.container}>

                <div className={Style.table}>
                    <h1 className={Style.h1}>µTech Commit Leaderboard</h1>

                    <h1 className={Style.h1}>{now.toLocaleString('en-US', { month: 'long' })} {now.toLocaleString('en-US', { year: 'numeric' })}</h1>

                    <table className={Style.tableContainer} >
                        <thead>
                            <tr>
                                <th className={Style.th}>Rank</th>
                                <th className={Style.th}><div className={Style.name}>Name</div></th>
                                <th className={Style.th}>Max Streak</th>
                                <th className={Style.th}>Current Streak</th>
                                <th className={Style.th}>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.monthly.map((score, index) => {
                                return (
                                    <tr key={index}>
                                        <td className={Style.td}>{index + 1}</td>
                                        <td className={Style.td}><div className={Style.name}>{score.name}</div></td>
                                        <td className={Style.td}>{score.maxStreak}</td>
                                        <td className={Style.td}>{score.streak}</td>
                                        <td className={Style.td}>
                                            <div className={Style.clear}>{score.score}</div></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className={Style.table}>
                    <h1 className={Style.h1}>Overall</h1>
                    <h1 className={Style.h1}>Leaderboard</h1>

                    <table className={Style.tableContainer} >
                        <thead>
                            <tr>
                                <th className={Style.th}>Rank</th>
                                <th className={Style.th}><div className={Style.name}>Name</div></th>
                                <th className={Style.th}>Max Streak</th>
                                <th className={Style.th}>Current Streak</th>
                                <th className={Style.th}>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.overall.map((score, index) => {
                                return (
                                    <tr key={index}>
                                        <td className={Style.td}>{index + 1}</td>
                                        <td className={Style.td}><div className={Style.name}>{score.name}</div></td>
                                        <td className={Style.td}>{score.maxStreak}</td>
                                        <td className={Style.td}>{score.streak}</td>
                                        <td className={Style.td}>
                                            <div className={Style.clear}>{score.score}</div></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default MutechLeaderBoard