import { CSSProperties, FC, memo, MouseEventHandler, ReactElement, ReactNode, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import './Popover.css';
import { useOutsideClick } from '../../hooks/useOutsideClick.tsx';
import { calculatePositionStyle } from '../../utils/calculatePositionStyle.tsx';

interface PopoverProps {
    content?: ReactNode;
    position: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';
    children: (handlers: { onClick: MouseEventHandler<HTMLButtonElement> }) => ReactElement;
}

export const Popover: FC<PopoverProps> = memo(({ content, position, children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [positionStyle, setPositionStyle] = useState<CSSProperties>({});
    const [triggerRect, setTriggerRect] = useState<DOMRect>();
    const contentRef = useRef<HTMLDivElement>(null);

    useOutsideClick('.popover-content', () => {
        setIsVisible(false);
    });

    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setTriggerRect(rect);
        setIsVisible(true);
    };

    useLayoutEffect(() => {
        if (isVisible && contentRef.current && triggerRect) {
            const contentRect = contentRef.current.getBoundingClientRect();
            const positionStyle = calculatePositionStyle(position, triggerRect, contentRect);
            setPositionStyle(positionStyle);
        }
    }, [isVisible, position, triggerRect]);

    return (
        <>
            {children({
                onClick: handleClick
            })}
            {isVisible &&
                createPortal(
                    <div ref={contentRef} className={classNames('popover-content', `popover-${position}`)} style={{ ...positionStyle }}>
                        {content}
                    </div>,
                    document.body
                )}
        </>
    );
});
