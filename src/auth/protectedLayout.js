import { Outlet, Link } from "react-router-dom";
import { useAuth } from "./authContext";
import Header from "../pages/HomePage/header";

const ProtectedLayout = () => {
    const { logout } = useAuth();

    return (
        <div class='h-screen w-full flex flex-col '>
            <Header />

            <main class="flex-1 bg-gray-50 px-8 py-2 scroll-auto">
                <Outlet />
            </main>
            <footer class="h-16 bg-gray-300">Fotter</footer>

            {/* Sidebar 
            <aside style={{ width: "200px", background: "#eee" }}>
                <h3>App</h3>
                <nav>
                    <Link to="/home">Dashboard</Link><br />
                    <Link to="/profile">Profile</Link><br />
                    <Link to="/settings">Settings</Link><br />
                    <button onClick={logout}>Logout</button>
                </nav>
            </aside>

            {/* Main content
            <main style={{ padding: "20px", flex: 1 }}>
                <Outlet />
            </main>
            */}
        </div>
    );
};

export default ProtectedLayout;