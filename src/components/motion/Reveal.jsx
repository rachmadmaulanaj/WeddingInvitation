import PropTypes from 'prop-types';
import { m as motion, useReducedMotion } from 'motion/react';
import { fadeUp, staggerContainer, staggerItem } from '../../utils/motion';

export function Reveal({ children, className = '', delay = 0, once = false }) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            custom={{ delay }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount: 0.2 }}
            variants={fadeUp}
        >
            {children}
        </motion.div>
    );
}

Reveal.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    delay: PropTypes.number,
    once: PropTypes.bool,
};

export function RevealGroup({ children, className = '', once = false }) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount: 0.2 }}
            variants={staggerContainer}
        >
            {children}
        </motion.div>
    );
}

RevealGroup.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    once: PropTypes.bool,
};

export function RevealItem({ children, className = '', layout = false }) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div className={className} layout={layout} variants={staggerItem}>
            {children}
        </motion.div>
    );
}

RevealItem.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    layout: PropTypes.bool,
};
