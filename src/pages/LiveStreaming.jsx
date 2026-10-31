import { FaVideo, FaYoutube } from 'react-icons/fa';
import { useGlobalContext } from '../GlobalProvider';
import { getYouTubeEmbedUrl } from '../utils/youtube';

import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import { Reveal } from "../components/motion/Reveal";

function LiveStreaming() {
    const { liveStreaming } = useGlobalContext();
    const embedUrl = getYouTubeEmbedUrl(liveStreaming.url);

    return (
        <section id="live-streaming" className='flex min-h-screen items-center justify-center pb-28'>
            <div className='w-full max-w-md px-5 py-16 md:max-w-3xl md:py-20'>
                <SectionTitle subtitle="Saksikan momen kami dari mana saja.">
                    Siaran Langsung
                </SectionTitle>

                <Reveal>
                    <Card background='bg-c-white'>
                        <div className='text-center font-josefinsans text-c-navy'>
                            <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-c-navy md:h-20 md:w-20'>
                                <FaVideo className='text-2xl text-c-sky md:text-3xl' />
                            </div>
                            <h3 className='mt-4 break-words font-poiretone text-xl text-c-navy md:text-2xl'>
                                {liveStreaming.title}
                            </h3>

                            {embedUrl ? (
                                <>
                                    <div className='mt-4 aspect-video overflow-hidden rounded-lg'>
                                        <iframe
                                            title="Live streaming pernikahan"
                                            src={embedUrl}
                                            className='h-full w-full border-0'
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        />
                                    </div>
                                    <a
                                        href={liveStreaming.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='mt-4 inline-flex items-center gap-2 rounded-full bg-c-navy px-4 py-2 text-xs font-medium text-c-white transition duration-200 hover:scale-[1.03] hover:bg-c-navy-soft active:scale-95'
                                    >
                                        <FaYoutube />
                                        Buka Siaran Langsung
                                    </a>
                                </>
                            ) : liveStreaming.url ? (
                                <a
                                    href={liveStreaming.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='mt-4 inline-flex items-center gap-2 rounded-full bg-c-navy px-4 py-2 text-xs font-medium text-c-white transition duration-200 hover:scale-[1.03] hover:bg-c-navy-soft active:scale-95'
                                >
                                    <FaVideo />
                                    Buka Siaran Langsung
                                </a>
                            ) : (
                                <p className='mt-4 text-sm text-c-muted'>
                                    Tautan siaran langsung belum tersedia.
                                </p>
                            )}
                        </div>
                    </Card>
                </Reveal>
            </div>
        </section>
    )
}

export default LiveStreaming;
