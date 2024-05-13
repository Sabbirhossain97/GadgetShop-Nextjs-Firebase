import { message } from "antd";

export const handleCartAction = (user,id,router,dispatch) => {
    if (!user) {
        message.warning("Please Sign in!")
        setTimeout(() => {
            router.push("/Signin");
        }, 2000);
    } else {
        message.success("Product added to cart")
        dispatch({ type: "ADD_PRODUCT", id: id });
    }
};