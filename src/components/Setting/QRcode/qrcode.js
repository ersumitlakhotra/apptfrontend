/* eslint-disable react-hooks/exhaustive-deps */

import { Button, QRCode } from "antd";
import { useEffect, useRef, useState } from "react";
import {  DownloadOutlined } from '@ant-design/icons';
import PrintQRcode from "./printqrcode";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Buffer } from "buffer";
import GenerateQR from "./generateQRcode";
window.Buffer = Buffer;

const QRcode = () => {
    const res = GenerateQR()
    return (
        <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
            <p>To visit the website, open your phone camera app and scan the QR code below.</p>
            <a href={res.link} target="_blank" rel="noreferrer">Link : <span class='underline italic text-blue-600 hover:text-blue-400'>{res.link}</span></a>
            <PDFDownloadLink document={<PrintQRcode link={res.link} urlImage={res.urlImage} />} fileName="ScanQR.pdf">
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : <Button type='default' icon={<DownloadOutlined />} size="middle">Download QR code</Button>
                }
            </PDFDownloadLink>  
            <QRCode ref={res.qrCodeRef} value={res.link || '-'} size={200}  />     
        </div>
    )

}

export default QRcode