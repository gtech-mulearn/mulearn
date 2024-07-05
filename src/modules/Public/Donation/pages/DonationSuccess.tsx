import { Link } from "react-router-dom";
import { useEffect,useState,useRef } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "./DonationSuccess.module.css";
import NotFound from "../../../../components/NotFound";
import Receipt from "./receipt/Receipt";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const DonationSuccess = () => {
    const pdfElement = useRef(null!);
    const pdfData = localStorage.getItem("pdfData") as string;

    const base64toBlob = (base64data: any) => {
        const byteString = atob(base64data.split(",")[1]);
        const mimeType = base64data.split(",")[0].split(":")[1].split(";")[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
        }
        return new Blob([arrayBuffer], { type: mimeType });
    };

    const downloadReceipt = () => {
        // const base64data = localStorage.getItem("pdfData");

        // if (base64data) {
        //     const pdfBlob = base64toBlob(base64data);
        //     const pdfUrl = URL.createObjectURL(pdfBlob);
        //     const link = document.createElement("a");
        //     link.href = pdfUrl;
        //     link.download = "downloaded-file.pdf";

        //     document.body.appendChild(link);
        //     link.click();

        //     document.body.removeChild(link);
        // } else {
        //     console.error("No PDF data found in localStorage.");
        // }

        //to handel the pdf data in the forndend
        html2canvas(pdfElement.current).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
            pdf.save("Receipt.pdf");

            //to download the png
            // const link = document.createElement('a');
            // link.href = imgData; // Set the href to the PNG data URL
            // link.download = 'Receipt.png'; // Set the desired filename for the download

            // // Append the link to the document, click it to trigger the download, and then remove it
            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);
        });
    };

    const handleUnload = () => {
        localStorage.removeItem("pdfData");
        localStorage.removeItem('donationData');
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handleUnload);
        return () => {
            window.removeEventListener("beforeunload", handleUnload);
        };
    }, []);

    return pdfData ? (
        <>
            <div className={styles.LClandingPage}>
                <Navbar />

                <div className={styles.LClandingPageHero}>
                    <div className={styles.backgroundImage}>
                        <img
                            src="https://i.ibb.co/cCvB4r6/Learning-BG.png"
                            alt="textured background"
                        ></img>
                    </div>
                    <div className={styles.dash}></div>
                    <div className={styles.heroTitle}>
                        <span>
                            <b>Thank You!</b>{" "}
                        </span>
                        <b>We appreciate your support</b>
                    </div>
                    <p>
                        Your donation was successful. A confirmation email has been
                        sent.
                    </p>
                </div>

                <div className={styles.DonationSection}>
                    <div className={styles.DonationFormElement}>
                        <div className={styles.SuccessMessage}>
                            <h1>Success!</h1>
                            <p>
                                Thank you for your donation. Your support means a
                                lot to us.
                            </p>
                        </div>
                        <div className={styles.ButtonContainer}>
                            <Link to="/">
                                <button className={styles.homeButton}>Home</button>
                            </Link>
                            <button
                                className={styles.downloadButton}
                                onClick={downloadReceipt}
                            >
                                Download Receipt
                            </button>
                        </div>
                    </div>
                </div>
                <div ref={pdfElement} style={{
                position: "absolute",
                top: "-1000%",
            }}>
                <Receipt />
            </div>
                <Footer />
            </div>
        </>
    ) : (
        <div>
            <NotFound />
        </div>
    );
};

export default DonationSuccess;
