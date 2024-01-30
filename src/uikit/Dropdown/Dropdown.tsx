import {
    MouseEventHandler,
    ReactElement,
    useState,
    createContext,
    useContext,
    Dispatch,
    SetStateAction,
    useLayoutEffect,
    useRef,
    CSSProperties
} from 'react';
import './Dropdown.css';
import classNames from 'classnames';
import { useOutsideClick } from '../../hooks/useOutsideClick.tsx';
import { createPortal } from 'react-dom';
import { calculatePositionStyle } from '../../utils/calculatePositionStyle.tsx';

interface DropdownProps {
    onChange: (value: string) => void;
    value: string;
    position: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';
    renderView: (handlers: { selectedValue: string; onClick: MouseEventHandler<HTMLDivElement> }) => ReactElement;
    children?: ReactElement[] | ReactElement;
}

interface DropdownItemProps {
    value: string;
    children?: ReactElement[] | ReactElement;
}

interface DropdownContextProps {
    onChange?: (value: string) => void;
    onSelect?: Dispatch<SetStateAction<HTMLDivElement | null | undefined>>;
    valueContext: string;
}

const DropdownContext = createContext<DropdownContextProps>({ valueContext: '' });

const Dropdown = (props: DropdownProps) => {
    const { renderView, children, value, onChange, position } = props;
    const contentRef = useRef<HTMLDivElement>(null);
    const [positionStyle, setPositionStyle] = useState<CSSProperties>({});
    const [triggerRect, setTriggerRect] = useState<HTMLDivElement | null>();

    useOutsideClick('.dropdown-content', () => {
        setTriggerRect(null);
    });

    const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
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
        <DropdownContext.Provider value={{ valueContext: value, onChange, onSelect: setTriggerRect }}>
            <>
                {renderView({
                    onClick: handleClick,
                    selectedValue: value
                })}
                {triggerRect &&
                    createPortal(
                        <div ref={contentRef} className="dropdown-content" style={{ ...positionStyle }}>
                            {children}
                        </div>,
                        document.body
                    )}
            </>
        </DropdownContext.Provider>
    );
};

Dropdown.Item = ({ children, value }: DropdownItemProps) => {
    const { onChange, valueContext, onSelect } = useContext(DropdownContext);

    const isActiveClass = value === valueContext;
    const activeClassSelector = isActiveClass ? 'dropdown-active' : '';

    const handleClick = () => {
        if (onChange && onSelect) {
            onChange(value);
            onSelect(null);
        }
    };

    return (
        <div className={classNames('dropdown-item', activeClassSelector)} onClick={handleClick}>
            {children}
        </div>
    );
};

export default Dropdown;
