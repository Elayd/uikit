import { MouseEventHandler, ReactElement, ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

interface DropdownProps {
    position?: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';
    renderView: (handlers: { selectedValue: string; onClick: MouseEventHandler<HTMLDivElement> }) => ReactElement;
    children?: ReactElement;
}
interface DropdownItemProps {
    value?: string;
    children?: ReactElement;
}

const Dropdown = (props: DropdownProps) => {
    const { renderView, children } = props;
    const [value, setValue] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    console.log(isVisible);

    const handleClick = () => {
        setIsVisible(true);
    };
    return (
        <>
            {renderView({
                onClick: handleClick,
                selectedValue: value
            })}
            {
                isVisible && (
                    // createPortal(
                    <div className={classNames('tooltip-content')}>{children}</div>
                )
                // document.body
            }
        </>
    );
};

Dropdown.Item = ({ value, children }: DropdownItemProps) => {
    return <div className="dropdown-item">{children}</div>;
};

export default Dropdown;
