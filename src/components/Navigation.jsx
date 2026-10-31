import { useEffect, useMemo, useRef } from 'react';
import { m as motion } from 'motion/react';
import { FaHome, FaHeart, FaCalendarAlt, FaMapMarkerAlt, FaCamera, FaBookOpen, FaVideo, FaCommentAlt, FaGift, FaDoorClosed } from 'react-icons/fa';
import { useGlobalContext } from '../GlobalProvider';
import { useActiveSection } from '../hooks/useActiveSection';
import { easeOut } from '../utils/motion';

const iconMap = {
    FaHome,
    FaHeart,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaCamera,
    FaBookOpen,
    FaVideo,
    FaCommentAlt,
    FaGift,
    FaDoorClosed,
};

function Navigation() {
    const { menus } = useGlobalContext();
    const sectionIds = useMemo(() => menus.map((menu) => menu.url), [menus]);
    const activeSection = useActiveSection(sectionIds);
    const navListRef = useRef(null);

    useEffect(() => {
        const container = navListRef.current;
        if (!container) return;

        const activeItem = container.querySelector(`[data-section="${activeSection}"]`);
        if (!activeItem) return;

        const containerRect = container.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const left = container.scrollLeft + itemRect.left - containerRect.left
            - (container.clientWidth - itemRect.width) / 2;
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

        container.scrollTo({ left, behavior });
    }, [activeSection]);

    const handleClickNavButton = (event, sectionId) => {
        event.preventDefault();

        const target = document.getElementById(sectionId);
        if (!target) return;

        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
        target.scrollIntoView({ behavior, block: 'start' });
    };

    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-10 flex justify-center">
            <motion.nav
                className="pointer-events-auto w-full border-t border-slate-200 bg-white/95 font-josefinsans text-slate-500 shadow-[0_-4px_16px_rgba(15,23,42,0.06)] backdrop-blur md:mb-3 md:w-auto md:max-w-[calc(100vw-2rem)] md:rounded-full md:border md:shadow-lg"
                aria-label="Navigasi undangan"
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: easeOut }}
            >
                <div ref={navListRef} className="mx-auto flex flex-nowrap overflow-x-auto p-3 sm:p-4 md:px-6 md:py-2">
                    {
                        menus.map((menu) => {
                            const IconComponent = iconMap[menu.icon];
                            const isActive = activeSection === menu.url;

                            return (
                                <motion.a
                                    key={menu.url}
                                    href={`#${menu.url}`}
                                    data-section={menu.url}
                                    className={`mx-3 flex flex-col items-center rounded-lg px-1.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 sm:mx-2 sm:px-2 ${isActive ? 'text-c-navy' : 'text-slate-500'}`}
                                    onClick={(event) => handleClickNavButton(event, menu.url)}
                                    aria-current={isActive ? 'location' : undefined}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.96 }}
                                    transition={{ duration: 0.2, ease: easeOut }}
                                >
                                    {IconComponent && <IconComponent className="text-2xl" />}
                                    <span className="mt-0.5 whitespace-nowrap text-[14px] sm:mt-1 sm:text-sm">{menu.title}</span>
                                    <span className="relative mt-0.5 block h-0.5 w-full rounded-lg sm:mt-1 sm:h-1">
                                        {isActive ? (
                                            <motion.span
                                                layoutId="nav-active-indicator"
                                                className="absolute inset-0 rounded-lg bg-c-navy"
                                                transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                                            />
                                        ) : null}
                                    </span>
                                </motion.a>
                            )
                        })
                    }
                </div>
            </motion.nav>
        </div>
    )
}

export default Navigation;
