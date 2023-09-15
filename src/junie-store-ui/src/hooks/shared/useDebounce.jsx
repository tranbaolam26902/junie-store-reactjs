// Libraries
import { useEffect, useState } from 'react';

export default function useDebounce(value, delay) {
    // States
    const [debouncedValue, setDebouncedValue] = useState(value);

    // Side effects
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
