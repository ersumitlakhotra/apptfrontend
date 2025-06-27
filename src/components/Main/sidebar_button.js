import { Badge } from "antd"

const SideBarButton = ({ key, isOpen, icon, label, badge, onSelected }) => {

    return(
        <div key={key} onClick={() => onSelected(label)}  class='p-2 px-5 flex flex-row gap-4 items-center hover:bg-blue-600 cursor-pointer'>
        <icon class='text-lg text-blue-300 '>{icon}</icon>
            <div class={`duration-150 ${!isOpen && 'scale-0'} whitespace-nowrap flex items-center justify-between w-full`}>
              <span class='text-sm font-medium '>{label}</span>
              {badge != null && <Badge count={badge} style={{ background:'white', color:'blue'}} />}
            </div>
        </div>
    )
}

export default SideBarButton