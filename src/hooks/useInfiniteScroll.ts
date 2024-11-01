// useInfiniteScroll
import {useCallback, useEffect, useRef, useState} from "react";

export function useInfiniteScroll(callback: () => void, options = {}) {
    const [isFetching, setIsFetching] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);

    const lastElementRef = useCallback(
        (node: HTMLElement | null) => {
            if (isFetching) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    setIsFetching(true);
                    callback();
                }
            }, options);

            if (node) observer.current.observe(node);
        },
        [isFetching, callback, options]
    );

    useEffect(() => {
        setIsFetching(false);
    }, [callback]);

    return { lastElementRef, isFetching };
}