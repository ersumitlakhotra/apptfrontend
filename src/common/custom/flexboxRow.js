const FlexBoxRow = ({ icon, label, value }) => {
    return (
        <div class='flex flex-row items-center justify-between pb-2'>
            <div class='flex flex-row items-center gap-2'>
                {icon}
                {label}
            </div>
            {value}
        </div>
    )
}

export default FlexBoxRow