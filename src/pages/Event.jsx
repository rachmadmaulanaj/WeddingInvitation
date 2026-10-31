import { FaCalendarAlt, FaMapMarkerAlt, FaRegCalendarPlus } from 'react-icons/fa';
import { useGlobalContext } from '../GlobalProvider';
import { formatCalendarDate, formatDate, formatTimeRange } from '../utils/date';

import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import { Reveal, RevealGroup, RevealItem } from "../components/motion/Reveal";

function Event() {
    const { groomData, brideData, event } = useGlobalContext();

    const getCalendarUrl = (item) => {
        const title = `${item.name} - ${groomData.name} & ${brideData.name}`;
        const dates = `${formatCalendarDate(item.startDate)}/${formatCalendarDate(item.endDate)}`;
        const details = `Acara pernikahan ${groomData.fullName} & ${brideData.fullName}`;
        const location = [item.location?.name, item.location?.address].filter(Boolean).join(', ');

        return 'https://calendar.google.com/calendar/render?action=TEMPLATE'
            + `&text=${encodeURIComponent(title)}`
            + `&dates=${dates}`
            + `&details=${encodeURIComponent(details)}`
            + `&location=${encodeURIComponent(location)}`;
    };

    return (
        <section id="event" className='flex min-h-screen items-center justify-center pb-28'>
            <div className='w-full max-w-md px-5 py-16 md:max-w-5xl md:py-20'>
                <SectionTitle subtitle="Insya Allah acara akan dilaksanakan pada:">
                    Rangkaian Acara
                </SectionTitle>

                {event.length ? (
                    <RevealGroup className='space-y-5 md:grid md:grid-cols-2 md:gap-6 md:space-y-0'>
                        {event.map((item) => (
                            <RevealItem key={`${item.name}-${item.startDate}`}>
                                <Card background='bg-c-white'>
                                    <div className='text-left font-josefinsans text-c-navy'>
                                        <div className='flex items-start justify-between gap-3'>
                                            <h3 className='font-poiretone text-2xl text-c-navy md:text-3xl'>{item.name}</h3>
                                            {item.isDefault ? (
                                                <span className='rounded-full bg-c-sky px-2 py-1 text-[10px] font-semibold uppercase text-c-navy'>
                                                    Utama
                                                </span>
                                            ) : null}
                                        </div>

                                        <p className='mt-4 flex items-center gap-2 text-sm md:text-base'>
                                            <FaCalendarAlt className='shrink-0 text-c-navy' />
                                            <span>{formatDate(item.startDate)}</span>
                                        </p>
                                        <p className='mt-1 text-sm md:text-base'>
                                            {formatTimeRange(item.startDate, item.endDate)}
                                        </p>
                                        <div className='mt-3 flex items-start gap-2 text-sm md:text-base'>
                                            <FaMapMarkerAlt className='mt-1 shrink-0 text-c-navy' />
                                            <div>
                                                <p>{item.location?.name || 'Lokasi belum tersedia'}</p>
                                                {item.location?.address ? (
                                                    <p className='mt-1 text-xs text-c-muted md:text-sm'>{item.location.address}</p>
                                                ) : null}
                                            </div>
                                        </div>

                                        <a
                                            href={getCalendarUrl(item)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className='mt-4 inline-flex items-center gap-2 rounded-full bg-c-navy px-4 py-2 text-xs font-medium text-c-white transition duration-200 hover:scale-[1.03] hover:bg-c-navy-soft active:scale-95'
                                        >
                                            <FaRegCalendarPlus />
                                            Tambah ke Kalender
                                        </a>
                                    </div>
                                </Card>
                            </RevealItem>
                        ))}
                    </RevealGroup>
                ) : (
                    <Reveal>
                        <Card background='bg-c-white'>
                            <p className='font-josefinsans text-sm text-c-navy'>Informasi acara belum tersedia.</p>
                        </Card>
                    </Reveal>
                )}
            </div>
        </section>
    )
}

export default Event;
