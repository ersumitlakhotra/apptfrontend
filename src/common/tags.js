import { Tag } from "antd";

export function Tags(value) {
    switch (value.toUpperCase()) {
        case 'PENDING':
        case 'UPCOMING':
            {
                return <Tag color='yellow'>{value}</Tag>
            }
        case 'IN PROCESS':
        case 'IN PROGRESS':
            {
                return <Tag color='blue'>{value}</Tag>
            }
        case 'COMPLETED':
        case 'ACTIVE':
        case 'LIVE':
            {
                return <Tag color='green'>{value}</Tag>
            }
        case 'CANCELLED':
        case 'INACTIVE':
        case 'PAST':
            {
                return <Tag color='red'>{value}</Tag>
            }
        default:
            {
                return <Tag color='default'>{value}</Tag>
            }
    }
}
