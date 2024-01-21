import { memo, ReactElement, useState } from 'react';
import './Tooltip.css';
import classNames from 'classnames';
interface TooltipProps {
    text: string;
    children: ReactElement;
    position?: 'left' | 'right' | 'top' | 'bottom';
}
const Tooltip = memo((props: TooltipProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const { text, children, position = 'top' } = props;

    return (
        <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
            {isVisible && (
                <div className={classNames('tooltip', `tooltip-${position}`)}>
                    <div className="tooltip-content">{text}</div>
                </div>
            )}
            {children}
        </div>
    );
});

export default Tooltip;
