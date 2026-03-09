import { useNavigate, useOutletContext } from "react-router-dom";
import ProfileCard from "../Setting/profileCard";
import CalenderCard from "./calenderCard";
import { AppIcons } from "../../common/custom/appIcons";
import WaitingApproval from "./waitingApproval";
import UserSchedule from "./userSchedule";
import IsLoading from "../../common/custom/isLoading";
import AppIconsPermission from "../../common/custom/appIconsPermission";
import { useEffect, useRef, useState } from "react";
import {  Tour } from 'antd';
import awaitingGif from '../../Images/tour/awaiting_request.gif'
import Warning from "./warning";
import { RiErrorWarningLine } from "react-icons/ri";
import useAlert from "../../common/alert";

const Homepage = () => {
    const navigate = useNavigate();
    const { apps, isLoading } = AppIconsPermission();
    const {isAdmin, isLoading:homepageLoading, companyList}  = useOutletContext()
    const {contextHolderModal,allowAdminOnly} = useAlert();
    const [isGmailPending, setIsGmailPending] = useState(true);

    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const [open, setOpen] = useState(false);
    const steps = [
        {
            title: 'Calender Overview',
            description: 'Here, you may view every appointment scheduled for today as well as a general overview of the requests for approval, whether they are pending, completed, or canceled.',
            placement: 'top',
            target: () => ref1.current,
        },
        {
            title: 'Awaiting Request',
            description: 'The booking request will be displayed here, and you have the option to accept or reject it.',
            cover: (
                <img
                    draggable={false}
                    alt="awaiting_request.gif"
                    src={awaitingGif}
                />
            ),
            placement: 'right',
            target: () => ref2.current,
        },
        {
            title: 'User Schedule',
            description: 'With just one click, you may alter your working hours or designate any day as a workday or a day off.',
            placement: 'top',
            target: () => ref3.current,
        },
        {
            title: 'Tabs',
            description: 'These are all the options available to you, simply click the tab to navigate to that page.',
            placement: 'top',
            target: () => ref4.current,
        },
    ];

    const handleClick = () => {
        if (!isAdmin) allowAdminOnly(); 
        else navigate("/setting#gmailsetup")
    };

    const checkGmail = (value) => {
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return gmailRegex.test(value);
    };
    useEffect(() => {
        if (companyList.length !== 0) {
            if (companyList.emailuser !== null && companyList.emailpass !== null) {
                if (companyList.emailpass.length === 16 && checkGmail(companyList.emailuser))
                    setIsGmailPending(false);
            }
        }  
    }, [companyList])

    return (
        <div className=" relative">
            <IsLoading isLoading={homepageLoading} input={
                isGmailPending && <Warning icon={<RiErrorWarningLine size={24} />} title={'Warning !'} onClick={handleClick} description={"Your Gmail account is not configured yet ! Please go to <b>Setting -> Gmail Notification Setup</b> -> set your <b>E-Mail</b> and <b>App Password</b>."} btnlabel={'Go to setup'} />}
            />
            <div class='flex flex-col gap-8 p-4 '>
                <div class='w-full flex flex-col md:flex-row gap-8 '>
                    <div class='w-full md:w-4/12 flex flex-col gap-6'>
                        <ProfileCard />
                        <CalenderCard ref={ref1} />
                    </div>
                    <div ref={ref2} class='w-full md:w-4/12'>
                        <WaitingApproval />
                    </div>
                    <div ref={ref3} class='w-full md:w-4/12'>
                        <UserSchedule />
                    </div>

                </div>
                <div ref={ref4} class="w-full flex flex-wrap justify-center gap-8 mt-4 ">
                    <IsLoading isLoading={isLoading} input={
                        apps.filter(active => active.isVisible && active.label !== 'Home').map((items, index) => {
                            return (
                                <AppIcons key={index} icon={items.icon} label={items.label} backgroundColor={items.color} onClick={() => navigate(items.navigate)} />
                            )
                        })}
                    />
                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="fixed bottom-6 right-6 bg-yellow-400  hover:bg-yellow-500 px-5 py-3 rounded-full shadow-lg font-semibold z-50"
                >
                    Quick Tour ?
                </button>


                <Tour
                    open={open}
                    onClose={() => setOpen(false)}
                    steps={steps}
                    indicatorsRender={(current, total) => (
                        <span>
                            {current + 1} / {total}
                        </span>
                    )}
                />
            </div>
            {contextHolderModal}
        </div>
    );
};

export default Homepage;
