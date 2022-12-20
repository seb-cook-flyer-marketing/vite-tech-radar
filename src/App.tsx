import Modal from "./components/Modal/Modal";
import Radar from "./components/Radar/Radar";
import { fetchItems } from "./server/cosmos";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import ContextMenu from "./components/ContextMenu/ContextMenu";

function App() {
  const [setup, setSetup] = useState<any>({
    width: 600,
    rings: ["Adopt", "Trial", "Assess", "Hold"],
    quadrants: ["Tools", "Techniques", "Platforms", "Languages"],
    data: [],
  });

  useEffect(() => {
    fetchItems()
      .then((value) => setSetup({ ...setup, data: value }))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="rounded-lg shadow bg-base-200 drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="flex items-center justify-center space-y-0.1 space-y-reverse drawer-content flex-col">
        <Header />
        <div className="mt-10">
          <Radar {...setup} />
        </div>
        <Modal
          onUpdate={(item) =>
            setSetup({ ...setup, data: [...setup.data, item] })
          }
        />
        <ContextMenu />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          <li>
            <label htmlFor="my-modal" className="btn btn-primary">
              Add Item
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
