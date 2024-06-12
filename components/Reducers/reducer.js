import products from "../../products";

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      const existingProduct = state.items.find((item) => item.id === action.id);
      if (existingProduct) {
        const updatedCart = state.items.map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedCart,
        };
      } else {
        const addedProduct = products.find((item) => item.id === action.id);
        if (addedProduct) {
          return {
            ...state,
            items: [...state.items, { ...addedProduct, quantity: 1 }],
          };
        }
        return state; 
      }

    case "INCREMENT_QUANTITY":
      const incrementQuantity = state.items.map((item) =>
        item.id === action.id && item.quantity < item.rating.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return {
        ...state,
        items: incrementQuantity,
      };

    case "DECREMENT_QUANTITY":
      const decrementQuantity = state.items.map((item) =>
        item.id === action.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      return {
        ...state,
        items: decrementQuantity,
      };

    case "REMOVE_PRODUCT":
      const deleteProduct = state.items.filter((item) => item.id !== action.id);
      return {
        ...state,
        items: deleteProduct,
      };

    case "CLEAR_ALL":
      return {
        ...state,
        items: [],
      };

    default:
      return state; 
  }
};