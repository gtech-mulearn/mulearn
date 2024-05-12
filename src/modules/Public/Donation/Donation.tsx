import React, { useState, useRef } from "react";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import { submitForm } from "./services/api";
import styles from "./Donation.module.css";
import toast from "react-hot-toast";
const Donation = () => {
    const [amount, setAmount] = useState<number>();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState<number>();
    const [pan, setPan] = useState("");

    const callRazorpay = () => {
        if (!amount || !name || !email || !mobile || !pan) {
            toast.error("Please fill all the fields");
            return;
        }

        submitForm({
            amount: amount,
            name: name,
            email: email,
            mobile: mobile,
            pan: pan
        });
    };

    return (
        <>
            <MuModal
                isOpen={true}
                onClose={() => console.log("closed")}
                title="Donation"
                type="success"
                onDone={() => callRazorpay()}
            >
                <label htmlFor="amount">Amount{" in INR"}*</label>
                <input
                    type="number"
                    id="amount"
                    className={styles.inputStyles}
                    value={amount}
                    onChange={e => setAmount(Number(e.target.value))}
                    required
                />

                <label htmlFor="name">Name*</label>
                <input
                    type="text"
                    id="name"
                    className={styles.inputStyles}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />

                <label htmlFor="email">Email*</label>
                <input
                    type="email"
                    id="email"
                    className={styles.inputStyles}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="mobile">Mobile No*</label>
                <input
                    type="number"
                    id="mobile"
                    className={styles.inputStyles}
                    value={mobile}
                    onChange={e => setMobile(Number(e.target.value))}
                    required
                />
                <label htmlFor="pan">PAN*</label>
                <input
                    type="text"
                    id="pan"
                    className={styles.inputStyles}
                    value={pan}
                    onChange={e => setPan(e.target.value)}
                    required
                />
            </MuModal>
        </>
    );
};

export default Donation;
