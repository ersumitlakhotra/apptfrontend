import { Button, Tabs, Image, Avatar } from "antd"
import { getTabItems } from "../../common/items.js"
import { ContainerOutlined, IdcardOutlined, ShareAltOutlined, UserOutlined, LockOutlined, QrcodeOutlined } from '@ant-design/icons';
import Account from "../../components/Setting/Account/account.js";
import SocialLink from "../../components/Setting/Social/sociallink.js";
import Billing from "../../components/Setting/Billing/billing.js";
import Heading from "../../common/heading.js";
import { ImFacebook } from "react-icons/im";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { TbWorldWww } from "react-icons/tb";
import { useEffect, useState } from "react";
import Security from "../../components/Setting/Security/security.js";
import QRcode from "../../components/Setting/QRcode/qrcode.js";
import ProfileCard from "./profileCard.js";
import PageHeader from "../../common/pages/pageHeader.js";
import { useOutletContext } from "react-router-dom";
import { getStorage } from "../../common/localStorage.js";
import FetchData from "../../hook/fetchData.js";

const Setting = () => {
    const { saveData, isLoading, refresh, setIsLoading } = useOutletContext();

    const [tabActiveKey, setTabActiveKey] = useState('1');
    const [companyList, setCompanyList] = useState([]);
    const [logoList, setLogoList] = useState([]);
    const [billingList, setBillingList] = useState([]);

    useEffect(() => {
        Init();
    }, [])   
    
    useEffect(() => {
        Init();
    }, [refresh])

    const Init = async () => {
        setIsLoading(true);
        const localStorage = await getStorage();

        const companyResponse = await FetchData({
            method: 'GET',
            endPoint: 'company'
        })
        const logoResponse = await FetchData({
            method: 'GET',
            endPoint: 'logo'
        })
        const billingResponse = await FetchData({
            method: 'GET',
            endPoint: 'billing'
        })
        setCompanyList(companyResponse.data);
        setLogoList(logoResponse.data);
        setBillingList(billingResponse.data);

        setIsLoading(false);
    }

    const tabItems = [
        getTabItems('1', 'Account', <IdcardOutlined />, <Account companyList={companyList} saveData={saveData} logoList={logoList} />),
        getTabItems('2', 'Billing & plans', <ContainerOutlined />, <Billing companyList={companyList} billingList={billingList} saveData={saveData}  />),
        // getTabItems('3', 'Notifications', <NotificationOutlined />, <Notification />),
        getTabItems('4', 'Security', <LockOutlined />, <Security companyList={companyList} saveData={saveData} />),
        getTabItems('5', 'Social links', <ShareAltOutlined />, <SocialLink companyList={companyList} saveData={saveData} />),
        getTabItems('6', 'QR Code', <QrcodeOutlined />, <QRcode companyList={companyList} />),
    ];

    return (
        <div class="flex flex-col gap-4 mb-12">
            <PageHeader label={'Settings'} isExport={false} isCreate={false} />
            <ProfileCard refresh={refresh} />
            <div class='w-full p-4'>
                <Tabs items={tabItems} activeKey={tabActiveKey} onChange={(e) => { setTabActiveKey(e) }} />
            </div>
        </div>
    )

}

export default Setting