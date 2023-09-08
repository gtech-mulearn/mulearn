import React from 'react'
import styles from './FAQ.module.css'

const Faq = () => {
    const faqArray = [
        {
            question: "Who can participate in Learning fest?",
            answer: "Anyone can particpate in Learrning Fest without any restrictions.",
        },
        {
            question: "How can I communicate with the organisers? ",
            answer: "We have got you covered. Whatsapp groups will be formed to communicate with organisers. For queries: 95395 34439,85905 71947",
        },
        {
            question: "Is Learning Fest self paced ?",
            answer: "You are in for a treat!Learning Festoffers both self-paced learning and exciting mentoring sessions to cater your needs.",
        }
    ];
    return (
        <div className={styles.faqContainer}>
            <div className={styles.screw}></div>
            <div className={styles.faqs}>
                <h1>FAQ</h1>
                <div className={styles.faq}>
                    {faqArray.map((item, i) => {
                        return (
                            <div key={i} className={styles.questionContainer}>
                                <details>
                                    <summary>
                                        {item.question}

                                    </summary>
                                    <p>{item.answer}</p>
                                </details>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={styles.screw}></div>
        </div>

    )
}

export default Faq