export const easeOut = [0.22, 1, 0.36, 1];

export const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (custom = {}) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            ease: easeOut,
            delay: custom.delay || 0,
        },
    }),
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: easeOut,
        },
    },
};

export const lineReveal = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: {
        opacity: 1,
        scaleX: 1,
        transition: {
            duration: 0.6,
            ease: easeOut,
            delay: 0.15,
        },
    },
};

export const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05,
        },
    },
};

export const staggerItem = {
    hidden: { opacity: 0, y: 22 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: easeOut,
        },
    },
};
