export const sendRefreshToken = async () => {
    const iframe = document.getElementById("__cdr") as HTMLIFrameElement;
    if (iframe) {
        const data = JSON.stringify({
            type: "token-sync",
            refreshToken: localStorage.getItem("refreshToken")
        });
        iframe.contentWindow?.postMessage(data, import.meta.env.VITE_HOME_MULEARN_URL);
    }
}