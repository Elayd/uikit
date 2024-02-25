import { Tooltip } from './uikit/Toottip/Tooltip.tsx';
import './App.css';
import { Popover } from './uikit/Popover/Popover.tsx';
import Dropdown from './uikit/Dropdown/Dropdown.tsx';
import Modal from './uikit/Modal/Modal.tsx';
import { useState } from 'react';
import { Drawer } from './uikit/Drawer/Drawer.tsx';
import Autocomplete from './uikit/AutoComplete/Autocomplete.tsx';

const App = () => {
    const [value, setValue] = useState<string>('test');

    const handleChange = (selected: string) => {
        setValue(selected);
    };

    const [firstModalOpen, setFirstModalOpen] = useState(false);
    const [secondModalOpen, setSecondModalOpen] = useState(false);
    const [thirdModalOpen, setThirdModalOpen] = useState(false);

    const [firstDrawerOpen, setFirstDrawerOpen] = useState(false);
    const [secondDrawerOpen, setSecondDrawerOpen] = useState(false);

    const options = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Kiwi', 'Lemon'];

    const [selectedValue, setSelectedValue] = useState<string>('');

    const handleChange1 = (value: string) => {
        setSelectedValue(value);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 100, gap: 20 }}>
            <>
                <button onClick={() => setFirstModalOpen(true)}>Open First Modal</button>
                <Autocomplete
                    onChange={handleChange1}
                    value={selectedValue}
                    options={options}
                    renderOptions={(options: string[], onItemClick: (value: string) => void) => {
                        return (
                            <ul>
                                {options.map((option) => (
                                    <li key={option} onClick={() => onItemClick(option)}>
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        );
                    }}
                />
                <button onClick={() => setFirstDrawerOpen(true)}>Open First Drawer</button>

                <Modal isOpen={firstModalOpen} onClose={() => setFirstModalOpen(false)}>
                    <p>Content of the First Modal</p>
                    <button onClick={() => setSecondModalOpen(true)}>Open Second Modal</button>
                    <Modal isOpen={secondModalOpen} onClose={() => setSecondModalOpen(false)}>
                        <p>Content of the Second Modal</p>
                        <button onClick={() => setThirdModalOpen(true)}>Open Third Modal</button>
                        <Modal isOpen={thirdModalOpen} onClose={() => setThirdModalOpen(false)}>
                            <p>Content of the Third Modal</p>
                        </Modal>
                    </Modal>
                </Modal>
            </>

            <>
                <Drawer isOpen={firstDrawerOpen} onClose={() => setFirstDrawerOpen(false)}>
                    <button onClick={() => setSecondDrawerOpen(true)}>Open Second Drawer</button>
                    <p>Content of the First Drawer</p>
                </Drawer>
                <Drawer isOpen={secondDrawerOpen} onClose={() => setSecondDrawerOpen(false)}>
                    <p>Content of the Second Drawer</p>
                </Drawer>
            </>
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
