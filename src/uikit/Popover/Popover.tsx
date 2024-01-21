import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './Popover.css';

interface PopoverProps {
    children: ReactElement;
    position?: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';
    title: string;
}
const Popover = (props: PopoverProps) => {
    const { position, children, title } = props;
    const [isVisible, setIsVisible] = useState(false);
    const popoverRef = useRef<HTMLDivElement | null>(null);

    const handleOutsideClick = useCallback(
        (e: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
                setIsVisible(false);
            }
        },
        [setIsVisible]
    );

    useEffect(() => {
        if (isVisible) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isVisible, handleOutsideClick]);

    return (
        <div ref={popoverRef} className="popover-wrapper">
            <button onClick={() => setIsVisible(true)}>{title}</button>
            {isVisible && <div className={classNames('popover-content', `popover-content-${position}`)}>{children}</div>}
        </div>
    );
};

export default Popover;
