import { Transition } from '@headlessui/react';
import { Fragment, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';
import { useLatest } from '../../hooks/useLatest.ts';
import { layerManager } from '../../utils/LayerManager.ts';

interface ModalProps {
    children: ReactNode;
    isOpen?: boolean;
    onClose: () => void;
}

const Modal = (props: ModalProps) => {
    const { children, isOpen = false, onClose } = props;
    const latestOnClose = useLatest(onClose);

    useEffect(() => {
        if (!isOpen) {
            return;
        }
        return layerManager.addLayer(latestOnClose.current);
    }, [isOpen, latestOnClose]);

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
            <div className="modal">
                <div className="modal-overlay" onClick={onClose} />
                <div className="modal-content">
                    {children}
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </Transition>,
        document.body
    );
};

export default Modal;
