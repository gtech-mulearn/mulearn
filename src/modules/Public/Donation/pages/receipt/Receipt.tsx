import { useState,useEffect } from 'react'
import logo from '../../assets/receipt/logo.svg'
import mulearn from '../../assets/receipt/logo.png'
import vector from '../../assets/receipt/vector.svg'
import bigLogo from '../../assets/receipt/group-75.svg'
import styles from './Receipt.module.css';

interface donation_data {
    amount: number,
    name: string,
    company: string|null,
    email: string,
    mobile: number,
    pan: string
}
interface pdf_data {
    Amount: number,
    Name: string,
    Company: string|null,
    Email: string,
    Payment_method: string,
    payment_id:string
}
const defaultPdfData: pdf_data = {
    Amount: 0, 
    Name: '', 
    Email: '',
    Company: null, 
    Payment_method: '',
    payment_id:''
};

const defaultDonationData: donation_data = {
    amount: 0,
    name: '',
    company: null,
    email: '',
    mobile: 0,
    pan: '',
};

function Receipt() {

    const [pdfData, setpdfData] = useState<pdf_data>(defaultPdfData)
    const [donationData, setdonationData] = useState<donation_data>(defaultDonationData)

    const formatDate = (date:any) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const strMinutes = minutes < 10 ? '0'+minutes : minutes;
        
        return `${day}${month},${year},${hours}:${strMinutes}${ampm}`;
      }
      

    useEffect(() => {
        const data = localStorage.getItem("pdfData") as string;
        const d_data = localStorage.getItem("donationData") as string;
        const setData = async () => {
            if(data && d_data){
                let success_data = await JSON.parse(data)
                let donation_data = await JSON.parse(d_data)
                setdonationData(donation_data)
                setpdfData(success_data.response)
            }
        }
        setData()
    },[])
    return (
        <div className={styles.receiptContainer}>
            <div className={styles.recipt}>
                <img className={styles['vector-icon']} alt="" src={vector} />

                <section className={styles['frame-parent']}>
                    <div className={styles['frame-group']}>
                        <header className={styles['frame-container']}>
                            <div className={styles['frame-wrapper']}>
                                <div className={styles['frame-div']}>
                                    <div className={styles['learn-wrapper']}>
                                        <img
                                            className={styles['learn-icon']}
                                            loading="lazy"
                                            alt=""
                                            src={mulearn}
                                        />
                                    </div>
                                    <div className={styles['contribution-sum']}>Contribution Receipt</div>
                                </div>
                            </div>
                            <div className={styles['frame-parent1']}>
                                <div className={styles['frame-parent2']}>
                                    <div className={styles['rahul-nath-wrapper']}>
                                        <b className={styles['rahul-nath']}>Name:{pdfData.Name}</b>
                                    </div>
                                    <div className={styles['rrahu']}>+91 {donationData.mobile} <br /> {pdfData.Email}</div>
                                </div>
                                <div className={styles['may20240649-wrapper']}>
                                    <div className={styles['may20240649']}>
                                        {
                                            //to print the date and time in this format 11May,2024,06:49PM
                                            formatDate(new Date())
                                        }
                                    </div>
                                </div>
                            </div>
                        </header>
                        <div className={styles['background-parent']}>
                            <div className={styles['background']}></div>
                            <div className={styles['frame-parent3']}>
                                <div className={styles['beneficiaryfund-wrapper']}>
                                    <div className={styles['beneficiaryfund']}>BENEFICIARY INFO</div>
                                </div>
                                <div className={styles['frame-parent4']}>
                                    <div className={styles['swami-vivekanand-wrapper']}>
                                        <h1 className={styles['swami-vivekanand']}>µLearn Foundation</h1>
                                    </div>
                                    <div className={styles['b-207pacific-es']}>
                                        Gtech Lobby Area Technopark Trivandrum,
                                        Kerala, India
                                    </div>
                                </div>
                            </div>
                            <div className={styles['wrapper']}>
                                <img className={styles['icon']} loading="lazy" alt="" src={logo} />
                            </div>
                        </div>
                    </div>
                    <div className={styles['frame-parent5']}>
                        <div className={styles['frame-parent6']}>
                            <div className={styles['background-group']}>
                                <div className={styles['background1']}></div>
                                <div className={styles['detailsofcontrib-wrapper']}>
                                    <b className={styles['detailsofcontrib']}>DETAILS OF CONTRIBUTION</b>
                                </div>
                            </div>
                            <img
                                className={styles['frame-child']}
                                loading="lazy"
                                alt=""
                                src={bigLogo}
                            />

                            <div className={styles['background-container']}>
                                <div className={styles['contribution-amo-parent']}>
                                    <div className={styles['contribution-amo']}>Contribution Amount</div>
                                    <div className={styles['div']}>₹{pdfData.Amount}</div>
                                </div>
                                <div className={styles['mode-of-payment-parent']}>
                                    <div className={styles['mode-of-payment']}>Mode of Payment</div>
                                    <div className={styles['upi']}>{pdfData.Payment_method}</div>
                                </div>
                                <div className={styles['paytm-order-id-parent']}>
                                    <div className={styles['paytm-order-id']}>Razorpay Order ID</div>
                                    <div className={styles['div1']}>{pdfData.payment_id}</div>
                                </div>
                                <div className={styles['amount-paid-parent']}>
                                    <div className={styles['amount-paid']}>Amount Paid</div>
                                    <div className={styles['div2']}>₹{pdfData.Amount}</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles['background-parent1']}>
                            <div className={styles['background6']}></div>
                            <div className={styles['detailsofcontrib1']}>DETAILS OF CONTRIBUTOR</div>
                            <div className={styles['rahul-parent']}>
                                <b className={styles['rahul']}>Name:{pdfData.Name}</b>
                                <div className={styles['pankollam']}>PAN:{donationData.pan}</div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles['frame-section']}>
                    <div className={styles['vector-parent']}>
                        <div className={styles['the-contribution']}>
                            The contribution made to is eligible for µLearn claiming exemptions
                            under Section 80(G)of the Income Tax Act, 1961 vide Registration
                            No.- AAQCM8688KF20231 by the Office of the Income Tax
                            Department（Dehradun)valid from 01-12-2023
                        </div>
                    </div>
                    <div className={styles['all-donations-are-voluntary-a-wrapper']}>
                        <footer className={styles['all-donations-are']}>
                            **All donations are voluntary, as such any requests for refunds will
                            be considered on a case-by-case basis.
                        </footer>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Receipt;