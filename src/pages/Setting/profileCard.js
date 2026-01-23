import { UserOutlined } from '@ant-design/icons';
import { ImFacebook } from "react-icons/im";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { TbWorldWww } from "react-icons/tb";
import { useEffect, useState } from "react";
import { Button, Image, Avatar, Skeleton } from "antd"
import Heading from "../../common/heading";
import FetchData from '../../hook/fetchData';
import IsLoading from '../../common/custom/isLoading';

const ProfileCard = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [website, setWebsite] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [twitter, setTwitter] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [logo, setLogo] = useState(null);

    useEffect(() => {
        Init()
    }, [])

    const Init = async () => {
        setIsLoading(true);
        const logoList = await FetchData({
            method: 'GET',
            endPoint: 'logo'
        })
        setLogo((logoList.data).length !== 0 ? (logoList.data).logo : null);

        const companyList=await FetchData({
            method: 'GET',
            endPoint: 'company'
        })
        //console.log(companyList.data !)
        console.log((companyList.data).length)
        console.log((companyList.data).length === '1')
        if ((companyList.data).length === '1' ) {
            console.log((companyList.data).name)
            setName((companyList.data).name);       
            if ((companyList.data).addressinfo !== null) {
               // setAddress((companyList.data).addressinfo[0].street);
            }
            if ((companyList.data).socialinfo !== null) {
               // setWebsite((companyList.data).socialinfo[0].website);
              //  setFacebook((companyList.data).socialinfo[0].facebook);
                //setInstagram((companyList.data).socialinfo[0].instagram);
                //setTwitter((companyList.data).socialinfo[0].twitter);
               // setLinkedin((companyList.data).socialinfo[0].linkedin);
            }
        }
        setIsLoading(false);
    }

    const openExtendedLink = (address) => {
        window.open(address, '_blank', 'noopener noreferrer');
    };

    return (
        <div class='w-full bg-white border rounded-3xl p-4 text-gray-500 flex gap-2 items-center cursor-pointer shadow-md hover:shadow-xl '>
            <IsLoading isLoading={isLoading} input={
                <>
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
                </>
            } />
        </div>
    )
}

export default ProfileCard