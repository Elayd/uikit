import React, { CSSProperties, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { calculatePositionStyle } from '../../utils/calculatePositionStyle.tsx';
import { useOutsideClick } from '../../hooks/useOutsideClick.tsx';
import './Autocomplete.css';

interface AutocompleteProps {
    onChange: (value: string) => void;
    value: string;
    options: string[];
    renderOptions: (options: string[], onItemClick: (value: string) => void) => React.ReactElement;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ onChange, value, options, renderOptions }) => {
    const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
    const handleInputChange = (value: string) => {
        const filtered = options.filter((option) => option.toLowerCase().includes(value.toLowerCase()));
        setFilteredOptions(filtered);
        onChange(value);
    };
    const contentRef = useRef<HTMLInputElement>(null);
    const [positionStyle, setPositionStyle] = useState<CSSProperties>({});
    const [triggerRect, setTriggerRect] = useState<HTMLDivElement | null>();

    useOutsideClick(contentRef, () => {
        setTriggerRect(null);
    });

    const handleItemClick = (value: string) => {
        onChange(value);
        setFilteredOptions([]);
        setTriggerRect(null);
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
        <div>
            <input
                ref={contentRef}
                type="text"
                value={value}
                onClick={(event) => setTriggerRect(event.currentTarget)}
                onChange={(e) => handleInputChange(e.target.value)}
            />

            {triggerRect &&
                filteredOptions.length > 0 &&
                createPortal(
                    <div ref={contentRef} className="autocomplete-suggestions" style={{ ...positionStyle }}>
                        {renderOptions(filteredOptions, handleItemClick)}
                    </div>,
                    document.body
                )}
        </div>
    );
};

export default Autocomplete;
