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
    const [positionStyle, setPositionStyle] = useState<CSSProperties>({});
    const [triggerRect, setTriggerRect] = useState<HTMLButtonElement | null>();
    const contentRef = useRef<HTMLDivElement>(null);

    useOutsideClick('.popover-content', () => {
        setTriggerRect(null);
    });

    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        const rect = event.currentTarget;
        setTriggerRect(rect);
    };

    useLayoutEffect(() => {
        if (contentRef.current && triggerRect) {
            const contentRect = contentRef.current.getBoundingClientRect();
            const clickedRect = triggerRect.getBoundingClientRect();
            const positionStyle = calculatePositionStyle(position, clickedRect, contentRect);
            setPositionStyle(positionStyle);
        }
    }, [position, triggerRect]);

    return (
        <>
            {children({
                onClick: handleClick
            })}
            {triggerRect &&
                createPortal(
                    <div ref={contentRef} className={classNames('popover-content', `popover-${position}`)} style={{ ...positionStyle }}>
                        {content}
                    </div>,
                    document.body
                )}
        </>
    );
});
