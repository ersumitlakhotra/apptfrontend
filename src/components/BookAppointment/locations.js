import { useEffect, useState } from "react";
import Heading from "../../common/heading";
import { EnvironmentOutlined } from '@ant-design/icons';

const Locations = ({ companyList, next, cid,setCid ,setStoreName,setStoreCell}) => {

    return (
        <div class=''>
            {companyList.map(a => (
                <div key={a.id} class={`w-full bg-white rounded-lg p-4 shadow cursor-pointer mb-4 ${a.id === cid && 'border-green-500 bg-green-200  border'} `} onClick={() => { setCid(a.id); setStoreName(a.name); setStoreCell(a.cell);next(); }}>
                    <div class='flex flex-col gap-3 '>
                        <Heading label={a.name} 
                            desc={a.addressinfo !== null ? `${a.addressinfo[0].street} , ${a.addressinfo[0].city} `  : ''} 
                        icon={<EnvironmentOutlined />} />
                    </div>
                   
                </div>
            ))}
        </div>
    )
}

export default Locations
