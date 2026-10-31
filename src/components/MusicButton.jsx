import PropTypes from 'prop-types';
import { m as motion } from 'motion/react';
import { MdMusicNote, MdMusicOff } from "react-icons/md";

function MusicButton({ isMusicOn, onToggle, disabled, title }) {
    const musicTitle = title ? `: ${title}` : '';
    const label = disabled
        ? 'Musik belum tersedia'
        : (isMusicOn ? `Matikan musik${musicTitle}` : `Putar musik${musicTitle}`);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
        >
            <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-c-navy shadow-sm transition duration-200 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                onClick={onToggle}
                disabled={disabled}
                aria-label={label}
                title={label}
            >
                {
                    isMusicOn ? (
                        <MdMusicNote className="text-2xl" />
                    ) : (
                        <MdMusicOff className="text-2xl" />
                    )
                }
            </button>
        </motion.div>
    )
}

MusicButton.propTypes = {
    isMusicOn: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    title: PropTypes.string,
};

export default MusicButton;
