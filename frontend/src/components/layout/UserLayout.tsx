import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";

export default function UserLayout() {
    return (
        <Sidebar>
            <div className="h-full">
                <Outlet />
            </div>
        </Sidebar>
    );
}
