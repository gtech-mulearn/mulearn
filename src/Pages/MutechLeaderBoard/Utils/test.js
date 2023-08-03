const done = /\[done\]/i
const now = new Date()
export default function test(List1, List2) {
    const overall = {}, monthly = {}
    const { Members, List } = processData(List2, List1)
    // eslint-disable-next-line array-callback-return
    List.map((work) => {
        const date = new Date(work.Date)
        const notToday = !(date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear())
        if (date < now && notToday) {
            // eslint-disable-next-line array-callback-return
            Members.map((member) => {
                initializeUser(overall, monthly, member)
                let works = work[member]
                if (works !== undefined && works.trim() !== '' && works.match(done)) {
                    let workList = work[member].toLowerCase().replace(done, '').trim().split('\n')
                    overall[member].streak++
                    overall[member].score += overall[member].streak < 5 ? overall[member].streak * 10 : 50 + (10 * workList.length)
                    if (overall[member].streak > overall[member].maxStreak)
                        overall[member].maxStreak = overall[member].streak
                    if (date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
                        monthly[member].streak++
                        monthly[member].score += monthly[member].streak < 5 ? monthly[member].streak * 10 : 50 + (10 * workList.length)
                        if (monthly[member].streak > monthly[member].maxStreak)
                            monthly[member].maxStreak = monthly[member].streak
                    }
                }
                else {
                    overall[member].streak = 0
                    if (date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
                        monthly[member].streak = 0
                    }
                }
            })
        }
    })

    return { overall: sortScore(overall), monthly: sortScore(monthly) }
}

function sortScore(PeopleScoreBoard) {
    const scoreSet = Object.values(PeopleScoreBoard)
    const scoreBoard = scoreSet.sort((a, b) => {
        if (a.maxStreak === b.maxStreak) {
            if (a.streak === b.streak) {
                if (a.score === b.score)
                    return a.score - b.score
                return a.streak - b.streak
            }
            return b.score - a.score
        }
        return b.maxStreak - a.maxStreak
    })
    return scoreBoard
}
function initializeUser(overall, monthly, member) {
    if (overall[member] === undefined) {
        overall[member] = {
            name: member,
            streak: 0,
            score: 0,
            maxStreak: 0,
            // report: []
        }
        monthly[member] = {
            name: member,
            streak: 0,
            score: 0,
            maxStreak: 0,
            // report: []
        }
    }
}
function processData(List2, List1) {
    if (List2.length >= 1 && List1.length >= 1) {
        return {
            Members: Array.from(new Set([...Object.keys(List2[0]).slice(1,), ...Object.keys(List1[0]).slice(1,)])),
            List: [...List1, ...List2]
        }
    }
    return { Members: [], List: [] }
}
