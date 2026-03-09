
import { Button } from "antd";

const Warning = ({icon,title,description,btnlabel,onClick}) => {
    
    
    return (
        <div className="w-full p-3 bg-orange-400 text-white text-sm rounded-xl  flex justify-between items-center flex-col md:flex-row cursor-pointer hover:shadow  transition"
        onClick={() => {onClick();}}
        >
            <div className="flex gap-2 items-center font-medium">
                {icon}
                <span>{title}</span>
                <span className="text-xs font-normal" dangerouslySetInnerHTML={{ __html: description }}/>
            </div>
            <Button color="danger" variant="outlined" onClick={(e) => {e.stopPropagation();onClick();}}>
                {btnlabel}
            </Button>
        </div>
    )
}

export default Warning