import { Button, Popconfirm, Modal } from "antd";
import Heading from "../../../common/heading";
import { WarningFilled } from '@ant-design/icons';
import { apiCalls } from "../../../hook/apiCall";
import { useEffect, useState } from "react";

const Deactivate = ({onSetSignout}) => {
    
    const [modal, contextHolderModal] = Modal.useModal();
     const successModal = () => {
        modal.success({
            title:(<span class='font-semibold'>Confirm temporary account deactivation</span>),
            content: (
                <div class='flex flex-col gap-4 p-4'>
                    <p>You have temporary deactivate your account. You can reactivate your account at any time. Please email us at info@appointstack.com for more information.</p>                
                </div>
            ),
             onOk() {onSetSignout()},
        });
    };
    const errorModal = () => {
        modal.error({
            title: (<span class='font-semibold'>Error while trying to deactivate your account!</span>),
            content: ( <div class='flex flex-col gap-4 p-4'>
                <p>Something went wrong. Please try again later.</p>
              </div>),         
             onOk() {},
        });
    };
    
    const onDeactivate = async () => {
       // setIsLoading(true);
        try {
            const companyId = localStorage.getItem('cid');  
            const result = await apiCalls('PUT', 'company/deactivate',companyId, null, []);
            if (result.status === 203)
                successModal();
            else
                errorModal();
           
        }
        catch (e) {
           errorModal();
        }
        //setIsLoading(false);
    }


     
    return (
        <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
            <Heading label={"Deactivate account"} desc={'Deactivate your account is temporary and all of your data will be hidden.'} icon={<WarningFilled style={{ color: 'red' }} />} />
            <div class='mx-6 mt-2 flex '>
                <Popconfirm
                    title="Deactivate account"
                    description="Are you sure to deactivate the account? "
                    onConfirm={() => onDeactivate()}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button color="danger" variant="outlined" size="large">Deactivate</Button>
                </Popconfirm>
            </div>
            
            {contextHolderModal}
        </div>
    )
}
export default Deactivate;

