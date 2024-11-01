// useElementByPoint
import {useEffect, useState} from "react";

export function useElementByPoint(x: number, y: number) {
    const [element, setElement] = useState<Element | null>(null);

    useEffect(() => {
        const el = document.elementFromPoint(x, y);
        setElement(el);
    }, [x, y]);

    return element;
}