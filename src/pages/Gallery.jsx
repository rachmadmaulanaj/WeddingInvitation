import { useEffect, useState } from 'react';
import { AnimatePresence, m as motion } from 'motion/react';
import { FaCamera, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { useGlobalContext } from '../GlobalProvider';
import { easeOut } from '../utils/motion';

import SectionTitle from "../components/SectionTitle";
import { Reveal, RevealGroup, RevealItem } from "../components/motion/Reveal";

function Gallery() {
    const { gallery } = useGlobalContext();
    const [activeIndex, setActiveIndex] = useState(null);
    const activeImage = activeIndex !== null ? gallery[activeIndex] : null;

    useEffect(() => {
        if (activeIndex === null) return undefined;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') setActiveIndex(null);
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeIndex]);

    const showAdjacentImage = (direction) => {
        if (activeIndex === null || !gallery.length) return;

        for (let step = 1; step <= gallery.length; step += 1) {
            const candidate = (activeIndex + direction * step + gallery.length) % gallery.length;
            if (gallery[candidate].url) {
                setActiveIndex(candidate);
                return;
            }
        }
    };

    return (
        <section id="gallery" className='flex min-h-screen items-center justify-center pb-28'>
            <div className='w-full max-w-md px-5 py-16 md:max-w-5xl md:py-20'>
                <SectionTitle subtitle="Momen yang kami abadikan.">
                    Galeri
                </SectionTitle>

                {gallery.length ? (
                    <RevealGroup className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5'>
                        {gallery.map((item, index) => (
                            <RevealItem key={`${item.title}-${index}`}>
                                <button
                                    type="button"
                                    className='group relative aspect-square w-full overflow-hidden rounded-lg bg-c-navy text-left shadow-sm transition duration-300 hover:scale-[1.02] active:scale-[0.98]'
                                    onClick={() => item.url && setActiveIndex(index)}
                                    aria-label={item.url ? `Buka foto ${item.title}` : `${item.title} belum tersedia`}
                                >
                                    {item.url ? (
                                        <img
                                            src={item.url}
                                            alt={item.title}
                                            className='h-full w-full object-cover transition duration-300 group-hover:scale-105'
                                        />
                                    ) : (
                                        <span className='flex h-full w-full flex-col items-center justify-center gap-2 px-2 text-center'>
                                            <FaCamera className='text-2xl text-c-sky' />
                                            <span className='font-josefinsans text-xs text-c-white'>Foto belum tersedia</span>
                                        </span>
                                    )}
                                    <span
                                        className='absolute inset-x-0 bottom-0 px-2 py-1 font-josefinsans text-[10px] text-c-white'
                                        style={{ backgroundColor: 'rgba(22, 50, 91, 0.8)' }}
                                    >
                                        {item.title}
                                    </span>
                                </button>
                            </RevealItem>
                        ))}
                    </RevealGroup>
                ) : (
                    <Reveal>
                        <p className='text-center font-josefinsans text-sm text-c-muted'>Galeri belum tersedia.</p>
                    </Reveal>
                )}
            </div>

            <AnimatePresence>
                {activeImage?.url ? (
                    <motion.div
                        key="gallery-lightbox"
                        className='fixed inset-0 z-50 flex items-center justify-center p-4'
                        style={{ backgroundColor: 'rgba(22, 50, 91, 0.95)' }}
                        role="dialog"
                        aria-modal="true"
                        aria-label={`Foto ${activeImage.title}`}
                        onClick={() => setActiveIndex(null)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <button
                            type="button"
                            className='absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-c-white text-c-navy transition duration-200 hover:scale-105 active:scale-95'
                            onClick={() => setActiveIndex(null)}
                            aria-label="Tutup galeri"
                        >
                            <FaTimes />
                        </button>

                        {gallery.length > 1 ? (
                            <>
                                <button
                                    type="button"
                                    className='absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-c-white text-c-navy transition duration-200 hover:scale-105 active:scale-95'
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        showAdjacentImage(-1);
                                    }}
                                    aria-label="Foto sebelumnya"
                                >
                                    <FaChevronLeft />
                                </button>
                                <button
                                    type="button"
                                    className='absolute right-3 flex h-10 w-10 items-center justify-center rounded-full bg-c-white text-c-navy transition duration-200 hover:scale-105 active:scale-95'
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        showAdjacentImage(1);
                                    }}
                                    aria-label="Foto berikutnya"
                                >
                                    <FaChevronRight />
                                </button>
                            </>
                        ) : null}

                        <motion.figure
                            className='max-h-full max-w-full text-center'
                            onClick={(event) => event.stopPropagation()}
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: easeOut }}
                        >
                            <img
                                src={activeImage.url}
                                alt={activeImage.title}
                                className='max-h-[80vh] max-w-full rounded-lg object-contain'
                            />
                            <figcaption className='mt-3 font-josefinsans text-sm text-c-white'>
                                {activeImage.title}
                            </figcaption>
                        </motion.figure>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </section>
    )
}

export default Gallery;
