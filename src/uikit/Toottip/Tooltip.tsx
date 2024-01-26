import { CSSProperties, FC, memo, MouseEventHandler, ReactElement, ReactNode, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './Tooltip.css';
import classNames from 'classnames';
import { calculatePositionStyle } from '../../utils/calculatePositionStyle.tsx';

interface TooltipProps {
    content: ReactNode;
    position: 'top' | 'bottom' | 'left' | 'right';
    children: (handlers: {
        onMouseEnter: MouseEventHandler<HTMLDivElement>;
        onMouseLeave: MouseEventHandler<HTMLDivElement>;
    }) => ReactElement;
}

export const Tooltip: FC<TooltipProps> = memo(({ content, position, children }) => {
    const [positionStyle, setPositionStyle] = useState<CSSProperties>({});
    const [triggerRect, setTriggerRect] = useState<HTMLDivElement | null>();
    const contentRef = useRef<HTMLDivElement>(null);
    const handleMouseEnter: MouseEventHandler<HTMLDivElement> = (event) => {
        const rect = event.currentTarget;
        setTriggerRect(rect);
    };

    const handleMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
        setTriggerRect(null);
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
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave
            })}
            {triggerRect &&
                createPortal(
                    <div ref={contentRef} className={classNames('tooltip-content', `tooltip-${position}`)} style={{ ...positionStyle }}>
                        {content}
                    </div>,
                    document.body
                )}
        </>
    );
});
