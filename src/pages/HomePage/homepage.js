import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/authContext";
import CardSquare from "./card";
import ProfileCard from "../Setting/profileCard";
import CalenderCard from "./calenderCard";
import Schedule from "../../components/Dashboard/Schedule/schedule";
const Homepage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleCLick = () => {
        navigate("/profile");
    }
    return (
        <div class='flex flex-col gap-4 p-4 '>

            <div class='w-full flex flex-col md:flex-row gap-4'>
                <div class='w-full md:w-4/12 flex flex-col gap-4'>
                    <ProfileCard />
                    <CalenderCard />
                </div>
                <div class='w-full md:w-4/12 border'>
                    a
                </div>
                <div class='w-full md:w-4/12'>
                   <Schedule scheduleList={[]} userList={[]} saveData={[]}/>
                </div>

            </div>

        </div>
    );
};

export default Homepage;

const Profile = () => <h1>Profile</h1>;
const Settings = () => <h1>Settings</h1>;
export { Homepage, Profile, Settings }