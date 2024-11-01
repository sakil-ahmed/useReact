// onStartTyping
import {useEffect} from "react";

export function useStartTyping(callback: () => void) {
    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
                return;
            }
            if (event.key.length === 1) {
                callback();
            }
        };

        window.addEventListener('keydown', handler);
        return () => {
            window.removeEventListener('keydown', handler);
        };
    }, [callback]);
}
