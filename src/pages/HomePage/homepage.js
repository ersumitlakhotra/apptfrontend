import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/authContext";
const Homepage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleCLick = () => {
        navigate("/profile");
    }
    return (
        <div>
            <h1>Homepage</h1>
            <p>Logged in as: {user}</p>
            <button onClick={logout}>Logout</button>
            <button onClick={handleCLick}>Logout</button>
            
        </div>
    );
};

export default Homepage;

const Profile = () => <h1>Profile</h1>;
const Settings = () => <h1>Settings</h1>;
export { Homepage, Profile, Settings }