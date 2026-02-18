/* eslint-disable react-hooks/exhaustive-deps */
import { PDFViewer } from "@react-pdf/renderer";
import Invoice from './invoice.js'
import InvoicePDF from "./invoiceN.js";

const InvoiceView = ({ id, refresh, billingList, companyList}) => {

const invoiceData = {
  invoiceNo: "INV-12345-1",
  date: "26 June 2022",
  billTo: {
    name: "Estelle Darcy",
    phone: "+123-456-7890",
    address: "123 Anywhere St., Any City",
  },
  from: {
    name: "Samira Hadid",
    phone: "+123-456-7890",
    address: "123 Anywhere St., Any City",
  },
  items: [
    { description: "Your Description", qty: 1, price: 0 },
    { description: "Your Description", qty: 1, price: 0 },
  ],
  bank: {
    name: "Name Bank",
    account: "123-456-7890",
    email: "reallygreatsite.com",
  },
  status:"PAID"
};


    return (
        <div class="flex flex-col gap-2 mb-12  w-full">
            <PDFViewer style={{ width: '100%', height: '800px' }}>
                 {/*<Invoice id={id} refresh={refresh} billingList={billingList} companyList={companyList} />*/}
               <InvoicePDF data={invoiceData} id={id} refresh={refresh} billingList={billingList} />
            </PDFViewer>
        </div>
    )
}

export default InvoiceView;