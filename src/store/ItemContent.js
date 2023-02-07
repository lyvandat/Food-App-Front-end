import React from "react";

const ItemContent = React.createContext({
  items: [],
  totalAmount: 0,
  onAdd: (item) => {},
  onRemove: (id) => {},
});

export default ItemContent;
