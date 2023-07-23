
const checkIfValid = (value) => {
    if (!value.toLowerCase().includes('not done') && value.toLowerCase().includes('done'))
        return true
    return false
}






function setLongestStreak(PeopleScoreBoard, person, overAllScore) {
    if (PeopleScoreBoard[person].overallStreak > PeopleScoreBoard[person].longestStreak)
        PeopleScoreBoard[person].longestStreak = PeopleScoreBoard[person].overallStreak
}