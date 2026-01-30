import { useEffect, useRef, useState } from "react";
import FetchData from "../../../hook/fetchData";

const GenerateQR = () => {
    const [link, setLink] = useState('');
    const [urlImage, setUrlImage] = useState('');
    const qrCodeRef = useRef(null);

    useEffect(() => {
        Init();
    }, [])

    const Init = async () => {
        const companyResponse = await FetchData({
            method: 'GET',
            endPoint: 'company'
        }) 
        setLink(`${process.env.REACT_APP_DOMAIN}/book-appointment?store=` + companyResponse.data.store);    
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