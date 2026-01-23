import { useNavigate } from "react-router-dom";
import ProfileCard from "../Setting/profileCard";
import CalenderCard from "./calenderCard";
import Schedule from "../../components/Dashboard/Schedule/schedule";
import UpcomingAppointments from "./upcomingAppointments";
const Homepage = () => {
    const navigate = useNavigate();
    return (
        <div class='flex flex-col gap-4 p-4 '>

            <div class='w-full flex flex-col md:flex-row gap-8'>
                <div class='w-full md:w-4/12 flex flex-col gap-8'>
                    <ProfileCard />
                    <CalenderCard />
                </div>
                <div class='w-full md:w-4/12'>
                   <UpcomingAppointments/>
                </div>
                <div class='w-full md:w-4/12'>
                  
                </div>

            </div>

        </div>
    );
};

export default Homepage;

const Profile = () => <h1>Profile</h1>;
const Settings = () => <h1>Settings</h1>;
export { Homepage, Profile, Settings }