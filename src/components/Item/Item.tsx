import { useState, useContext, useRef, useCallback } from "react";
import { ItemWrapper } from "./Item.style";
import { ThemeContext } from "../theme-context";
import create from "zustand";

interface Item {
  name: string;
  id: string;
  link: string;
  x: number;
  y: number;
  quadrant: string;
  ring: string;
  uid: string;
}

interface MenuStore {
  anchorPoint: { x: number; y: number };
  setAnchorPoint: (point: { x: number; y: number }) => void;
  show: boolean;
  setShow: (show: boolean) => void;
  selectedItem: {
    name: string;
    id: string;
    link: string;
    x: number;
    y: number;
    quadrant: string;
    ring: string;
    uid: string;
  } | null;
  setSelectedItem: (item: Item) => void;
}

const MAX_LENGTH = 15;

export const useStore = create<MenuStore>((set) => ({
  anchorPoint: { x: 0, y: 0 },
  setAnchorPoint: ({ x, y }) => {
    set({ anchorPoint: { x, y } });
  },
  show: false,
  setShow: (show) => set({ show }),
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
})) as any;

function Item(props: ItemProps) {
  //create ref
  let ref = useRef(null);

  console.log(props);

  const { setAnchorPoint, setShow, setSelectedItem } = useStore();

  //context variables
  const { itemFontSize, fontFamily } = useContext(ThemeContext);

  //state variables
  const [isHovered, setIsHovered] = useState(false);

  const shortName =
    props.data.name.length > MAX_LENGTH
      ? props.data.name.substr(0, MAX_LENGTH) + "..."
      : props.data.name;

  const onMouseToggle = () => {
    setIsHovered(!isHovered);
  };

  const handleClick = useCallback(
    (event: any, data: Item) => {
      event.preventDefault();
      setAnchorPoint({ x: event.pageX, y: event.pageY });
      setSelectedItem(data);
      setShow(true);
    },
    [setAnchorPoint, setShow]
  );

  return (
    <>
      <ItemWrapper
        className="blip hover:opacity-100 opacity-70 hover:font-bold font-normal"
        id={"blip-" + props.data.id}
        transform={
          " rotate(" +
          props.rotateDegrees +
          ") translate(" +
          props.data.x +
          "," +
          props.data.y +
          ")"
        }
        onMouseEnter={onMouseToggle}
        onMouseLeave={onMouseToggle}
        ref={ref}
      >
        <circle r={"4px"} />
        <a
          onClick={(e) => {
            handleClick(e, props.data);
          }}
        >
          <text
            dx={"7px"}
            dy={"7px"}
            fontSize={itemFontSize}
            fontFamily={fontFamily}
            fill={isHovered ? "black" : "grey"}
          >
            {isHovered ? props.data.name : shortName}
          </text>
        </a>
      </ItemWrapper>
    </>
  );
}

interface ItemProps {
  rotateDegrees: number;
  data: {
    name: string;
    link: string;
    quadrant: string;
    ring: string;
    id: string;
    x: number;
    y: number;
    uid: string;
  };
}

export default Item;
