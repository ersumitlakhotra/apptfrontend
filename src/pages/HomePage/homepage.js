import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/authContext";
import CardSquare from "./card";
import ProfileCard from "../Setting/profileCard";
const Homepage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleCLick = () => {
        navigate("/profile");
    }
    return (
        <div class='flex flex-col gap-4 p-4 '>
            <div class='w-full flex flex-row gap-8'>
                <div class='w-4/12 flex flex-col gap-4'>
                       <ProfileCard/>
                    <div class='w-full  border rounded bg-red-200'>
                        3

                    </div>
                </div>
                <div class='w-4/12 border'>
                    a
                </div>
                <div class='w-4/12 border'>
                    a
                </div>

            </div>

        </div>
    );
};

export default Homepage;

const Profile = () => <h1>Profile</h1>;
const Settings = () => <h1>Settings</h1>;
export { Homepage, Profile, Settings }