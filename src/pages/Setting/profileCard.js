/* eslint-disable react-hooks/exhaustive-deps */
import { UserOutlined } from '@ant-design/icons';
import { ImFacebook } from "react-icons/im";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { TbWorldWww } from "react-icons/tb";
import { useEffect, useState } from "react";
import { Button, Image, Avatar } from "antd"
import Heading from "../../common/heading";
import FetchData from '../../hook/fetchData';
import IsLoading from '../../common/custom/isLoading';
import { useNavigate, useOutletContext } from 'react-router-dom';

const ProfileCard = () => {
    const navigate = useNavigate();
    const { refresh,getCompany,isAdmin } = useOutletContext();
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
    }, [refresh])

    const Init = async () => {
        setIsLoading(true);
        const logoList = await FetchData({
            method: 'GET',
            endPoint: 'logo'
        })
        setLogo((logoList.data).length !== 0 ? (logoList.data).logo : null);

        const companyResponse = await getCompany();
        setName(companyResponse.name);
        if (companyResponse.addressinfo !== null) {
            setAddress((companyResponse).addressinfo[0].street);
        }
        if (companyResponse.socialinfo !== null) {
            setWebsite((companyResponse).socialinfo[0].website);
            setFacebook((companyResponse).socialinfo[0].facebook);
            setInstagram((companyResponse).socialinfo[0].instagram);
            setTwitter((companyResponse).socialinfo[0].twitter);
            setLinkedin((companyResponse).socialinfo[0].linkedin);
        }
        setIsLoading(false);
    }

    const openExtendedLink = (address) => {
        window.open(address, '_blank', 'noopener noreferrer');
    };

    return (
        <div class='w-full bg-white border rounded-3xl p-4 text-gray-500 flex gap-2 items-center cursor-pointer shadow-md hover:shadow-xl '
            onClick={() => isAdmin ? navigate('/setting'): ''}>
            <IsLoading isLoading={isLoading} input={
                <>
                    {logo !== null ?
                        <Image width={140} height={120} src={logo} style={{ borderRadius: 10 }} /> :
                        <Avatar shape="square" style={{ backgroundColor: '#f9fafb', border: 'solid', width: 120, height: 120 }} icon={<UserOutlined style={{ color: 'black' }} />} />
                    }

                    <div class='flex-col flex gap-2'>
                        <Heading label={name} desc={address} labelColor={'bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent'} />
                        <div class='flex flex-row ml-1'>
                            <Button color="default" variant="link" icon={<TbWorldWww size={16} style={{ color: '#1877F2' }} />} onClick={(e) =>{e.stopPropagation(); openExtendedLink(website)}} />
                            <Button color="default" variant="link" icon={<ImFacebook size={16} style={{ color: '#1877F2' }} />} onClick={(e) => {e.stopPropagation();openExtendedLink(facebook)}} />
                            <Button color="default" variant="link" icon={<FaInstagram size={16} style={{ color: '#E1306C' }} />} onClick={(e) => {e.stopPropagation();openExtendedLink(instagram)}} />
                            <Button color="default" variant="link" icon={<BsTwitterX size={16} style={{ color: 'black' }} />} onClick={(e) => {e.stopPropagation();openExtendedLink(twitter)}} />
                            <Button color="default" variant="link" icon={<FaLinkedinIn size={16} style={{ color: '#1877F2' }} onClick={(e) => {e.stopPropagation();openExtendedLink(linkedin)}} />} />
                        </div>
                    </div>
                </>
            } />
        </div>
    )
}

export default ProfileCard