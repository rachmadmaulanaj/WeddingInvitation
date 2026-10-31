import PropTypes from 'prop-types';
import { m as motion } from 'motion/react';

function Card({ children, background = 'bg-c-white' }) {
    return (
        <motion.div
            className={`mx-auto block w-full max-w-xs rounded-lg border border-slate-200 py-3 px-5 shadow-sm md:max-w-none ${background}`}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        >
            {children}
        </motion.div>
    )
}

Card.propTypes = {
    children: PropTypes.node.isRequired,
    background: PropTypes.string,
};

export default Card;
