import { Tooltip } from './uikit/Toottip/Tooltip.tsx';

import './App.css';
import { Popover } from './uikit/Popover/Popover.tsx';
import Dropdown from './uikit/Dropdown/Dropdown.tsx';

const App = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 100, gap: 20 }}>
            <Dropdown
                renderView={({ selectedValue, onClick }) => (
                    <p>
                        {selectedValue}
                        <div onClick={onClick} className="small-text">
                            Hello world!
                        </div>
                    </p>
                )}
            >
                <>
                    <Dropdown.Item>
                        <div>hello</div>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <div>hello</div>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <div>hello</div>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <div>hello</div>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <div>hello</div>
                    </Dropdown.Item>
                </>
            </Dropdown>
            ;{/*<Tooltip content={<div>Left</div>} position="left">*/}
            {/*    {({ onMouseEnter, onMouseLeave }) => (*/}
            {/*        <div*/}
            {/*            style={{ width: 50, height: 50, border: '1px solid gray' }}*/}
            {/*            onMouseEnter={onMouseEnter}*/}
            {/*            onMouseLeave={onMouseLeave}*/}
            {/*        >*/}
            {/*            Left*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</Tooltip>*/}
            {/*<Tooltip content={<div>Right</div>} position="right">*/}
            {/*    {({ onMouseEnter, onMouseLeave }) => (*/}
            {/*        <div*/}
            {/*            style={{ width: 50, height: 50, border: '1px solid gray' }}*/}
            {/*            onMouseEnter={onMouseEnter}*/}
            {/*            onMouseLeave={onMouseLeave}*/}
            {/*        >*/}
            {/*            Right*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</Tooltip>*/}
            {/*<Tooltip content={<div>top</div>} position="top">*/}
            {/*    {({ onMouseEnter, onMouseLeave }) => (*/}
            {/*        <div*/}
            {/*            style={{ width: 50, height: 50, border: '1px solid gray' }}*/}
            {/*            onMouseEnter={onMouseEnter}*/}
            {/*            onMouseLeave={onMouseLeave}*/}
            {/*        >*/}
            {/*            top*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</Tooltip>*/}
            {/*<Tooltip content={<div>bottom</div>} position="bottom">*/}
            {/*    {({ onMouseEnter, onMouseLeave }) => (*/}
            {/*        <div*/}
            {/*            style={{ width: 50, height: 50, border: '1px solid gray' }}*/}
            {/*            onMouseEnter={onMouseEnter}*/}
            {/*            onMouseLeave={onMouseLeave}*/}
            {/*        >*/}
            {/*            bottom*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</Tooltip>*/}
            {/*<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 100, gap: 20 }}>*/}
            {/*    <Popover position="topLeft" content={<div>test</div>}>*/}
            {/*        {({ onClick }) => <button onClick={onClick}>topLeft</button>}*/}
            {/*    </Popover>*/}
            {/*    <Popover position="topRight" content={<div>test</div>}>*/}
            {/*        {({ onClick }) => <button onClick={onClick}>topRight</button>}*/}
            {/*    </Popover>*/}
            {/*    <Popover position="bottomLeft" content={<div>test</div>}>*/}
            {/*        {({ onClick }) => <button onClick={onClick}>bottomLeft</button>}*/}
            {/*    </Popover>*/}
            {/*    <Popover position="bottomRight" content={<div>test</div>}>*/}
            {/*        {({ onClick }) => <button onClick={onClick}>bottomRight</button>}*/}
            {/*    </Popover>*/}
            {/*</div>*/}
        </div>
    );
};

export default App;
