const AppIcons = ({ icon, size = 108, backgroundColor,label,onClick}) => {
    return(
        <div class="flex-1 min-w-[100px] max-w-[100px] md:min-w-[200px] md:max-w-[200px]" >
            <div class='flex flex-col items-center justify-center '>
                <div class={`border ${backgroundColor}  rounded-xl cursor-pointer flex justify-center items-center  hover:shadow group`}
                    style={{ height: size, width: size }}
                    onClick={onClick}>
                    <span class="group-hover:animate-spin">{icon}</span>
                </div>
                <span class='text-xs font-medium'>{label}</span>
            </div>
        </div>
    )
}

export default AppIcons;