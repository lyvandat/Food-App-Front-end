import { useReducer } from "react";
import ItemContent from "./ItemContent";

const defaultState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (prevState, action) => {
  if (action.type === "ADD") {
    const totalAmount =
      prevState.totalAmount + action.item.amount * action.item.price;
    const indexItem = prevState.items.findIndex(
      (item) => item.id === action.item.id
    );

    let updateItems;
    if (indexItem >= 0) {
      const existingItem = prevState.items[indexItem];
      const updateItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updateItems = [...prevState.items];
      updateItems[indexItem] = updateItem;
    } else {
      updateItems = prevState.items.concat(action.item);
    }
    return {
      items: updateItems,
      totalAmount,
    };
  } else if (action.type === "REMOVE") {
    const itemDeleteIndex = prevState.items.findIndex(
      (item) => item.id === action.id
    );
    const itemDelete = prevState.items[itemDeleteIndex];
    const newTotal = prevState.totalAmount - itemDelete.price;

    let newItems;
    if (itemDelete.amount <= 1) {
      newItems = prevState.items.filter((item) => item.id !== action.id);
    } else {
      const newItem = { ...itemDelete, amount: itemDelete.amount - 1 };
      newItems = [...prevState.items];
      newItems[itemDeleteIndex] = newItem;
    }

    return {
      items: newItems,
      totalAmount: newTotal,
    };
  } else if (action.type === "SET") {
    const items = action.items;
    const totalAmount = items.reduce((accum, item) => {
      return accum + item.price * item.quantity;
    }, 0);
    console.log("total amount", totalAmount);

    return {
      items,
      totalAmount,
    };
  }
  return defaultState;
};

const ItemContext = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultState);

  const handleAddItem = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };

  const handleDeleteItem = (id) => {
    dispatchCart({ type: "REMOVE", id: id });
  };

  const handleSetItem = (items) => {
    dispatchCart({ type: "SET", items });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    onAdd: handleAddItem,
    onRemove: handleDeleteItem,
    onSet: handleSetItem,
  };

  return (
    <ItemContent.Provider value={cartContext}>
      {props.children}
    </ItemContent.Provider>
  );
};

export default ItemContext;
