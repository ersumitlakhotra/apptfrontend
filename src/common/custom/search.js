
import { Input } from "antd"
import { IoSearchOutline } from "react-icons/io5";

const Search = ({ value, onChange }) => {
    return (
        <Input
            size="middle"
            width={'100%'}
            placeholder="Search..."
            prefix={<IoSearchOutline color="silver" />}
            value={value}
            onChange={(e) => onChange(e.target.value)} />
    )
}

export default Search;