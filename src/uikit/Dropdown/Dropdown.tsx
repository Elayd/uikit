import { memo, useCallback, useEffect, useRef, useState } from 'react';
import './Dropdown.css';
import classNames from 'classnames';

type Items = {
    id: number;
    value: string;
};

interface DropdownProps {
    items: Items[];
    position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
    title: string;
    href?: string;
}

const Dropdown = memo((props: DropdownProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);

    const { position, items, title } = props;
    const menuRef = useRef<HTMLDivElement | null>(null);

    const handleOutsideClick = useCallback(
        (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsVisible(false);
            }
        },
        [setIsVisible]
    );

    const handleItemClick = (itemId: number) => {
        setSelectedItem(itemId);
        setIsVisible(false);
    };

    useEffect(() => {
        if (isVisible) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isVisible, handleOutsideClick]);

    return (
        <div className="dropdown-wrapper" ref={menuRef} onClick={() => setIsVisible(!isVisible)}>
            {title}
            {isVisible && (
                <div className={classNames('dropdown-content', `dropdown-content-${position}`)}>
                    <div className="dropdown-content-links">
                        {items.map((item) => (
                            <button
                                key={item.id}
                                className={classNames('dropdown-item', { 'dropdown-item-active': selectedItem === item.id })}
                                onMouseEnter={() => setSelectedItem(item.id)}
                                onMouseLeave={() => setSelectedItem(null)}
                                onClick={() => handleItemClick(item.id)}
                            >
                                {item.value}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
});

export default Dropdown;
