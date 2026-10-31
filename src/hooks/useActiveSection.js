import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds) {
    const [activeSection, setActiveSection] = useState(sectionIds[0] || '');

    useEffect(() => {
        if (!sectionIds.length) return undefined;

        const sections = sectionIds
            .map((sectionId) => document.getElementById(sectionId))
            .filter(Boolean);

        if (!sections.length) return undefined;

        const ratios = new Map();

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                ratios.set(entry.target.id, entry.intersectionRatio);
            });

            let nextSection = '';
            let highestRatio = 0;

            ratios.forEach((ratio, sectionId) => {
                if (ratio > highestRatio) {
                    highestRatio = ratio;
                    nextSection = sectionId;
                }
            });

            if (nextSection) {
                setActiveSection(nextSection);
            }
        }, {
            threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        });

        sections.forEach((section) => observer.observe(section));

        return () => {
            observer.disconnect();
            ratios.clear();
        };
    }, [sectionIds]);

    return activeSection;
}
