import React from "react";
import { Toaster } from "react-hot-toast";

export default function Notification() {
  return (
    <>
      <Toaster
        toastOptions={{
          duration: 2000,
          style: {
            background: "#fff",
            color: "gray",
            fontSize: "14px",
          },
        }}
      />
    </>
  );
}
