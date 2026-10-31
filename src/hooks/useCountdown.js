import { useEffect, useState } from 'react';
import { getCountdownParts } from '../utils/date';

export function useCountdown(targetDate) {
    const [timeLeft, setTimeLeft] = useState(() => getCountdownParts(targetDate));

    useEffect(() => {
        setTimeLeft(getCountdownParts(targetDate));

        if (!targetDate) return undefined;

        const interval = setInterval(() => {
            setTimeLeft(getCountdownParts(targetDate));
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return timeLeft;
}
