/* eslint-disable react-hooks/exhaustive-deps */
import { PDFViewer } from "@react-pdf/renderer";
import Invoice from './invoice.js'

const InvoiceView = ({ id, refresh, billingList }) => {
    return (
        <div class="flex flex-col gap-2 mb-12  w-full">
            <PDFViewer style={{ width: '100%', height: '800px' }}>
                <Invoice id={id} refresh={refresh} billingList={billingList} />
            </PDFViewer>
        </div>
    )
}

export default InvoiceView;