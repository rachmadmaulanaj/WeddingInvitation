import { useGlobalContext } from '../GlobalProvider';
import { formatDate, getDefaultEvent } from '../utils/date';

import Card from "../components/Card";
import PrimaryButton from "../components/PrimaryButton";
import { Reveal } from "../components/motion/Reveal";

function Closing() {
    const { groomData, brideData, event } = useGlobalContext();
    const defaultEvent = getDefaultEvent(event);

    const handleBackToTop = () => {
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
        window.scrollTo({ top: 0, behavior });
    };

    return (
        <section id="closing" className='flex min-h-screen items-center justify-center pb-28'>
            <div className='w-full max-w-md px-5 py-16 text-center md:max-w-2xl md:py-20'>
                <Reveal>
                    <Card background='bg-c-white'>
                        <div className='font-josefinsans text-c-navy'>
                            <p className='text-sm uppercase tracking-wide text-c-muted'>Terima Kasih</p>
                            <h2 className='mt-3 font-badscript text-4xl text-c-navy md:text-5xl'>
                                {groomData.name} & {brideData.name}
                            </h2>
                            {defaultEvent ? (
                                <p className='mt-2 font-poiretone text-lg text-c-muted'>
                                    {formatDate(defaultEvent.startDate)}
                                </p>
                            ) : null}
                            <p className='mt-4 text-sm leading-relaxed md:text-base'>
                                Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
                                berkenan hadir dan memberikan doa restu.
                            </p>
                            <p className='mt-4 text-sm leading-relaxed md:text-base'>
                                Atas kehadiran dan doanya, kami mengucapkan terima kasih.
                            </p>
                            <div className='mt-6 flex justify-center'>
                                <PrimaryButton onClickButton={handleBackToTop}>
                                    Kembali ke Atas
                                </PrimaryButton>
                            </div>
                        </div>
                    </Card>
                </Reveal>

                <p className='mt-8 font-josefinsans text-xs text-c-muted'>
                    Dibuat dengan cinta untuk hari bahagia kami.
                </p>
            </div>
        </section>
    )
}

export default Closing;
