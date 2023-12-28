import {useState} from "react";
import Modal from "./uikit/Modal/Modal.tsx";
import {Drawer} from "./uikit/Drawer/Drawer.tsx";

const App = () => {
    const [isOpenModel, setIsOpenModel] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);

    const switcherModal = () => {
        setIsOpenModel((prev) => !prev)
    }
    const switcherDrawer = () => {
        setIsOpenDrawer((prev) => !prev)
    }


    return (
        <div>
            <Modal isOpen={isOpenModel} onClose={switcherModal}>
                <h1 style={{color: "black"}}>
                    HELLO
                </h1>
            </Modal>
            <Drawer isOpen={isOpenDrawer} onClose={switcherDrawer} position='right'>
                <h1 style={{color: "black"}}>
                    HELLO
                </h1>
            </Drawer>
            <button onClick={switcherModal}>
                open Modal
            </button>
            <button onClick={switcherDrawer}>
                open Drawer
            </button>
        </div>
    );
};

export default App;
