import React from "react";
const ScrollToTop = () => {
    const handleScroll = () => {
        window.scrollTo(0, 0);
    }
    return (<div className="fixed bottom-2 z-0 right-2 text-xl rounded-[50%] w-5 h-5 bg-black/30 text-black/80 flex justify-center items-center" onClick={() => handleScroll()} >
        <ion-icon name="arrow-up-outline" ></ion-icon>
    </div>)
}
export default ScrollToTop;