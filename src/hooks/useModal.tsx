import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

interface UseModalProps {
    onClose?: () => void;
    isOpen?: boolean;
    animationDelay: number;
    closeOnOutsideClick?: boolean;
}

export function useModal({
                             animationDelay,
                             isOpen,
                             onClose,
                             closeOnOutsideClick = true,
                         }: UseModalProps) {
    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    const close = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
                setIsMounted(false);
            }, animationDelay);
        }
    }, [animationDelay, onClose]);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                close();
            }
        },
        [close]
    );

    const handleOutsideClick = useCallback(
        (e: MouseEvent) => {
            if (closeOnOutsideClick && modalRef.current && !modalRef.current.contains(e.target as Node)) {
                close();
            }
        },
        [close, closeOnOutsideClick]
    );

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, onKeyDown, handleOutsideClick]);

    return {
        isClosing,
        isMounted,
        close,
        modalRef,
    };
}
