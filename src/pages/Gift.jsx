import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m as motion } from 'motion/react';
import { FaCopy, FaGift } from 'react-icons/fa';
import { useGlobalContext } from '../GlobalProvider';
import { easeOut } from '../utils/motion';

import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import { Reveal, RevealGroup, RevealItem } from "../components/motion/Reveal";

function Gift() {
    const { gift } = useGlobalContext();
    const [copiedIndex, setCopiedIndex] = useState(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        };
    }, []);

    const showCopiedState = (index) => {
        setCopiedIndex(index);
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => setCopiedIndex(null), 2000);
    };

    const fallbackCopy = (value) => {
        const textarea = document.createElement('textarea');

        try {
            textarea.value = value;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            return document.execCommand('copy');
        } catch {
            return false;
        } finally {
            if (textarea.parentNode) textarea.parentNode.removeChild(textarea);
        }
    };

    const handleCopy = async (value, index) => {
        const text = String(value);

        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(text);
                showCopiedState(index);
                return;
            }
        } catch {
            // Fallback di bawah dipakai jika clipboard API ditolak browser.
        }

        if (fallbackCopy(text)) {
            showCopiedState(index);
        }
    };

    return (
        <section id="gift" className='flex min-h-screen items-center justify-center pb-28'>
            <div className='w-full max-w-md px-5 py-16 md:max-w-4xl md:py-20'>
                <SectionTitle subtitle="Doa dan kehadiran Anda adalah hadiah terbaik bagi kami.">
                    Hadiah
                </SectionTitle>

                {gift.length ? (
                    <RevealGroup className='space-y-4 md:grid md:grid-cols-2 md:gap-5 md:space-y-0'>
                        {gift.map((item, index) => (
                            <RevealItem key={`${item.title}-${item.number}-${index}`}>
                                <Card background='bg-c-white'>
                                    <div className='text-left font-josefinsans text-c-navy'>
                                        <div className='flex items-center gap-2'>
                                            <FaGift className='text-c-navy' />
                                            <h3 className='font-poiretone text-xl text-c-navy md:text-2xl'>{item.title}</h3>
                                        </div>
                                        <p className='mt-3 text-xs uppercase tracking-wide text-c-muted'>
                                            {item.type === 'cashless' ? 'Transfer / E-Wallet' : item.type || 'Hadiah'}
                                        </p>
                                        <p className='mt-1 break-all font-poiretone text-2xl text-c-navy'>
                                            {item.number}
                                        </p>
                                        <p className='mt-1 text-sm md:text-base'>a.n. {item.accountName}</p>

                                        <button
                                            type="button"
                                            className='mt-4 inline-flex items-center gap-2 rounded-full bg-c-navy px-4 py-2 text-xs font-medium text-c-white transition duration-200 hover:scale-[1.03] hover:bg-c-navy-soft active:scale-95'
                                            onClick={() => handleCopy(item.number, index)}
                                        >
                                            <FaCopy />
                                            <AnimatePresence mode="wait" initial={false}>
                                                <motion.span
                                                    key={copiedIndex === index ? 'copied' : 'copy'}
                                                    initial={{ opacity: 0, y: 4 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -4 }}
                                                    transition={{ duration: 0.18, ease: easeOut }}
                                                >
                                                    {copiedIndex === index ? 'Tersalin' : 'Salin Nomor'}
                                                </motion.span>
                                            </AnimatePresence>
                                        </button>
                                    </div>
                                </Card>
                            </RevealItem>
                        ))}
                    </RevealGroup>
                ) : (
                    <Reveal>
                        <Card background='bg-c-white'>
                            <p className='font-josefinsans text-sm text-c-navy'>Informasi hadiah belum tersedia.</p>
                        </Card>
                    </Reveal>
                )}
            </div>
        </section>
    )
}

export default Gift;
