/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

const GenerateQR = () => {
    const [link, setLink] = useState('');
    const [urlImage, setUrlImage] = useState('');
    const qrCodeRef = useRef(null);
    const {getCompany } = useOutletContext();
    useEffect(() => {
        Init();
    }, [])

    const Init = async () => {
        const companyResponse = await getCompany();
        setLink(`${process.env.REACT_APP_DOMAIN}/book-appointment?store=` + companyResponse.store);    
    }

    useEffect(() => {
        handleQr();
    }, [qrCodeRef, link])

    const handleQr = async () => {
        if (qrCodeRef !== null && link !== '') {
            const canvas = qrCodeRef.current.querySelector('canvas'); // Assuming qrCodeRef points to the QRCode component
            if (canvas) {
                const dataURL = await canvas.toDataURL('image/png'); // Or 'image/jpeg'
                const base64Image = dataURL.split(',')[1]; // Extract the Base64 part
                setUrlImage(base64Image);
            }
        }
    }
    return {
        link: link,
        urlImage: urlImage,
        qrCodeRef: qrCodeRef
    }
}

export default GenerateQR