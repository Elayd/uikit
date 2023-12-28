import { memo, ReactNode } from "react";
import { useModal } from "../../hooks/useModal.tsx";
import { createPortal } from "react-dom";
import './styles.css'

interface DrawerProps {
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    position?: "left" | "right" | "top" | "bottom";
}

export const Drawer = memo((props: DrawerProps) => {
    const { children, onClose, isOpen, position = "right" } = props;

    const { close, isClosing, isMounted, modalRef } = useModal({
        animationDelay: 300,
        onClose,
        isOpen,
    });

    if (!isMounted) {
        return null;
    }

    const drawerClasses = `drawer ${position}${isOpen ? ' open' : ''}${isClosing ? ' closed' : ''}`;

    return createPortal(
        <div className={drawerClasses}>
            <div className="drawer-content" ref={modalRef}>
                {children}
                <button onClick={close} className="close-button">
                    Close
                </button>
            </div>
        </div>,
        document.body
    );
});
