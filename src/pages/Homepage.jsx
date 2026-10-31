import { m as motion } from 'motion/react';
import { useGlobalContext } from '../GlobalProvider';
import { asset } from '../utils/asset';
import { formatDate, getDefaultEvent } from '../utils/date';
import { lineReveal, staggerContainer, staggerItem } from '../utils/motion';

import Card from "../components/Card";
import Countdown from "../components/Countdown";
import { RevealGroup, RevealItem } from "../components/motion/Reveal";

function Homepage() {
    const { groomData, brideData, event, homepage } = useGlobalContext();
    const defaultEvent = getDefaultEvent(event);
    const displayDate = defaultEvent ? formatDate(defaultEvent.startDate) : 'Tanggal belum ditentukan';
    const homepagePhoto = homepage?.url || '';

    return (
        <section id="homepage" className='flex min-h-screen items-center justify-center pb-28'>
            <RevealGroup className='grid w-full max-w-md gap-8 px-5 py-16 text-center md:max-w-5xl md:grid-cols-2 md:items-center md:gap-12 md:text-left lg:py-20'>
                <motion.div className='md:col-start-1 md:row-span-2 md:self-center' variants={staggerContainer}>
                    <motion.p className='mb-3 font-poiretone text-lg text-c-muted' variants={staggerItem}>
                        Pernikahan Kami
                    </motion.p>
                    <motion.h2 className='font-badscript text-4xl text-c-navy sm:text-5xl md:text-6xl lg:text-7xl' variants={staggerItem}>
                        {groomData.name} & {brideData.name}
                    </motion.h2>
                    <motion.hr className='line my-5 w-24 origin-center md:mx-0' variants={lineReveal} />
                    <motion.p className='font-badscript text-2xl text-c-muted md:text-3xl' variants={staggerItem}>
                        {displayDate}
                    </motion.p>
                </motion.div>

                <RevealItem className='flex w-full justify-center md:col-start-2 md:row-start-1'>
                    <Card background='bg-c-white'>
                        {homepagePhoto ? (
                            <img
                                src={asset(homepagePhoto)}
                                alt={homepage?.title || 'Foto pasangan'}
                                className='aspect-[7/5] w-full rounded-md object-cover'
                            />
                        ) : (
                            <div className='flex aspect-[4/3] w-full items-center justify-center rounded-md bg-slate-100 font-josefinsans text-xs text-slate-500'>
                                Foto menyusul
                            </div>
                        )}
                    </Card>
                </RevealItem>

                <RevealItem className='w-full max-w-xs justify-self-center md:col-start-2 md:row-start-2 md:max-w-none md:justify-self-stretch'>
                    <Countdown targetDate={defaultEvent?.startDate} />
                </RevealItem>
            </RevealGroup>
        </section>
    )
}

export default Homepage;
