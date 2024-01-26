import { Tooltip } from './uikit/Toottip/Tooltip.tsx';

import './App.css';
import { Popover } from './uikit/Popover/Popover.tsx';
import Dropdown from './uikit/Dropdown/Dropdown.tsx';
import Modal from './uikit/Modal/Modal.tsx';
import { useState } from 'react';

const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => {
        setIsOpen(false);
    };
    const [value, setValue] = useState<string>('test');

    const handleChange = (selected: string) => {
        setValue(selected);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 100, gap: 20 }}>
            <button onClick={() => setIsOpen(true)}>Modal</button>

            <Modal isOpen={isOpen} onClose={handleClose}>
                <div>Hello</div>
            </Modal>

            <Dropdown
                position="topLeft"
                onChange={handleChange}
                value={value}
                renderView={({ selectedValue, onClick }) => (
                    <div style={{ border: '2px black solid' }} onClick={onClick}>
                        {selectedValue}
                    </div>
                )}
            >
                <Dropdown.Item value="hello">
                    <div>hello</div>
                </Dropdown.Item>
                <Dropdown.Item value="bye">
                    <div>bye</div>
                </Dropdown.Item>
            </Dropdown>
            <Tooltip content={<div>Left</div>} position="left">
                {({ onMouseEnter, onMouseLeave }) => (
                    <div
                        style={{ width: 50, height: 50, border: '1px solid gray' }}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        Left
                    </div>
                )}
            </Tooltip>
            <Tooltip content={<div>Right</div>} position="right">
                {({ onMouseEnter, onMouseLeave }) => (
                    <div
                        style={{ width: 50, height: 50, border: '1px solid gray' }}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        Right
                    </div>
                )}
            </Tooltip>
            <Tooltip content={<div>top</div>} position="top">
                {({ onMouseEnter, onMouseLeave }) => (
                    <div
                        style={{ width: 50, height: 50, border: '1px solid gray' }}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        top
                    </div>
                )}
            </Tooltip>
            <Tooltip content={<div>bottom</div>} position="bottom">
                {({ onMouseEnter, onMouseLeave }) => (
                    <div
                        style={{ width: 50, height: 50, border: '1px solid gray' }}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        bottom
                    </div>
                )}
            </Tooltip>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 100, gap: 20 }}>
                <Popover position="topLeft" content={<div>test</div>}>
                    {({ onClick }) => <button onClick={onClick}>topLeft</button>}
                </Popover>
                <Popover position="topRight" content={<div>test</div>}>
                    {({ onClick }) => <button onClick={onClick}>topRight</button>}
                </Popover>
                <Popover position="bottomLeft" content={<div>test</div>}>
                    {({ onClick }) => <button onClick={onClick}>bottomLeft</button>}
                </Popover>
                <Popover position="bottomRight" content={<div>test</div>}>
                    {({ onClick }) => <button onClick={onClick}>bottomRight</button>}
                </Popover>
            </div>
        </div>
    );
};

export default App;
