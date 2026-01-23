const Heading = ({ label,labelColor, Icon, desc, color ='#4192d3'}) => {
    return (
        <div class='flex flex-row gap-3 text-gray-800 text-lg font-medium font-sans'>
            <span style={{ color: color }}>{Icon}</span>
            <div class='flex flex-col'>
                <p class={`${labelColor}`}>{label}</p>
                <p class='text-gray-400 text-xs font-normal'>{desc}</p>
            </div>
        </div>
    )
}
export default Heading;