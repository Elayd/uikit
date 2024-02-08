import { Transition } from '@headlessui/react';
import { Fragment, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';
import { useLatest } from '../../hooks/useLatest.ts';
import { LayerManager } from '../../utils/LayerManager.ts';

interface ModalProps {
    children: ReactNode;
    isOpen?: boolean;
    onClose: () => void;
}

const layerManager = new LayerManager();

const Modal = (props: ModalProps) => {
    const { children, isOpen = false, onClose } = props;
    const modalRef = useRef<HTMLDivElement | null>(null);
    const latestOnClose = useLatest(onClose);

    useEffect(() => {
        if (isOpen) {
            layerManager.addLayer(latestOnClose.current);
        }
    }, [isOpen]);

    return createPortal(
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
            <div className="modal" ref={modalRef}>
                <div className="modal-overlay" onClick={latestOnClose.current}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        {children}
                        <button onClick={latestOnClose.current}>Close</button>
                    </div>
                </div>
            </div>
        </Transition>,
        document.body
    );
};

export default Modal;
