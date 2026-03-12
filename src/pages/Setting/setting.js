/* eslint-disable react-hooks/exhaustive-deps */
import {  Tabs } from "antd"
import { getTabItems } from "../../common/items.js"
import { ContainerOutlined, IdcardOutlined, ShareAltOutlined,  LockOutlined, QrcodeOutlined } from '@ant-design/icons';
import Account from "../../components/Setting/Account/account.js";
import SocialLink from "../../components/Setting/Social/sociallink.js";
import Billing from "../../components/Setting/Billing/billing.js";
import { useEffect, useState } from "react";
import Security from "../../components/Setting/Security/security.js";
import QRcode from "../../components/Setting/QRcode/qrcode.js";
import ProfileCard from "./profileCard.js";
import PageHeader from "../../common/pages/pageHeader.js";
import { useLocation, useOutletContext } from "react-router-dom";
import FetchData from "../../hook/fetchData.js";

const Setting = () => {
    const { saveData,  refresh, setIsLoading, companyList,getCompany, billingList,getBilling } = useOutletContext();
    const location = useLocation();
    const [tabActiveKey, setTabActiveKey] = useState('1');
    const [logoList, setLogoList] = useState([]);

    
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");

    if (tab) {
      setTabActiveKey(tab);
    }
  }, [location.search]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");

      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    }
  }, [tabActiveKey, location.hash]);


    useEffect(() => {
        Init();
    }, [refresh])

    const Init = async () => {
        setIsLoading(true);

        await getCompany();
        await getBilling();
        const logoResponse = await FetchData({
            method: 'GET',
            endPoint: 'logo'
        })
        setLogoList(logoResponse.data);
        setIsLoading(false);
    }

    const tabItems = [
        getTabItems('1', 'Account', <IdcardOutlined />, <Account companyList={companyList} saveData={saveData} logoList={logoList} />),
        getTabItems('2', 'Billing & plans', <ContainerOutlined />, <Billing companyList={companyList} billingList={billingList} saveData={saveData}  />),
        // getTabItems('3', 'Notifications', <NotificationOutlined />, <Notification />),
        getTabItems('4', 'Security', <LockOutlined />, <Security companyList={companyList} saveData={saveData} />),
        getTabItems('5', 'Social links', <ShareAltOutlined />, <SocialLink companyList={companyList} saveData={saveData} />),
        getTabItems('6', 'QR Code', <QrcodeOutlined />, <QRcode />),
    ];

    return (
        <div class="flex flex-col gap-4 md:px-7 py-4 mb-12">
            <PageHeader label={'Settings'} isExport={false} isCreate={false} />
            <ProfileCard refresh={refresh} />
            <div class='w-full p-4'>
                <Tabs items={tabItems} activeKey={tabActiveKey} onChange={(e) => { setTabActiveKey(e) }}  destroyInactiveTabPane={false} />
            </div>
        </div>
    )

}

export default Setting