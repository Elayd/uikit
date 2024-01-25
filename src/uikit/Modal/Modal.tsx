import { Transition } from '@headlessui/react';
import { Fragment, ReactNode, MouseEvent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';
interface ModalProps {
    children: ReactNode;
    isOpen?: boolean;
    onClose: () => void;
}
const Modal = (props: ModalProps) => {
    const { children, isOpen = false, onClose } = props;

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onClose]);

    const handleCloseOverlay = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

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
            <div className="modal" onClick={handleCloseOverlay}>
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
