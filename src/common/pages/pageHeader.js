import { Button } from "antd";
import ExportToExcel from "../export"

import { PlusOutlined } from '@ant-design/icons';

const PageHeader = ({ label, isCreate, exportName, exportList, isExport, servicesList, userList, onClick }) => {
    return (
        <div class='flex items-center justify-between'>
            <span class="text-lg font-semibold text-gray-800">{label}</span>
            <div class="flex gap-2">
                {isExport && <ExportToExcel data={exportList} fileName={exportName} servicesList={servicesList} userList={userList} />}
                {isCreate && <Button type="primary" icon={<PlusOutlined />} size="large" onClick={onClick}>Create {label}</Button>}
            </div>
        </div>
    )
}

export default PageHeader