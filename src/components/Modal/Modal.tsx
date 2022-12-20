import { Fragment, useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
const rings = ["Adopt", "Trial", "Assess", "Hold"];
const quadrants = ["Tools", "Techniques", "Platforms", "Languages"];
import { addItem } from "../../server/cosmos";

type Item = {
  id: string;
  name: string;
  quadrant: string;
  ring: string;
  link: string;
};

type Modal = {
  onUpdate: (item: Item) => void;
};

export default function Modal({ onUpdate }: Modal) {
  const defaultId = nanoid();
  const [ring, setRing] = useState<string>("Adopt");
  const [id, setId] = useState<string>(defaultId);
  const [quadrant, setQuadrant] = useState<string>("Tools");
  const [name, setName] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const validate = () => {
    return ring.length * quadrant.length * name.length * link.length;
  };

  return (
    <Fragment>
      <form className="form-control">
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add a new item</h3>
            <div className="py-4 space-y-2">
              <input
                value={name}
                type="text"
                className="input input-bordered w-full max-w-xs"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <select
                className="select select-bordered w-full max-w-xs"
                onChange={(e) => setQuadrant(e.target.value)}
                value={quadrant}
              >
                {quadrants.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                className="select select-bordered w-full max-w-xs"
                onChange={(e) => setRing(e.target.value)}
                value={ring}
              >
                {rings.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                placeholder="Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
            <div className="modal-action">
              <label htmlFor="my-modal" className="btn btn-primary">
                Cancel
              </label>
              <label
                htmlFor="my-modal"
                className={`btn ${
                  !validate() ? "btn-disabled" : "btn-primary"
                }`}
                onClick={async (e) =>
                  await addItem({
                    id: id,
                    name: name,
                    quadrant: quadrant,
                    ring: ring,
                    link: link,
                  })
                    .then(() =>
                      onUpdate({
                        id: id,
                        name: name,
                        quadrant: quadrant,
                        ring: ring,
                        link: link,
                      })
                    )
                    .then(() => {
                      setName("");
                      setId(nanoid());
                      setQuadrant("");
                      setRing("");
                      setLink("");
                    })
                }
              >
                Submit
              </label>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
}
