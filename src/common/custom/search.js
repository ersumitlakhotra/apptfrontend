
import { Input } from "antd"
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

const Search = ({ value, onChange }) => {
    const [readonly, setReadonly] = useState(true);
    return (
        <Input
            size="middle"
            style={{ fontSize: 16 }}
            width={'100%'}
            placeholder="Search..."
            prefix={<IoSearchOutline color="silver" />}
            value={value}
            onChange={(e) => onChange(e.target.value)} 
            allowClear        
            readOnly={readonly}
            onFocus={() => setReadonly(false)}
            onBlur={() => setReadonly(true)}
            />
    )
}

export default Search;