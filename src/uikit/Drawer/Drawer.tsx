import {Fragment, memo, ReactNode, useCallback, useEffect, useRef} from "react";
import { createPortal } from "react-dom";
import './styles.css'
import {Transition} from "@headlessui/react";
//
interface DrawerProps {
    children: ReactNode;
    isOpen?: boolean;
    onClose: () => void;
    position?: "left" | "right" | "top" | "bottom" | 'center';
}
//
// export const Drawer = memo((props: DrawerProps) => {
//     const { children, onClose, isOpen, position = "right" } = props;
//
//     const modalRef = useRef<HTMLDivElement | null>(null);
//
//
//
//     return createPortal(
//
//         <div className='drawer'>
//             <div className="drawer-content" ref={modalRef}>
//                 {children}
//                 <button onClick={close} className="close-button">
//                     Close
//                 </button>
//             </div>
//         </div>,
//         document.body
//     );
// });




export const Drawer = memo((props: DrawerProps) => {
    const { children, onClose, isOpen, position = "right" } = props;

    const modalRef = useRef<HTMLDivElement | null>(null);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        },
        [onClose]
    );

    const handleOutsideClick = useCallback(
        (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
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

    const direction = `drawer ${position}`

    return createPortal(

        <div>

            {position !== 'center' && (
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
                <div className={direction}>
                    <div className="drawer-content" ref={modalRef}>
                        {children}
                        <button onClick={onClose} className="close-button">
                            Close
                        </button>
                    </div>
                </div>
                </Transition>
            )}

            {position === 'center' && (
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
                    <div className='modal'>
                        <div ref={modalRef} className="modal-content">
                            {children}
                            <button onClick={onClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </Transition>
            )}
        </div>,
        document.body
    );
});

