import { Fragment, memo, ReactNode, useCallback, useEffect, useRef, MutableRefObject } from 'react';
import { createPortal } from 'react-dom';
import './styles.css';
import { Transition } from '@headlessui/react';

interface DrawerProps {
    children: ReactNode;
    isOpen?: boolean;
    onClose: () => void;
    position?: 'left' | 'right' | 'top' | 'bottom';
}

const drawerStack: MutableRefObject<HTMLDivElement | null>[] = [];

export const Drawer = memo((props: DrawerProps) => {
    const { children, onClose, isOpen, position = 'right' } = props;

    const DrawerRef = useRef<HTMLDivElement | null>(null);
    const handleOutsideClick = useCallback(
        (e: MouseEvent) => {
            if (DrawerRef.current && !DrawerRef.current.contains(e.target as Node)) {
                if (drawerStack.length > 0 && DrawerRef.current === drawerStack[drawerStack.length - 1].current) {
                    onClose();
                }
            }
        },
        [onClose]
    );

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape' && DrawerRef.current === drawerStack[drawerStack.length - 1].current) {
                onClose();
            }
        },
        [onClose]
    );

    useEffect(() => {
        if (isOpen) {
            drawerStack.push(DrawerRef);
            window.addEventListener('keydown', onKeyDown);
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('mousedown', handleOutsideClick);
            drawerStack.pop();
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
