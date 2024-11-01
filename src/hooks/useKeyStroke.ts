import {useEffect} from "react";

// onKeyStroke
export function useKeyStroke(key: string, callback: (event: KeyboardEvent) => void) {
    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (event.key === key) {
                callback(event);
            }
        };

        window.addEventListener('keydown', handler);
        return () => {
            window.removeEventListener('keydown', handler);
        };
    }, [key, callback]);
}
