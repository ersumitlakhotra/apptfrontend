import { Outlet, Link } from "react-router-dom";
import { useAuth } from "./authContext";

const ProtectedLayout = () => {
    const { logout } = useAuth();

    return (
        <div style={{ display: "flex" }}>
            {/* Sidebar */}
            <aside style={{ width: "200px", background: "#eee" }}>
                <h3>App</h3>
                <nav>
                    <Link to="/home">Dashboard</Link><br />
                    <Link to="/profile">Profile</Link><br />
                    <Link to="/settings">Settings</Link><br />
                    <button onClick={logout}>Logout</button>
                </nav>
            </aside>

            {/* Main content */}
            <main style={{ padding: "20px", flex: 1 }}>
                <Outlet />
            </main>
        </div>
    );
};

export default ProtectedLayout;