import { useEffect, useState } from 'react';
import { m as motion } from 'motion/react';
import { FaArrowUp } from "react-icons/fa";

function ScrollUpButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScrollToTop = () => {
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
        window.scrollTo({ top: 0, behavior });
    };

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
        >
            <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-c-navy shadow-sm transition duration-200 hover:scale-105 active:scale-95"
                onClick={handleScrollToTop}
                aria-label="Kembali ke atas"
            >
                <FaArrowUp className="text-lg" />
            </button>
        </motion.div>
    )
}

export default ScrollUpButton;
