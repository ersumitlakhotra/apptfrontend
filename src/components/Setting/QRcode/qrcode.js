/* eslint-disable react-hooks/exhaustive-deps */

import { Button, QRCode } from "antd";
import { useEffect, useRef, useState } from "react";
import {  DownloadOutlined } from '@ant-design/icons';
import PrintQRcode from "./printqrcode";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Buffer } from "buffer";
window.Buffer = Buffer;

const QRcode = ({ companyList }) => {
    const [link, setLink] = useState('');
    const [urlImage, setUrlImage] = useState('');
    const qrCodeRef = useRef(null);
 
    useEffect(() => {
        if (companyList.length !== 0) {
            setLink(`${process.env.REACT_APP_DOMAIN}/book-appointment?store=` + companyList.store);
        }
    }, [companyList])   

    useEffect(() => {
        handleQr();
    }, [qrCodeRef, link])   

    const handleQr = async()=>{
        if (qrCodeRef !== null && link !== '') {
            const canvas = qrCodeRef.current.querySelector('canvas'); // Assuming qrCodeRef points to the QRCode component
            if (canvas) {
                const dataURL = await canvas.toDataURL('image/png'); // Or 'image/jpeg'
                const base64Image = dataURL.split(',')[1]; // Extract the Base64 part
                setUrlImage(base64Image);
            }
        }
    }

    return (
        <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
            <p>To visit the website, open your phone camera app and scan the QR code below.</p>
            <a href={link} target="_blank" rel="noreferrer">Link : <span class='underline italic text-blue-600 hover:text-blue-400'>{link}</span></a>
            <PDFDownloadLink document={<PrintQRcode link={link} urlImage={urlImage} />} fileName="ScanQR.pdf">
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : <Button type='default' icon={<DownloadOutlined />} size="middle">Download QR code</Button>
                }
            </PDFDownloadLink>  
            <QRCode ref={qrCodeRef}  value={link || '-'} size={200}  />     
        </div>
    )

}

export default QRcode