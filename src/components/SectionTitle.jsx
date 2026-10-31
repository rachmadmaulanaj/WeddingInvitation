import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { m as motion, useReducedMotion } from 'motion/react';
import { easeOut, lineReveal, staggerContainer, staggerItem } from '../utils/motion';

const titleContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.05,
        },
    },
};

const wordReveal = {
    hidden: { opacity: 0, y: 14 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: easeOut,
        },
    },
};

function SectionTitle({ children, subtitle }) {
    const shouldReduceMotion = useReducedMotion();
    const text = typeof children === 'string' ? children : null;
    const words = text ? text.split(/\s+/).filter(Boolean) : [];

    if (shouldReduceMotion) {
        return (
            <div className="mb-8 w-full text-center md:mb-10">
                <h2 className="font-poiretone text-3xl text-c-navy md:text-4xl">{children}</h2>
                {subtitle ? (
                    <p className="mx-auto mt-2 max-w-xs font-josefinsans text-sm text-c-muted md:max-w-md md:text-base">
                        {subtitle}
                    </p>
                ) : null}
                <hr className="line mx-auto my-4 w-16 md:w-24" />
            </div>
        );
    }

    return (
        <motion.div
            className="mb-8 w-full text-center md:mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            variants={staggerContainer}
        >
            <motion.h2
                className="font-poiretone text-3xl text-c-navy md:text-4xl"
                variants={titleContainer}
                aria-label={text || undefined}
            >
                {words.length ? words.map((word, index) => (
                    <Fragment key={`${word}-${index}`}>
                        <motion.span className="inline-block" variants={wordReveal} aria-hidden="true">
                            {word}
                        </motion.span>
                        {index < words.length - 1 ? ' ' : null}
                    </Fragment>
                )) : children}
            </motion.h2>
            {subtitle ? (
                <motion.p
                    className="mx-auto mt-2 max-w-xs font-josefinsans text-sm text-c-muted md:max-w-md md:text-base"
                    variants={staggerItem}
                >
                    {subtitle}
                </motion.p>
            ) : null}
            <motion.hr className="line mx-auto my-4 w-16 origin-center md:w-24" variants={lineReveal} />
        </motion.div>
    );
}

SectionTitle.propTypes = {
    children: PropTypes.node.isRequired,
    subtitle: PropTypes.string,
};

export default SectionTitle;
