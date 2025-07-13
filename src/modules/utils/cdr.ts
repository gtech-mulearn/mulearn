export const updateRefreshToken = () => {
    window.addEventListener("message", (event) => {
        if (event.origin !== import.meta.env.VITE_APP_MULEARN_URL.replace(/\/$/, "")) {
            return;
        }
        const data = JSON.parse(event.data);
        if (data.type === "token-sync") {
            if (typeof data.refreshToken === "string") {
                localStorage.setItem("refreshToken", data.refreshToken);
            } else {
                localStorage.removeItem("refreshToken");
            }
        }
    });
}