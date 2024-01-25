import { Fragment, memo, ReactNode, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './styles.css';
import { Transition } from '@headlessui/react';

interface DrawerProps {
    children: ReactNode;
    isOpen?: boolean;
    onClose: () => void;
    position?: 'left' | 'right' | 'top' | 'bottom';
}

export const Drawer = memo((props: DrawerProps) => {
    const { children, onClose, isOpen, position = 'right' } = props;

    const DrawerRef = useRef<HTMLDivElement | null>(null);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        },
        [onClose]
    );

    const handleOutsideClick = useCallback(
        (e: MouseEvent) => {
            if (DrawerRef.current && !DrawerRef.current.contains(e.target as Node)) {
                onClose();
            }
        },
        [onClose]
    );

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, onKeyDown, handleOutsideClick]);

    return createPortal(
        <div>
            <Transition
                show={isOpen}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                as={Fragment}
            >
                <div className={`drawer ${position}`}>
                    <div className="drawer-content" ref={DrawerRef}>
                        {children}
                        <button onClick={onClose} className="close-button">
                            Close
                        </button>
                    </div>
                </div>
            </Transition>
        </div>,
        document.body
    );
});
