import { useState } from 'react';

export function useGuestName(fallbackName) {
    const [guestName] = useState(() => {
        if (typeof window === 'undefined') return fallbackName;

        const value = new URLSearchParams(window.location.search).get('to');
        return value?.trim() || fallbackName;
    });

    return guestName;
}
