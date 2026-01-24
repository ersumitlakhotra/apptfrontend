import { Button, Input, Tooltip } from "antd"
import { ImFacebook } from "react-icons/im";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { TbWorldWww } from "react-icons/tb";
import { useEffect, useState } from "react";


const SocialLink = ({ companyList, saveData }) => {
    const [website, setWebsite] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [twitter, setTwitter] = useState('');
    const [linkedin, setLinkedin] = useState('');

    useEffect(() => {
        if (companyList.length !== 0) {
            if (companyList.socialinfo !== null) {
                setWebsite(companyList.socialinfo[0].website);
                setFacebook(companyList.socialinfo[0].facebook);
                setInstagram(companyList.socialinfo[0].instagram);
                setTwitter(companyList.socialinfo[0].twitter);
                setLinkedin(companyList.socialinfo[0].linkedin);
            }
        }
    }, [companyList])

    const save = async () => {
        const Body = JSON.stringify({
            socialinfo: [{
                website: website,
                facebook: facebook,
                instagram: instagram,
                twitter: twitter,
                linkedin: linkedin
            }]
        });
          saveData({
            label:"Social links",
            method: "PUT", 
            endPoint:"company/social",
            body: Body
        }); 

    }
    return (
        <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
            <Input size={'large'} placeholder="https://www.website.com" value={website} onChange={(e) => setWebsite(e.target.value)} style={{ padding: 16, fontSize: 18 }} prefix={<TbWorldWww size={24} style={{ color: '#1877F2' }} />} />
            <Input size={'large'} placeholder="https://www.facebook.com" value={facebook} onChange={(e) => setFacebook(e.target.value)} style={{ padding: 16, fontSize: 18 }} prefix={<ImFacebook size={24} style={{ color: '#1877F2' }} />} />
            <Input size={'large'} placeholder="https://www.instagram.com" value={instagram} onChange={(e) => setInstagram(e.target.value)} style={{ padding: 16, fontSize: 18 }} prefix={<FaInstagram size={24} style={{ color: '#E1306C' }} />} />
            <Input size={'large'} placeholder="https://www.twitter.com" value={twitter} onChange={(e) => setTwitter(e.target.value)} style={{ padding: 16, fontSize: 18 }} prefix={<BsTwitterX size={24} />} />
            <Input size={'large'} placeholder="https://www.linkedin.com" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} style={{ padding: 16, fontSize: 18 }} prefix={<FaLinkedinIn size={24} style={{ color: '#1877F2' }} />} />
            <div class='flex justify-end items-center'>
                <Tooltip placement="top" title={'Save changes'}>
                    <Button size='large' color='primary' variant="solid" onClick={save}  >Save changes</Button>
                </Tooltip>
            </div>
        </div>
    )

}

export default SocialLink