import PropTypes from 'prop-types';
import { m as motion, useReducedMotion } from 'motion/react';
import { useGlobalContext } from '../GlobalProvider';
import { useGuestName } from '../hooks/useGuestName';
import { formatDate, getDefaultEvent } from '../utils/date';
import { easeOut, staggerContainer, staggerItem } from '../utils/motion';

import PrimaryButton from "../components/PrimaryButton";
import Card from "../components/Card";

function Cover({ onOpen }) {
    const { guestName, groomData, brideData, event } = useGlobalContext();
    const invitationGuestName = useGuestName(guestName);
    const defaultEvent = getDefaultEvent(event);
    const displayDate = defaultEvent ? formatDate(defaultEvent.startDate) : 'Tanggal belum ditentukan';
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.section
            key="cover"
            id="cover"
            className="fixed inset-0 z-40 overflow-y-auto bg-page-gradient"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: easeOut }}
        >
            <motion.div
                className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-md flex-col items-center justify-between px-5 py-8 text-center sm:max-w-xl lg:max-w-3xl lg:px-8 lg:py-12"
                initial={shouldReduceMotion ? false : 'hidden'}
                animate="visible"
                variants={staggerContainer}
            >
                <motion.header className="w-full" variants={staggerContainer}>
                    <motion.h1 className="font-poiretone text-3xl text-c-navy lg:text-4xl" variants={staggerItem}>
                        Undangan Pernikahan
                    </motion.h1>
                    <motion.p className="mt-2 font-josefinsans text-sm text-c-muted md:text-base" variants={staggerItem}>
                        Anda diundang untuk hadir dalam acara pernikahan Kami.
                    </motion.p>
                </motion.header>

                <motion.div className="w-full" variants={staggerContainer}>
                    <motion.h2 className="font-badscript text-5xl text-c-navy sm:text-6xl lg:text-7xl" variants={staggerItem}>
                        <span className="block text-left">{groomData.name}</span>
                        <span className="my-4 block text-center">&</span>
                        <span className="block text-right">{brideData.name}</span>
                    </motion.h2>
                    <motion.hr className="line mx-auto my-4 w-16 origin-center md:w-24" variants={staggerItem} />
                    <motion.p className="mt-5 font-badscript text-2xl text-c-muted md:text-3xl" variants={staggerItem}>
                        {displayDate}
                    </motion.p>

                    <motion.div className="mt-8 flex justify-center" variants={staggerItem}>
                        <div className="w-full max-w-xs lg:max-w-md">
                            <Card background="bg-c-white">
                                <div className="font-josefinsans">
                                    <p className="text-sm text-c-navy">Kepada Yth.</p>
                                    <p className="text-sm text-c-navy">Bapak/Ibu/Saudara/i</p>
                                    <p className="my-4 break-words text-2xl text-c-navy">{invitationGuestName}</p>
                                </div>
                            </Card>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.footer className="flex w-full max-w-xs justify-center" variants={staggerItem}>
                    <PrimaryButton onClickButton={onOpen}>Buka Undangan</PrimaryButton>
                </motion.footer>
            </motion.div>
        </motion.section>
    )
}

Cover.propTypes = {
    onOpen: PropTypes.func.isRequired,
};

export default Cover;
