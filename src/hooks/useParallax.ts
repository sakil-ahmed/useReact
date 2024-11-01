// useParallax
import {RefObject, useEffect, useState} from "react";

export function useParallax(ref: RefObject<HTMLElement>, speed = 1) {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleScroll = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                const scrollY = window.scrollY;
                const elementY = rect.top + scrollY;
                const y = (scrollY - elementY) * speed;
                setPosition({ x: 0, y });
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [ref, speed]);

    return position;
}
