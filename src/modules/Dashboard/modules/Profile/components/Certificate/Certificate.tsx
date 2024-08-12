import React, { useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import MulearnBrand from "../../assets/svg/MulearnBrand";

type CertificateProps = {
    name: string;
    muid: string;
    level: number;
    karma: number;
    interestGroups: string[];
};

const Certificate: React.FC<CertificateProps> = ({
    name,
    muid,
    level,
    karma,
    interestGroups
}) => {
    const pdfElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        handleDownloadPDF();
    }, []);

    const handleDownloadPDF = () => {
        html2canvas(pdfElement.current!).then(canvas => {
            const imgData = canvas.toDataURL("image/png");
            // Create a link element
            const link = document.createElement("a");
            // Set the download attribute with a filename
            link.download = "Certificate.png";
            // Set the href attribute to the image data URL
            link.href = imgData;
            // Append the link to the document body (this is necessary for Firefox)
            document.body.appendChild(link);
            // Trigger the download
            link.click();
            // Remove the link from the document
            document.body.removeChild(link);
        });
    };
// MODIFY THIS RETURN TO STYLE THE CERTIFICATE
    return (
        <>
            <div
                style={{
                    display: "flex",
                    alignItems: "center", // Centers horizontally
                    justifyContent: "center", // Centers vertically
                    margin: "50px"
                }}
                ref={pdfElement}
            >
                <div
                    style={{
                        padding: "20px",
                        border: "2px solid #000",
                        borderRadius: "10px",
                        width: "80%",
                        textAlign: "center",
                        backgroundColor: "#20151d",
                        color: "#fff"
                    }}
                    id="certificate"
                >
                    <div
                        style={{
                            display: "flex",
                            alignContent: "end",
                            justifyContent: "end"
                        }}
                    >
                        <MulearnBrand />
                    </div>
                    <h1
                        style={{
                            fontSize: "32px",
                            fontWeight: "bold",
                            textDecoration: "underline"
                        }}
                    >
                        Certificate of Achievement
                    </h1>
                    <div
                        style={{
                            display: "flex",
                            alignContent: "center",
                            justifyContent: "center",
                            paddingTop: "50px"
                        }}
                    >
                        This is to certify that {name + " "}
                        has successfully achieved Level: {level + " "}
                        with a total of {karma} Karma points
                        <br />
                        and is actively participating in the following interest
                        groups:
                        {" " + interestGroups.join(", ") + " "}
                    </div>
                    muID: {muid}
                    <div
                        style={{
                            display: "flex",
                            paddingTop: "50px"
                        }}
                    >
                        <br />
                        Signature: __________________________
                        <br />
                        muLearn Team
                        <br />
                        Dated: {new Date().toLocaleDateString()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Certificate;
