import { useGlobalContext } from '../GlobalProvider';
import { asset } from '../utils/asset';

import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import { RevealGroup, RevealItem } from "../components/motion/Reveal";

function Couple() {
    const { groomData, brideData } = useGlobalContext();

    const people = [
        { label: 'Mempelai Pria', data: groomData, childLabel: 'Putra' },
        { label: 'Mempelai Wanita', data: brideData, childLabel: 'Putri' },
    ];

    return (
        <section id="couple" className='flex min-h-screen items-center justify-center pb-28'>
            <div className='w-full max-w-md px-5 py-16 md:max-w-4xl md:py-20'>
                <SectionTitle subtitle="Dengan memohon rahmat dan ridho Allah SWT.">
                    Mempelai
                </SectionTitle>

                <RevealGroup className='space-y-5 md:grid md:grid-cols-2 md:gap-6 md:space-y-0'>
                    {people.map((person) => (
                        <RevealItem key={person.label}>
                            <Card background='bg-c-white'>
                                <div className='text-center font-josefinsans text-c-navy'>
                                    {person.data.photo ? (
                                        <img
                                            src={asset(person.data.photo)}
                                            alt={person.data.fullName}
                                            className='mx-auto h-24 w-24 rounded-full border-2 border-slate-200 object-cover md:h-28 md:w-28'
                                        />
                                    ) : (
                                        <div className='mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-c-navy md:h-28 md:w-28'>
                                            <span className='font-badscript text-4xl text-c-sky md:text-5xl'>
                                                {person.data.name.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                    <p className='mt-4 text-xs uppercase tracking-wide text-c-muted'>{person.label}</p>
                                    <h3 className='mt-1 break-words font-poiretone text-2xl text-c-navy md:text-3xl'>
                                        {person.data.fullName}
                                    </h3>
                                    <p className='mt-3 text-sm md:text-base'>
                                        {person.childLabel} ke-{person.data.childNumber} dari
                                    </p>
                                    <p className='mt-1 text-sm font-medium md:text-base'>
                                        {person.data.fatherName} &amp; {person.data.motherName}
                                    </p>
                                </div>
                            </Card>
                        </RevealItem>
                    ))}
                </RevealGroup>
            </div>
        </section>
    )
}

export default Couple;
