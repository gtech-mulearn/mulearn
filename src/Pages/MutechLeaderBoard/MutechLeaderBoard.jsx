import React, { useState, useEffect, useRef } from 'react'
import axios from "axios";
import Style from './MutechLeaderBoard.module.css'
import Navbar from '../../Components/Navbar/Navbar'
import CountWorks from './Utils/CountWorks';
import OpenElkAPICall from './Utils/OpenElkAPICall';
import AddMember from './Utils/AddMember';
const MutechLeaderBoard = () => {
    const [data, setData] = useState([])
    const fetchOnce = useRef(false)
    const spreadsheetId = 'https://docs.google.com/spreadsheets/d/1gAX7dGO5KFAOiPQfoo8vb22RbwtmjZ4Y1tslcULkrXE/edit#gid=564307130'
    const sheet = "CommitBox"
    const now = new Date()
    const month = now.getMonth()
    const today = now.getDate()
    const [scoreBoard, setScoreBoard] = useState({})
    const [overAllScore, setOverallScore] = useState({})
    useEffect(() => {
        if (!fetchOnce.current) {
            OpenElkAPICall(spreadsheetId, sheet, setData)
        }
    }, [])
    useEffect(() => {
        if (fetchOnce.current && data.length > 0) {
            const PeopleScoreBoard = {}
            const people = []
            for (let work of data) {
                AddMember(work, people, PeopleScoreBoard, overAllScore)
                const da = new Date(work.Date)
                if (da.getMonth() === month && da.getDate() < today) {
                    for (let person of people) {
                        if (work[person] !== null && work[person] !== undefined) {
                            if (work[person].toLowerCase().includes('done')) {
                                let x = work[person].split('\n'), score = 10
                                let count = CountWorks(x)
                                PeopleScoreBoard[person].streak += 1
                                PeopleScoreBoard[person].score += count * score + (PeopleScoreBoard[person].streak <= 5 ? (PeopleScoreBoard[person].streak - 1) * score : 50)
                            }
                            else {
                                PeopleScoreBoard[person].streak = 0
                            }
                        }
                    }
                }
                for (let person of people) {
                    if (work[person] !== null && work[person] !== undefined) {
                        PeopleScoreBoard[person].overallStreak += 1
                        setLongestStreak(PeopleScoreBoard, person)
                    }
                    else {
                        setLongestStreak(PeopleScoreBoard, person)
                        PeopleScoreBoard[person].overallStreak = 0
                    }
                }
            }
            setScoreBoard(sortScore(PeopleScoreBoard))
            setOverallScore(sortScore(overAllScore))
        }
        fetchOnce.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])
    function sortScore(PeopleScoreBoard) {
        const scoreSet = Object.values(PeopleScoreBoard)
        const scoreBoard = scoreSet.sort((a, b) => {
            if (a.streak === b.streak)
                return b.score - a.score
            return b.streak - a.streak
        })
        return scoreBoard
    }
    function setLongestStreak(PeopleScoreBoard, person, overAllScore) {
        if (PeopleScoreBoard[person].overallStreak > PeopleScoreBoard[person].longestStreak)
            PeopleScoreBoard[person].longestStreak = PeopleScoreBoard[person].overallStreak
    }
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
                                <th className={Style.th}>Monthly Streak</th>
                                <th className={Style.th}>Monthly Score</th>
                                <th className={Style.th}>Overall Streak</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(scoreBoard).map((score, index) => {
                                return (
                                    <tr key={index}>
                                        <td className={Style.td}>{index + 1}</td>
                                        <td className={Style.td}><div className={Style.name}>{score.name}</div></td>
                                        <td className={Style.td}>{score.streak}</td>
                                        <td className={Style.td}>{score.score}</td>
                                        <td className={Style.td}>
                                            <div className={Style.clear}>{score.longestStreak}</div></td>
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