import products from "../../products";

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      let existingProduct = state.items.find((currentElm) => {
        if (currentElm.id === action.id) {
          toast.warn("Item already in the cart!", {
            position: "top-center",
            toastId: "warn1",
          });
          return currentElm;
        }
      });

      if (existingProduct) {
        let updatedCart = state.items.map((currentElm) => {
          if (currentElm.id === action.id) {
            let newAmount = currentElm.quantity + 1;
            return {
              ...currentElm,
              quantity: newAmount,
            };
          } else {
            return currentElm;
          }
        });
        return {
          ...state,
          items: updatedCart,
        };
      } else {
        let addedProduct = products.filter((currentElm) => {
          if (currentElm.id === action.id) {
            return { currentElm };
          }
        });
        let [selectedProduct] = addedProduct;

        return {
          ...state,
          items: [...state.items, selectedProduct],
        };
      }
    case "INCREMENT_QUANTITY":
      let incrementQuantity = state.items.map((currentElm) => {
        if (currentElm.id === action.id) {
          return { ...currentElm, quantity: currentElm.quantity + 1 };
        }
        return currentElm;
      });

      return {
        ...state,
        items: incrementQuantity,
      };
    case "DECREMENT_QUANTITY":
      let decrementQuantity = state.items.map((currentElm) => {
        if (currentElm.id === action.id) {
          if (currentElm.quantity > 1) {
            return { ...currentElm, quantity: currentElm.quantity - 1 };
          }
        }
        return currentElm;
      });
      return {
        ...state,
        items: decrementQuantity,
      };

    case "REMOVE_PRODUCT":
      let deleteProduct = state.items.filter((item) => {
        if (item.id !== action.id) {
          return item;
        }
      });
      return {
        items: deleteProduct,
      };
    case "CLEAR_ALL":
      return {
        ...state,
        items: [],
      };
  }
};
