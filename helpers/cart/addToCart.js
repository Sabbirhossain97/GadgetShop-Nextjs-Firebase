import { message } from "antd";

export const handleCartAction = (state, setIsCartSidebarOpen, user, productId, router, dispatch) => {
    const existingProduct = state.items.find((item) => item.id === productId);
    if (existingProduct) {
        message.error('Product already in the cart!')
    }
    if (!user) {
        message.warning("Please Sign in!")
        setTimeout(() => {
            router.push("/Signin");
        }, 1500);
    } else if (user && !existingProduct) {
        setIsCartSidebarOpen(true)
        message.success("Product added to cart")
        dispatch({ type: "ADD_PRODUCT", id: productId });
    }
};