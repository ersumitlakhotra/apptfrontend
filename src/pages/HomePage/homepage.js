import { useNavigate } from "react-router-dom";
import ProfileCard from "../Setting/profileCard";
import CalenderCard from "./calenderCard";
import {AppIcons} from "../../common/custom/appIcons";
import WaitingApproval from "./waitingApproval";
import UserSchedule from "./userSchedule";
import { useEffect } from "react";
import IsLoading from "../../common/custom/isLoading";
import FetchData from "../../hook/fetchData";
import AppIconsPermission from "../../common/custom/appIconsPermission";


const Homepage = () => {
    const navigate = useNavigate();
    const { apps, isLoading} = AppIconsPermission();
    return (
        <div class='flex flex-col gap-8 p-4 '>

            <div class='w-full flex flex-col md:flex-row gap-8 '>
                <div class='w-full md:w-4/12 flex flex-col gap-8'>
                    <ProfileCard onClick={() => navigate('/setting')} />
                    <CalenderCard />
                </div>
                <div class='w-full md:w-4/12'>
                    <WaitingApproval />
                </div>
                <div class='w-full md:w-4/12'>
                    <UserSchedule />
                </div>

            </div>
            <div class="w-full flex flex-wrap justify-center gap-8 mt-4 ">
                <IsLoading isLoading={isLoading} input={
                    apps.filter(active => active.isVisible && active.label !=='Home').map((items, index) => {
                        return (
                            <AppIcons key={index} icon={items.icon} label={items.label} backgroundColor={items.color} onClick={() => navigate(items.navigate)} />
                        )
                    })}
                />
            </div>
        </div>
    );
};

export default Homepage;

const Profile = () => <h1>Profile</h1>;
const Settings = () => <h1>Settings</h1>;
export { Homepage, Profile, Settings }