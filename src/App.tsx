import { useState } from 'react';
import { Drawer } from './uikit/Drawer/Drawer.tsx';
import Tooltip from './uikit/Toottip/Tooltip.tsx';
import Dropdown from './uikit/Dropdown/Dropdown.tsx';
import Popover from './uikit/Popover/Popover.tsx';

const App = () => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);

    const switcherDrawer = () => {
        setIsOpenDrawer((prev) => !prev);
    };
    const items = [
        {
            id: 1,
            value: 'First'
        },
        {
            id: 2,
            value: 'Second'
        },
        {
            id: 3,
            value: 'Third'
        }
    ];

    return (
        <div>
            <Drawer isOpen={isOpenDrawer} onClose={switcherDrawer} position="right">
                <h1 style={{ color: 'black' }}>HELLO</h1>
            </Drawer>

            <div style={{ marginTop: 100, marginLeft: 100, display: 'flex', justifyContent: 'space-between' }}>
                <Tooltip text="test" position="bottom">
                    <div>Bottom</div>
                </Tooltip>
                <Tooltip text="test" position="right">
                    <div>right</div>
                </Tooltip>
                <Tooltip text="test" position="left">
                    <div>left</div>
                </Tooltip>
                <Tooltip text="test" position="top">
                    <div>top</div>
                </Tooltip>
            </div>
            <div style={{ marginTop: 100, marginLeft: 100, display: 'flex', justifyContent: 'space-between' }}>
                <Dropdown items={items} title="bottomLeft" position="bottomLeft" />
                <Dropdown items={items} title="bottomRight" position="bottomRight" />
                <Dropdown items={items} title="topLeft" position="topLeft" />
                <Dropdown items={items} title="topRight" position="topRight" />
            </div>
            <div style={{ marginTop: 100, marginLeft: 100, display: 'flex', justifyContent: 'space-between' }}>
                <Popover title="topright" position="topRight">
                    <>
                        <div>HELLO</div>
                        <div>HELLO</div>
                        <div>HELLO</div>
                    </>
                </Popover>
                <Popover title="topLeft" position="topLeft">
                    <>
                        <div>HELLO</div>
                        <div>HELLO</div>
                        <div>HELLO</div>
                    </>
                </Popover>
                <Popover title="bottomRight" position="bottomRight">
                    <>
                        <div>HELLO</div>
                        <div>HELLO</div>
                        <div>HELLO</div>
                    </>
                </Popover>
                <Popover title="bottomLeft" position="bottomLeft">
                    <>
                        <div>HELLO</div>
                        <div>HELLO</div>
                        <div>HELLO</div>
                    </>
                </Popover>
            </div>

            <button onClick={switcherDrawer}>open Drawer</button>
        </div>
    );
};

export default App;
