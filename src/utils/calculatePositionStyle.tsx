type PositionProps = 'left' | 'right' | 'bottom' | 'top' | 'autoComplete' | 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';
export const calculatePositionStyle = (position: PositionProps, rect: DOMRect, contentRect: DOMRect) => {
    switch (position) {
        case 'top':
            return {
                top: rect.top - contentRect.height,
                left: rect.left + contentRect.width / 2
            };
        case 'bottom':
            return {
                top: rect.bottom,
                left: rect.left - contentRect.width / 2
            };
        case 'left':
            return {
                top: rect.top + contentRect.height / 2,
                left: rect.left - rect.width
            };
        case 'right':
            return {
                top: rect.top + contentRect.height / 2,
                left: rect.right
            };
        case 'topRight':
            return {
                top: rect.top - contentRect?.height,
                left: rect.right
            };
        case 'topLeft':
            return {
                top: rect.top - contentRect.height,
                left: rect.left - contentRect.width
            };
        case 'bottomRight':
            return {
                top: rect.bottom,
                left: rect.right
            };
        case 'bottomLeft':
            return {
                top: rect.bottom,
                left: rect.left - contentRect.width
            };
        case 'autoComplete':
            return {
                top: rect.bottom,
                left: rect.left
            };
        default:
            return {};
    }
};
