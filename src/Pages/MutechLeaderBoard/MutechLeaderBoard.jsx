import React, { useState, useEffect, useRef } from 'react'
import axios from "axios";
import Style from './MutechLeaderBoard.module.css'
import Navbar from '../../Components/Navbar/Navbar'
const MutechLeaderBoard = () => {
    const API = "https://opensheet.elk.sh/"
    const [data, setData] = useState([])
    const fetchOnce = useRef(false)
    const spreadsheetId = 'https://docs.google.com/spreadsheets/d/1gAX7dGO5KFAOiPQfoo8vb22RbwtmjZ4Y1tslcULkrXE/edit#gid=564307130'
    const sheet = "CommitBox"
    const now = new Date()
    const month = now.getMonth()
    const today = now.getDate()
    const [scoreBoard, setScoreBoard] = useState({})
    useEffect(() => {
        if (spreadsheetId.length >= 83 && !fetchOnce.current) {
            try {
                axios.get(`${API + spreadsheetId.split("/")[5]}/${sheet}`)
                    .then(res => res.data)
                    .then(result => {
                        setData(result)
                    })
            }
            catch (err) {
                console.error(err)
            }
        }
    }, [])
    useEffect(() => {
        if (fetchOnce.current && data.length > 0) {
            const PeopleScoreBoard = {}
            const people = []
            for (let work of data) {
                // eslint-disable-next-line array-callback-return
                Object.keys(work).slice(1,).map((key, index) => {
                    if (!people.includes(key)) {
                        people.push(key)
                        PeopleScoreBoard[key] = { name: key, score: 0, streak: 0, longestStreak: 0, overallStreak: 0 }
                    }
                })
                const da = new Date(work.Date)
                if (da.getMonth() === month && da.getDate() < today) {
                    for (let person of people) {
                        if (work[person] !== null && work[person] !== undefined) {
                            if (!work[person].toLowerCase().includes('not available') && !work[person].toLowerCase().includes('no task') && work[person].trim() !== ('')) {
                                let x = work[person].split('\n')
                                let score = 0
                                if (work[person].toLowerCase().includes('done')) {
                                    score = 10
                                }
                                else if (work[person].toLowerCase().includes('working')) {
                                    score = 5
                                }
                                PeopleScoreBoard[person].streak += score ? 1 : 0
                                PeopleScoreBoard[person].score += x.length * score + (PeopleScoreBoard[person].streak <= 5 ? (PeopleScoreBoard[person].streak - 1) * score : 50)
                                if (person === "Ansan")
                                    console.log(score, x.length * score, PeopleScoreBoard[person].streak, (PeopleScoreBoard[person].streak - 1) * score)
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
            sortScore(PeopleScoreBoard)
        }
        fetchOnce.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])
    function sortScore(PeopleScoreBoard) {
        const scoreSet = Object.values(PeopleScoreBoard)
        const scoreBoard = scoreSet.sort((a, b) => {
            return b.score - a.score
        })
        setScoreBoard(scoreBoard)
    }
    function setLongestStreak(PeopleScoreBoard, person) {
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
                                <th >Rank</th>
                                <th >Name</th>
                                <th >Score</th>
                                <th>Monthly Streak</th>
                                <th>Overall Streak</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(scoreBoard).map((score, index) => {
                                return (
                                    <tr key={index}>
                                        <td >{index + 1}</td>
                                        <td >{score.name}</td>
                                        <td >{score.score}</td>
                                        <td>{score.streak}</td>
                                        <td><div className={Style.clear}>{score.longestStreak}</div></td>
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