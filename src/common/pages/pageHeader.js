import { Button } from "antd";
import ExportToExcel from "../export"

import { PlusOutlined } from '@ant-design/icons';

const PageHeader = ({ label, isCreate, exportName, exportList, isExport, servicesList, userList, onClick,customButton = null,btnLabel=null }) => {
    return (
        <div class='flex items-center justify-between'>
            <span class="text-lg font-semibold text-gray-800">{label}</span>
            <div class="flex gap-2 ">
                {customButton !== null && customButton}
                {isExport && <ExportToExcel data={exportList} fileName={exportName} servicesList={servicesList} userList={userList} />}
                {isCreate && <Button type="primary" icon={<PlusOutlined />} size="large" onClick={onClick}>{btnLabel === null ?`Create ${label}` : btnLabel}</Button>}
            </div>
        </div>
    )
}

export default PageHeader