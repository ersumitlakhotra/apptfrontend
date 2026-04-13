import React, { useEffect,  useState } from "react";
import {  Checkbox } from "antd";
import EventTemplate from "../../email/eventTemplate";
import ReactDOMServer from "react-dom/server";
import { useEmail } from "../../email/email";
import { useOutletContext } from "react-router-dom";
import useAlert from "../../common/alert";


const MassEmailUI = ({ customerList,sendFrom,companyName,storeId, discountList ,setIsModalOpen}) => {
    const {sendBulkEmail} = useEmail(); 
    const { contextHolder, success, error } = useAlert();  
    const {  refresh, setRefresh, setIsLoading } = useOutletContext();

    const [subject, setSubject] = useState("Exclusive Offer: A treat for you on services! ⚡");
    const [additionalMessage, setAdditionalMessage] = useState('');
    const [recipients, setRecipients] = useState([]);
    const [selectAll, setSelectAll] = useState(true)
    const htmlTemplateReturn = (footer=false) => {
        return ReactDOMServer.renderToStaticMarkup(
            <EventTemplate
                key={new Date().toISOString()}
                companyName={companyName}
                storeId={storeId}
                footer={footer}
                discountList={discountList}
                additionalMessage={additionalMessage}
            />)
    }
    let htmlTemplate = htmlTemplateReturn();

    useEffect(() => {
        htmlTemplate = htmlTemplateReturn();
    }, [additionalMessage])

    useEffect(() => {
        setRecipients(customerList.map(item => ({ id: item.id, name: item.name, email: item.email, checked: selectAll })))
    }, [customerList])

    const onCheckAllChange = () => {
        setSelectAll(!selectAll);
        setRecipients(customerList.map(item => ({ id: item.id, name: item.name, email: item.email, checked: !selectAll })))
    }

    const onCheckRecipientsChange = (id, newData) => {
        setRecipients(prev =>
            prev.map(item =>
                item.id === id ? { ...item, ...newData } : item
            )
        );
    };

    const sendEmails = async () => {
        setIsLoading(true);
        let emails = [];
        recipients.filter(item => item.checked).map(to => {
            emails.push(to.email)
        })
        const res = await sendBulkEmail({ emails: emails, subject, message: htmlTemplateReturn(true) })
        if (res.status === 200) {
            setRefresh(refresh + 1);
            setIsModalOpen(false);
            success("The emails has been Sent successfully.");
        }
        else {
            error(res.message)
        }
        setIsLoading(false);
    }

 

    return (
        <div className="bg-white w-full max-w-6xl  flex-row md:flex overflow-hidden">

            {/* Left Panel */}
            <div className=" w-full md:w-1/3  border-r p-4">
                <h2 className="text-lg font-semibold mb-4">
                    Multiple <span className="text-green-600">Email • </span>Communication
                </h2>
                <div className="flex justify-between items-center mb-3">
                    <p className="text-sm text-gray-500 ">Recipients {recipients.filter(user => user.checked).length} of {customerList.length}</p>
                    <div className="flex items-center justify-between gap-2 mr-7">
                        <span>Select all</span>
                        <Checkbox
                            onChange={onCheckAllChange}
                            checked={selectAll}
                        />
                    </div>
                </div>

                <div className="space-y-2 h-[400px] overflow-y-auto">
                    {recipients.map((user, i) => (
                        <div
                            key={i}
                            className="p-3 rounded-lg border hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                        
                        onClick={()=> onCheckRecipientsChange(user.id, { checked: !user.checked }) }>
                            <div>
                                <p className="font-medium text-sm">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                            <Checkbox
                                //indeterminate={indeterminate}
                                onChange={() => onCheckRecipientsChange(user.id, { checked: !user.checked })}
                                checked={user.checked}
                            />
                        </div>
                    ))}
                </div>

                <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                onClick={() => sendEmails()}>
                    Send Email
                </button>
            </div>

            {/* Right Panel */}
            <div className=" w-full md:w-2/3 p-6">

                {/* Top Controls */}
                <div className="flex-row md:flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Content</h3>
                    <span className="text-sm text-gray-500">Sending from: {sendFrom}</span>
                </div>

                {/* Subject */}
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject"
                    className="w-full border rounded-lg px-3 py-2 mb-4"
                />  

                {/* Body */}
                <input
                    type="text"
                    value={additionalMessage}
                    onChange={(e) => setAdditionalMessage(e.target.value)}
                    placeholder="Additional Message"
                    className="w-full border rounded-lg px-3 py-2 mb-4"
                />
                
                <div
                    className="bg-white border rounded-lg shadow"
                    dangerouslySetInnerHTML={{
                        __html:htmlTemplate
                    }}
                />

            </div>
            {contextHolder}
        </div>
    );
}

export default MassEmailUI;
