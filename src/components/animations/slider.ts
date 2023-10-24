export const slideUpFunc = (step: number) => {
    return {
        initial: { y: 200 },
        // whileInView: { opacity: 1 }
        animate: { y: 0 },
        duration: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: step
        }

    }
}

export const fadeIn = (step: number) => {
    return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        duration: 8,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: step
        }
    }
}

export const slideLeft = {
    initial: { opacity: 0 },
    // whileInView: { opacitx: 1 }
    animate: { opacity: 1 },
    duration: 1,
    transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
    },
}