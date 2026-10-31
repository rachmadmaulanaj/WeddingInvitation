import { useEffect, useState } from 'react';
import { AnimatePresence, m as motion } from 'motion/react';
import { FaPaperPlane, FaUser } from 'react-icons/fa';
import { addWish, getWishes } from '../services/wishes';
import { formatDateTime } from '../utils/date';
import { easeOut } from '../utils/motion';

import Card from "../components/Card";
import PrimaryButton from "../components/PrimaryButton";
import SectionTitle from "../components/SectionTitle";
import { Reveal } from "../components/motion/Reveal";

const attendanceOptions = ['Hadir', 'Tidak Hadir', 'Belum Pasti'];

function WellWishes() {
    const [wishes, setWishes] = useState([]);
    const [form, setForm] = useState({ name: '', text: '', attendance: 'Hadir' });
    const [errors, setErrors] = useState({});
    const [feedback, setFeedback] = useState({ type: '', message: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const loadWishes = async () => {
            try {
                const data = await getWishes();
                if (isMounted) setWishes(data);
            } catch {
                if (isMounted) setFeedback({ type: 'error', message: 'Gagal memuat ucapan.' });
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        loadWishes();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const validateForm = () => {
        const nextErrors = {};
        const name = form.name.trim();
        const text = form.text.trim();

        if (!name) {
            nextErrors.name = 'Nama wajib diisi.';
        } else if (name.length > 50) {
            nextErrors.name = 'Nama maksimal 50 karakter.';
        }

        if (!text) {
            nextErrors.text = 'Ucapan wajib diisi.';
        } else if (text.length > 500) {
            nextErrors.text = 'Ucapan maksimal 500 karakter.';
        }

        if (!attendanceOptions.includes(form.attendance)) {
            nextErrors.attendance = 'Pilih status kehadiran.';
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFeedback({ type: '', message: '' });

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const newWish = await addWish({
                name: form.name.trim(),
                text: form.text.trim(),
                attendance: form.attendance,
            });

            setWishes((current) => [newWish, ...current]);
            setForm({ name: '', text: '', attendance: 'Hadir' });
            setErrors({});
            setFeedback({ type: 'success', message: 'Ucapan berhasil dikirim.' });
        } catch {
            setFeedback({ type: 'error', message: 'Ucapan gagal dikirim. Silakan coba lagi.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const getAttendanceClass = (attendance) => {
        if (attendance === 'Hadir') return 'bg-c-navy text-c-white';
        if (attendance === 'Belum Pasti') return 'bg-c-sky text-c-navy';
        return 'bg-slate-200 text-slate-700';
    };

    const inputClass = 'w-full rounded-lg border border-slate-300 bg-c-white px-3 py-2 font-josefinsans text-sm text-c-navy placeholder:text-slate-400 transition focus:outline-none focus:ring-2 focus:ring-sky-400 md:text-base';

    return (
        <section id="well-wishes" className='flex min-h-screen items-center justify-center pb-28'>
            <div className='w-full max-w-md px-5 py-16 md:max-w-5xl md:py-20'>
                <SectionTitle subtitle="Sampaikan doa dan ucapan terbaik Anda.">
                    Ucapan &amp; Doa
                </SectionTitle>

                <div className='md:grid md:grid-cols-2 md:items-start md:gap-8'>
                    <Reveal>
                        <Card background='bg-c-white'>
                            <form className='space-y-4 text-left font-josefinsans' onSubmit={handleSubmit} noValidate>
                                <div>
                                    <label htmlFor="wish-name" className='text-xs font-medium text-c-navy'>Nama</label>
                                    <input
                                        id="wish-name"
                                        name="name"
                                        type="text"
                                        value={form.name}
                                        onChange={handleChange}
                                        maxLength={50}
                                        placeholder="Nama Anda"
                                        className={`mt-1 ${inputClass}`}
                                    />
                                    {errors.name ? <p className='mt-1 text-xs text-red-600'>{errors.name}</p> : null}
                                </div>

                                <div>
                                    <label htmlFor="wish-text" className='text-xs font-medium text-c-navy'>Ucapan</label>
                                    <textarea
                                        id="wish-text"
                                        name="text"
                                        value={form.text}
                                        onChange={handleChange}
                                        maxLength={500}
                                        rows={4}
                                        placeholder="Tulis ucapan dan doa..."
                                        className={`mt-1 resize-none ${inputClass}`}
                                    />
                                    {errors.text ? <p className='mt-1 text-xs text-red-600'>{errors.text}</p> : null}
                                </div>

                                <div>
                                    <label htmlFor="wish-attendance" className='text-xs font-medium text-c-navy'>Kehadiran</label>
                                    <select
                                        id="wish-attendance"
                                        name="attendance"
                                        value={form.attendance}
                                        onChange={handleChange}
                                        className={`mt-1 ${inputClass}`}
                                    >
                                        {attendanceOptions.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                    {errors.attendance ? <p className='mt-1 text-xs text-red-600'>{errors.attendance}</p> : null}
                                </div>

                                <div className='flex justify-center pt-1'>
                                    <PrimaryButton type="submit" disabled={isSubmitting}>
                                        <span className='inline-flex items-center gap-2'>
                                            <FaPaperPlane />
                                            {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
                                        </span>
                                    </PrimaryButton>
                                </div>

                                <AnimatePresence initial={false}>
                                    {feedback.message ? (
                                        <motion.p
                                            key={feedback.message}
                                            className={`text-center text-xs ${feedback.type === 'error' ? 'text-red-600' : 'text-c-navy'}`}
                                            role="status"
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -6 }}
                                            transition={{ duration: 0.25, ease: easeOut }}
                                        >
                                            {feedback.message}
                                        </motion.p>
                                    ) : null}
                                </AnimatePresence>
                            </form>
                        </Card>
                    </Reveal>

                    <Reveal className='mt-8 space-y-4 md:mt-0'>
                        {isLoading ? (
                            <p className='text-center font-josefinsans text-sm text-c-muted'>Memuat ucapan...</p>
                        ) : null}

                        {!isLoading && !wishes.length ? (
                            <p className='text-center font-josefinsans text-sm text-c-muted'>
                                Belum ada ucapan. Jadilah yang pertama.
                            </p>
                        ) : null}

                        <AnimatePresence initial={false}>
                            {wishes.map((wish, index) => (
                                <motion.div
                                    key={`${wish.name}-${wish.date}-${index}`}
                                    layout
                                    initial={{ opacity: 0, y: -12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.3, ease: easeOut }}
                                >
                                    <Card background='bg-c-white'>
                                        <div className='text-left font-josefinsans text-c-navy'>
                                            <div className='flex items-start justify-between gap-2'>
                                                <p className='flex items-center gap-2 break-words text-sm font-semibold'>
                                                    <FaUser className='shrink-0 text-c-navy' />
                                                    {wish.name}
                                                </p>
                                                <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-medium ${getAttendanceClass(wish.attendance)}`}>
                                                    {wish.attendance}
                                                </span>
                                            </div>
                                            <p className='mt-2 whitespace-pre-line break-words text-sm leading-relaxed'>
                                                {wish.text}
                                            </p>
                                            <p className='mt-3 text-[10px] text-slate-500'>
                                                {formatDateTime(wish.date)}
                                            </p>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

export default WellWishes;
