const Heading = ({label,Icon,desc}) => {
    return (
        <div class='flex flex-row gap-3 text-gray-800 text-lg font-medium font-sans'>
            <span style={{ color: '#4192d3' }}>{Icon}</span>
            <div class='flex flex-col'>
                {label}
                <p class='text-gray-400 text-xs font-normal'>{desc}</p>
            </div>
        </div>
    )
}
export default Heading;