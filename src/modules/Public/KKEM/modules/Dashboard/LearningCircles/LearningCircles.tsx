import React, { useEffect, useState } from 'react'
import styles from './LearningCircles.module.scss'
import { getLCDashboard, getLCReport } from './services/LearningCircles';
import { ResponseType, UserDetail } from './services/types';

const LearningCircles = () => {
    const [LcCounts, setLcCounts] = useState<ResponseType>({ lc_count: 0, total_enrollment: 0, circle_count_by_ig: [] })
    const [LcReport, setLcReport] = useState<UserDetail[]>([])

    useEffect(() => {
        getLCDashboard(setLcCounts);
        getLCReport({ setLcReport });
    }, [])

    useEffect(() => {
        console.log(LcCounts);
        console.log(LcReport);
    }, [])


    return (
        <div>LearningCircles</div>
    )
}

export default LearningCircles