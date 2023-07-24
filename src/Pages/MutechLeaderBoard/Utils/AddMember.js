function AddMember(work, people, PeopleScoreBoard,OverallScoreBoard) {
    // eslint-disable-next-line array-callback-return
    Object.keys(work).slice(1,).map((key, index) => {
        if (!people.includes(key)) {
            if (key !== "undefined") {
                people.push(key)
                PeopleScoreBoard[key] = createScoreboardEntry(key)
                OverallScoreBoard[key]= createScoreboardEntry(key)
            }
        }
    })

}
function createScoreboardEntry(name) {
    return {
      name,
      score: 0,
      streak: 0,
      longestStreak: 0,
      overallStreak: 0,
      dailyMap:[]
    };
  }
export default AddMember

