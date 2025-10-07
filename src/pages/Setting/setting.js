import { Button, Tabs, Image, Avatar } from "antd"
import { getTabItems } from "../../common/items.js"
import { ContainerOutlined, IdcardOutlined, NotificationOutlined, ShareAltOutlined, UserOutlined } from '@ant-design/icons';
import Account from "../../components/Setting/Account/account.js";
import Notification from "../../components/Setting/notification.js";
import SocialLink from "../../components/Setting/Social/sociallink.js";
import Billing from "../../components/Setting/Billing/billing.js";
import Heading from "../../common/heading.js";
import { ImFacebook } from "react-icons/im";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { TbWorldWww } from "react-icons/tb";
import { useEffect, useState } from "react";

const Setting = ({ companyList, saveData, setRefresh, tabActiveKey, setTabActiveKey, logoList, billingList }) => {
    const tabItems = [
        getTabItems('1', 'Account', <IdcardOutlined />, <Account companyList={companyList} saveData={saveData} logoList={logoList} setRefresh={setRefresh} />),
        getTabItems('2', 'Billing & plans', <ContainerOutlined />, <Billing companyList={companyList} billingList={billingList} saveData={saveData} setRefresh={setRefresh} />),
        getTabItems('3', 'Notifications', <NotificationOutlined />, <Notification />),
        getTabItems('4', 'Social links', <ShareAltOutlined />, <SocialLink companyList={companyList} saveData={saveData} />),
    ];
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [website, setWebsite] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [twitter, setTwitter] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [logo, setLogo] = useState(null);

    useEffect(() => {
        if (companyList.length !== 0) {
            setName(companyList.name);
            if (companyList.addressinfo !== null) {
                setAddress(companyList.addressinfo[0].street);
            }
            if (companyList.socialinfo !== null) {
                setWebsite(companyList.socialinfo[0].website);
                setFacebook(companyList.socialinfo[0].facebook);
                setInstagram(companyList.socialinfo[0].instagram);
                setTwitter(companyList.socialinfo[0].twitter);
                setLinkedin(companyList.socialinfo[0].linkedin);
            }
        }
    }, [companyList])

    useEffect(() => {
        if (logoList.length !== 0)
            setLogo(logoList.logo);
    }, [logoList])

    const openExtendedLink = (address) => {
        window.open(address);
        window.open(address, '_blank', 'noopener noreferrer');
    };

    return (
        <div class="flex flex-col gap-4 mb-12">
            <span class="text-lg font-semibold text-gray-800">Setting</span>
            <div class='w-full bg-white border rounded-3xl p-4 text-gray-500 flex gap-4 items-center'>
                {logo !== null ?
                    <Image width={140} height={120} src={logo} style={{ borderRadius: 10 }} /> :
                    <Avatar shape="square" style={{ backgroundColor: '#f9fafb', border: 'solid', width: 120, height: 120 }} icon={<UserOutlined style={{ color: 'black' }} />} />
                }

                <div class='flex-col flex gap-2'>
                    <Heading label={name} desc={address} />
                    <div class='flex flex-row ml-1'>
                        <Button color="default" variant="link" icon={<TbWorldWww size={16} style={{ color: '#1877F2' }} />} onClick={() => openExtendedLink(website)} />
                        <Button color="default" variant="link" icon={<ImFacebook size={16} style={{ color: '#1877F2' }} />} onClick={() => openExtendedLink(facebook)} />
                        <Button color="default" variant="link" icon={<FaInstagram size={16} style={{ color: '#E1306C' }} />} onClick={() => openExtendedLink(instagram)} />
                        <Button color="default" variant="link" icon={<BsTwitterX size={16} style={{ color: 'black' }} />} onClick={() => openExtendedLink(twitter)} />
                        <Button color="default" variant="link" icon={<FaLinkedinIn size={16} style={{ color: '#1877F2' }} onClick={() => openExtendedLink(linkedin)} />} />
                    </div>
                </div>
            </div>
            <div class='w-full p-4'>
                <Tabs items={tabItems} activeKey={tabActiveKey} onChange={(e) => { setTabActiveKey(e) }} />
            </div>
        </div>
    )

}

export default Setting