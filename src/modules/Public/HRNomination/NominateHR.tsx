import React, { useState } from "react";
import HomeNav from "@/modules/Common/HomeNav/HomeNav";
import Footer from "@/modules/Common/Footer/Footer";
import styles from "./NominateHR.module.css";
import axios from "axios";

const BACKEND_API_URL = import.meta.env.VITE_HR_FORM_API_URL;

const initialState = {
  companyName: "",
  hrName: "",
  hrPhone: "",
  hrEmail: "",
  nominator: "",
  preferredTimeSlot: "",
};

const NominateHR: React.FC = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs: any = {};
    if (!form.companyName) errs.companyName = "Required";
    if (!form.hrName) errs.hrName = "Required";
    if (!form.hrPhone) errs.hrPhone = "Required";
    else if (!/^\d{10}$/.test(form.hrPhone)) errs.hrPhone = "Enter 10 digit number";
    if (!form.hrEmail) errs.hrEmail = "Required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.hrEmail)) errs.hrEmail = "Invalid email";
    if (!form.nominator) errs.nominator = "Required";
    if (!form.preferredTimeSlot) errs.preferredTimeSlot = "Required";
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitting(true);
      const { companyName, hrName, hrPhone, hrEmail, nominator, preferredTimeSlot } = form;
      try {
        await axios.post(BACKEND_API_URL, {
          companyName,
          hrName,
          hrPhone,
          hrEmail,
          nominator,
          preferredTimeSlot
        });
        setSubmitted(true);
        setForm(initialState);
      } catch (error) {
        alert("There was an error submitting the form. Please try again.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <>
      <HomeNav />
      <div className={styles.pageContainer}>
        <div className={styles.container}>
          <h2 className={styles.heading}>Nominating HR from Companies</h2>
          <h4 className={styles.subheading}>μLearn Industry Engagement</h4>
          {submitted && <div className={styles.success}>Nomination submitted!</div>}
          <form onSubmit={handleSubmit} noValidate className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                className={styles.input}
                disabled={submitting}
              />
              {errors.companyName && <div className={styles.error}>{errors.companyName}</div>}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Company HR Name</label>
              <input
                type="text"
                name="hrName"
                value={form.hrName}
                onChange={handleChange}
                className={styles.input}
                disabled={submitting}
              />
              {errors.hrName && <div className={styles.error}>{errors.hrName}</div>}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Company HR Phone Number</label>
              <input
                type="tel"
                name="hrPhone"
                value={form.hrPhone}
                onChange={handleChange}
                className={styles.input}
                maxLength={10}
                disabled={submitting}
              />
              {errors.hrPhone && <div className={styles.error}>{errors.hrPhone}</div>}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Company HR Email</label>
              <input
                type="email"
                name="hrEmail"
                value={form.hrEmail}
                onChange={handleChange}
                className={styles.input}
                disabled={submitting}
              />
              {errors.hrEmail && <div className={styles.error}>{errors.hrEmail}</div>}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Name of the Person Nominating</label>
              <input
                type="text"
                name="nominator"
                value={form.nominator}
                onChange={handleChange}
                className={styles.input}
                disabled={submitting}
              />
              {errors.nominator && <div className={styles.error}>{errors.nominator}</div>}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Preferred Time Slot for Meeting</label>
              <select
                name="preferredTimeSlot"
                value={form.preferredTimeSlot}
                onChange={handleChange}
                className={styles.input}
                disabled={submitting}
                required
              >
                <option value="">Select a time slot</option>
                <option value="22-07-2025 5:00pm">22-07-2025 5:00pm</option>
                <option value="25-07-2025 5:00pm">25-07-2025 5:00pm</option>
              </select>
              {errors.preferredTimeSlot && <div className={styles.error}>{errors.preferredTimeSlot}</div>}
            </div>
            <button type="submit" className={styles.submitBtn} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NominateHR; 