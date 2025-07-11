const Heading = ({label,icon,desc}) => {
    return (
        <div class='flex flex-row gap-3 text-gray-800 text-lg font-medium font-sans'>
            <icon style={{ color: '#4192d3' }}>{icon}</icon>
            <div class='flex flex-col'>
                {label}
                <p class='text-gray-400 text-sm font-normal'>{desc}</p>
            </div>
        </div>
    )
}
export default Heading;