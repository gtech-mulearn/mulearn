import toast from "react-hot-toast";
import { publicGateway } from "@/MuLearnServices/apiGateways";
import { donationRoutes } from "@/MuLearnServices/urls";

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Razorpay: any;
    }
}

export const submitForm = async ({
    amount,
    name,
    company,
    email,
    mobile,
    pan
}: {
    amount: number;
    name: string;
    company?: string;
    email: string;
    mobile: number;
    pan: string;
}) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);

    publicGateway
        .post(donationRoutes.order, {
            amount,
            name,
            company,
            email,
            mobile,
            pan
        })
        .then(response => {
            const paymentId: string = response.data.response.id;
            const paymentAmount: string = response.data.response.amount;

            const options = {
                key_id: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: paymentAmount,
                currency: response.data.response.currency,
                name: "Mulearn Foundation",
                description: "Donation",
                image: "/assets/µLearn.png",
                order_id: paymentId,
                handler: function (response: any) {
                    console.log(paymentAmount,this.currency)
                    publicGateway
                        .post(donationRoutes.verify, {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        })
                        .then(res => {
                            console.log(res?.data);
                            console.log("type",typeof(res?.data));
                            toast.success(
                                res?.data?.message?.general[0] ||
                                    "Payment Successful"
                            );
                            // Assuming response.data contains the PDF data

                            const pdfData = res?.data;
                            localStorage.setItem("pdfData", JSON.stringify(pdfData));

                            // Create a new blob from the PDF data
                            // const pdfBlob = new Blob([pdfData], {
                            //     type: "application/pdf"
                            // });

                            // // Create a URL for the blob
                            // const pdfUrl = URL.createObjectURL(pdfBlob);

                            // // Open the PDF in a new window or tab
                            // // window.open(pdfUrl, '_blank');
                            // const link = document.createElement("a");
                            // link.href = pdfUrl;
                            // link.download = "downloaded-file.pdf"; // Provide a filename here
                            // document.body.appendChild(link);
                            // link.click();
                            // document.body.removeChild(link);
                            // window.location.href = "/donation/success";

                            // Convert blob data to a base64 string
                            // const reader = new FileReader();
                            // reader.onloadend = function () {
                            //     const base64data = reader.result;
                            //     if (base64data) {
                            //         localStorage.setItem(
                            //             "pdfData",
                            //             base64data as string
                            //         );

                            //         window.location.href = "/donation/success";
                            //     } else {
                            //         console.error("Failed to read PDF data.");
                            //     }
                            // };
                            // reader.readAsDataURL(pdfBlob);
                            const storeData = localStorage.getItem("pdfData");
                            if (storeData) {
                                window.location.href = "/donation/success";
                            } else {
                                console.error("Failed to read PDF data.");
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            toast.error(
                                JSON.stringify(error) ||
                                    "Error in Validating Payment"
                            );
                        });
                },
                theme: {
                    color: "#456ff6"
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        })
        .catch(error => {
            toast.error(
                error?.response?.data?.message?.general[0] ||
                    "Error in Registering Event"
            );
        });
};
