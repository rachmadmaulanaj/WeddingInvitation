import { useGlobalContext } from '../GlobalProvider';
import { asset } from '../utils/asset';

import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import { Reveal, RevealGroup, RevealItem } from "../components/motion/Reveal";

function Story() {
    const { story } = useGlobalContext();

    return (
        <section id="story" className='flex min-h-screen items-center justify-center pb-28'>
            <div className='w-full max-w-md px-5 py-16 md:max-w-5xl md:py-20'>
                <SectionTitle subtitle="Perjalanan kami sampai di titik ini.">
                    Cerita Kami
                </SectionTitle>

                {story.length ? (
                    <RevealGroup className='relative border-l-2 border-c-sky pl-6 md:grid md:grid-cols-2 md:gap-5 md:border-l-0 md:pl-0'>
                        {story.map((item, index) => (
                            <RevealItem key={`${item.title}-${index}`} className='relative mb-5 last:mb-0 md:mb-0'>
                                <span className='absolute -left-[31px] top-5 h-4 w-4 rounded-full border-2 border-c-sky bg-white md:hidden' />
                                <Card background='bg-c-white'>
                                    <div className='text-left font-josefinsans text-c-navy'>
                                        <p className='text-xs font-semibold uppercase tracking-wide text-c-muted'>
                                            Bab {index + 1}
                                        </p>
                                        <h3 className='mt-1 font-poiretone text-2xl text-c-navy md:text-3xl'>{item.title}</h3>
                                        {item.urlPhoto ? (
                                            <img
                                                src={asset(item.urlPhoto)}
                                                alt={item.title}
                                                className='mt-3 w-full rounded-md object-cover'
                                            />
                                        ) : null}
                                        <p className='mt-3 whitespace-pre-line break-words text-sm leading-relaxed md:text-base'>
                                            {item.text}
                                        </p>
                                    </div>
                                </Card>
                            </RevealItem>
                        ))}
                    </RevealGroup>
                ) : (
                    <Reveal>
                        <Card background='bg-c-white'>
                            <p className='font-josefinsans text-sm text-c-navy'>Cerita belum tersedia.</p>
                        </Card>
                    </Reveal>
                )}
            </div>
        </section>
    )
}

export default Story;
