import { Outlet } from "react-router-dom";
import TravelContextProvider from "../contexts/TravelContextProvider";

const CustomLayout = () => {
  return (
    <TravelContextProvider>
      <h1>Custom Layout</h1>
      <Outlet></Outlet>
    </TravelContextProvider>
  );
};

export default CustomLayout;
