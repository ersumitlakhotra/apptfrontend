import { Tag } from "antd";

export function Tags(value) {
    switch (value.toUpperCase()) {
        case 'PENDING':
            {
                return <Tag color='yellow'>{value}</Tag>
            }
        case 'IN PROCESS':
            {
                return <Tag color='blue'>{value}</Tag>
            }
        case 'COMPLETED':
        case 'ACTIVE':
            {
                return <Tag color='green'>{value}</Tag>
            }
        case 'CANCELLED':
        case 'INACTIVE':
            {
                return <Tag color='red'>{value}</Tag>
            }
        default:
            {
                return <Tag color='default'>{value}</Tag>
            }
    }
}
