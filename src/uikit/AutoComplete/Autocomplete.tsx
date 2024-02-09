import { ChangeEvent, CSSProperties, FC, memo, MouseEventHandler, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce.tsx';
import './Autocomplete.css';
import { useLatest } from '../../hooks/useLatest.ts';
import { createPortal } from 'react-dom';
import { useOutsideClick } from '../../hooks/useOutsideClick.tsx';
import { calculatePositionStyle } from '../../utils/calculatePositionStyle.tsx';

interface AutoCompleteProps {
    asyncGetData: (query: string) => Promise<string[]>;
}

const AutoComplete: FC<AutoCompleteProps> = memo(({ asyncGetData }) => {
    const latestAsyncFunc = useLatest(asyncGetData);
    const [inputValue, setInputValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isItemSelected, setIsItemSelected] = useState<boolean>(false);
    const contentRef = useRef<HTMLUListElement>(null);
    const [triggerRect, setTriggerRect] = useState<HTMLInputElement | null>();
    const [positionStyle, setPositionStyle] = useState<CSSProperties>({});

    const debouncedInputValue = useDebounce<string>(inputValue, 300);

    useEffect(() => {
        if (debouncedInputValue && !isItemSelected) {
            latestAsyncFunc.current(debouncedInputValue).then((data) => {
                setSuggestions(data);
            });
        }
    }, [debouncedInputValue, latestAsyncFunc, isItemSelected]);

    useOutsideClick(contentRef, () => {
        setTriggerRect(null);
    });
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        setIsItemSelected(false);
    };

    const handleItemClick = (item: string) => {
        setInputValue(item);
        setSuggestions([]);
        setIsItemSelected(true);
    };

    const handleClick: MouseEventHandler<HTMLInputElement> = (event) => {
        const rect = event.currentTarget;
        setTriggerRect(rect);
    };

    useLayoutEffect(() => {
        if (contentRef.current && triggerRect) {
            const contentRect = contentRef.current.getBoundingClientRect();
            const clickedRect = triggerRect.getBoundingClientRect();
            const positionStyle = calculatePositionStyle('autoComplete', clickedRect, contentRect);
            setPositionStyle(positionStyle);
        }
    }, [triggerRect]);
    return (
        <div className="autocomplete-container">
            <input
                type="text"
                onClick={handleClick}
                value={inputValue}
                onChange={handleChange}
                placeholder="Type something..."
                className="autocomplete-input"
            />
            {triggerRect &&
                createPortal(
                    <ul ref={contentRef} className="autocomplete-suggestions" style={{ ...positionStyle }}>
                        {suggestions.map((item, index) => (
                            <li key={index} onClick={() => handleItemClick(item)}>
                                {item}
                            </li>
                        ))}
                    </ul>,
                    document.body
                )}
        </div>
    );
});

export default AutoComplete;
