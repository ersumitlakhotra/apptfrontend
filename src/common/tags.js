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
        case 'ADD SCHEDULE':
        case 'RESCHEDULED':
            {
                return <Tag color='blue'>{value}</Tag>
            }
        case 'COMPLETED':
        case 'ACTIVE':
        case 'LIVE':
        case 'PAID':
        case 'WORKING':
        case 'CONFIRMED':
            {
                return <Tag color='green'>{value}</Tag>
            }
        case 'CANCELLED':
        case 'REJECTED':
        case 'INACTIVE':
        case 'PAST':
        case 'UNPAID':
        case 'DAY OFF':
            {
                return <Tag color='red'>{value}</Tag>
            }
        default:
            {
                return <Tag color='default'>{value}</Tag>
            }
    }
}
