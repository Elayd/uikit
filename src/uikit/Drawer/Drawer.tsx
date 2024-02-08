import { Fragment, memo, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './styles.css';
import { Transition } from '@headlessui/react';
import { useLatest } from '../../hooks/useLatest.ts';
import { LayerManager } from '../../utils/LayerManager.ts';
import { useOutsideClick } from '../../hooks/useOutsideClick.tsx';

interface DrawerProps {
    children: ReactNode;
    isOpen?: boolean;
    onClose: () => void;
    position?: 'left' | 'right' | 'top' | 'bottom';
}

const layerManager = new LayerManager();

export const Drawer = memo((props: DrawerProps) => {
    const { children, onClose, isOpen, position = 'right' } = props;

    const latestOnClose = useLatest(onClose);

    const DrawerRef = useRef<HTMLDivElement | null>(null);

    useOutsideClick(DrawerRef, () => {
        latestOnClose.current();
    });

    useEffect(() => {
        if (isOpen) {
            layerManager.addLayer(latestOnClose.current);
        }
    }, [isOpen]);

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
                        <button onClick={latestOnClose.current} className="close-button">
                            Close
                        </button>
                    </div>
                </div>
            </Transition>
        </div>,
        document.body
    );
});
