// onLongPress
import {useEffect, useState} from "react";

export function useLongPress(callback: () => void, ms = 300) {
    const [startLongPress, setStartLongPress] = useState(false);

    useEffect(() => {
        let timerId: NodeJS.Timeout;
        if (startLongPress) {
            timerId = setTimeout(callback, ms);
        } else {
            // @ts-ignore
            clearTimeout(timerId);
        }

        return () => {
            clearTimeout(timerId);
        };
    }, [callback, ms, startLongPress]);

    return {
        onMouseDown: () => setStartLongPress(true),
        onMouseUp: () => setStartLongPress(false),
        onMouseLeave: () => setStartLongPress(false),
        onTouchStart: () => setStartLongPress(true),
        onTouchEnd: () => setStartLongPress(false),
    };
}
