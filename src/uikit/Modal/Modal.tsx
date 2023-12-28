import {memo, ReactNode} from "react";
import { createPortal } from "react-dom";
import "./styles.css";
import { useModal } from "../../hooks/useModal.tsx";

interface IModal {
    isOpen?: boolean;
    children: ReactNode;
    onClose?: () => void;
}

const Modal = memo((props: IModal) => {
    const { isOpen, children, onClose } = props;

    const {
        close,
        isClosing,
        isMounted,
        modalRef,
    } = useModal({
        animationDelay: 300,
        onClose,
        isOpen,
        closeOnOutsideClick: true,
    });
    if (!isMounted) {
        return null;
    }

    const modalClasses = `modal${isOpen ? ' open' : ''}${isClosing ? ' closed' : ''}`;

    const modalContent = (
        <div className={modalClasses} >
            <div ref={modalRef} className="modal-content">
                {children}
                <button onClick={close}>
                    Close
                </button>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
});

export default Modal;
