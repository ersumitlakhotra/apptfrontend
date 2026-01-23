const FlexBoxRow = ({ icon, lable, value }) => {
    return (
        <div class='flex flex-row items-center justify-between border-b border-blue-500 pb-2'>
            <div class='flex flex-row items-center gap-2'>
                {icon}
                {lable}
            </div>
            {value}
        </div>
    )
}

export default FlexBoxRow