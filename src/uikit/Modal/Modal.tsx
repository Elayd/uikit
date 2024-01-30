import { Transition } from '@headlessui/react';
import { Fragment, ReactNode, MouseEvent, useEffect, useRef, MutableRefObject } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

interface ModalProps {
    children: ReactNode;
    isOpen?: boolean;
    onClose: () => void;
}

const modalStack: MutableRefObject<HTMLDivElement | null>[] = [];

const Modal = (props: ModalProps) => {
    const { children, isOpen = false, onClose } = props;
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && modalRef.current === modalStack[modalStack.length - 1].current) {
                onClose();
            }
        };

        if (isOpen) {
            modalStack.push(modalRef);
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            modalStack.pop();
        };
    }, [isOpen, onClose]);

    const handleCloseOverlay = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === modalRef.current) {
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
            <div className="modal" onClick={handleCloseOverlay} ref={modalRef}>
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
