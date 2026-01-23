import { Skeleton } from "antd"

const IsLoading = ({ isLoading , input, rows=1}) => {
    return(
        isLoading ? <Skeleton active style={{ padding: '16px' }} paragraph={{ rows: rows }} /> : input
    )
}

export default IsLoading;