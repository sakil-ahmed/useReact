// useTextSelection
import {useEffect, useState} from "react";

export function useTextSelection() {
    const [selection, setSelection] = useState('');

    useEffect(() => {
        const handleSelectionChange = () => {
            const selectedText = window.getSelection()?.toString() || '';
            setSelection(selectedText);
        };

        document.addEventListener('selectionchange', handleSelectionChange);

        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange);
        };
    }, []);

    return selection;
}
