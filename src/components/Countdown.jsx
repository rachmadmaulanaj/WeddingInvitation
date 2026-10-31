import PropTypes from 'prop-types';
import { m as motion } from 'motion/react';
import { isDatePast } from '../utils/date';
import { useCountdown } from '../hooks/useCountdown';

function Countdown({ targetDate }) {
    const timeLeft = useCountdown(targetDate);

    if (!targetDate) {
        return <p className="font-josefinsans text-sm text-c-muted">Tanggal acara belum tersedia.</p>;
    }

    if (!timeLeft) {
        return (
            <p className="font-josefinsans text-sm text-c-muted">
                {isDatePast(targetDate) ? 'Acara telah berlangsung.' : 'Acara segera dimulai.'}
            </p>
        );
    }

    const items = [
        { label: 'Hari', value: timeLeft.days },
        { label: 'Jam', value: timeLeft.hours },
        { label: 'Menit', value: timeLeft.minutes },
        { label: 'Detik', value: timeLeft.seconds },
    ];

    return (
        <div className="grid w-full grid-cols-4 gap-2" aria-label="Hitung mundur acara">
            {items.map((item) => (
                <div key={item.label} className="rounded-lg bg-c-navy px-1 py-3 text-center shadow-sm">
                    <motion.p
                        key={`${item.label}-${item.value}`}
                        className="font-poiretone text-2xl text-c-sky"
                        initial={{ opacity: 0.4, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        {String(item.value).padStart(2, '0')}
                    </motion.p>
                    <p className="mt-1 font-josefinsans text-xs text-c-white">{item.label}</p>
                </div>
            ))}
        </div>
    );
}

Countdown.propTypes = {
    targetDate: PropTypes.string,
};

export default Countdown;
