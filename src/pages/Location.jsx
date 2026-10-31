import { FaMapMarkedAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useGlobalContext } from '../GlobalProvider';
import { getDefaultEvent } from '../utils/date';

import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import { Reveal } from "../components/motion/Reveal";

function Location() {
    const { event } = useGlobalContext();
    const defaultEvent = getDefaultEvent(event);
    const location = defaultEvent?.location;
    const hasCoordinates = Number.isFinite(Number(location?.latitude)) && Number.isFinite(Number(location?.longitude));
    const coordinateQuery = hasCoordinates ? `${location.latitude},${location.longitude}` : '';
    const mapQuery = coordinateQuery || location?.address || location?.name || '';
    const mapEmbedUrl = coordinateQuery
        ? `https://www.google.com/maps?q=${coordinateQuery}&output=embed`
        : null;
    const mapsUrl = mapQuery
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`
        : '';

    return (
        <section id="location" className='flex min-h-screen items-center justify-center pb-28'>
            <div className='w-full max-w-md px-5 py-16 md:max-w-4xl md:py-20'>
                <SectionTitle subtitle="Lokasi acara pernikahan kami.">
                    Lokasi
                </SectionTitle>

                <Reveal>
                    <Card background='bg-c-white'>
                        <div className='text-left font-josefinsans text-c-navy md:grid md:grid-cols-2 md:items-start md:gap-8'>
                            <div>
                                <p className='text-xs font-semibold uppercase tracking-wide text-c-muted'>
                                    {defaultEvent?.name || 'Lokasi Acara'}
                                </p>
                                <h3 className='mt-1 flex items-center gap-2 font-poiretone text-xl text-c-navy md:text-2xl'>
                                    <FaMapMarkerAlt />
                                    {location?.name || 'Lokasi belum tersedia.'}
                                </h3>
                                {location?.address ? (
                                    <p className='mt-3 text-sm leading-relaxed text-c-muted md:text-base'>
                                        {location.address}
                                    </p>
                                ) : null}
                            </div>

                            <div>
                                {mapEmbedUrl ? (
                                    <div className='mt-4 overflow-hidden rounded-lg md:mt-0'>
                                        <iframe
                                            title="Peta lokasi acara"
                                            src={mapEmbedUrl}
                                            className='h-64 w-full border-0 md:h-80'
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
                                    </div>
                                ) : null}

                                {mapsUrl ? (
                                    <a
                                        href={mapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='mt-4 inline-flex items-center gap-2 rounded-full bg-c-navy px-4 py-2 text-xs font-medium text-c-white transition duration-200 hover:scale-[1.03] hover:bg-c-navy-soft active:scale-95'
                                    >
                                        <FaMapMarkedAlt />
                                        Buka di Google Maps
                                    </a>
                                ) : null}
                            </div>
                        </div>
                    </Card>
                </Reveal>
            </div>
        </section>
    )
}

export default Location;
