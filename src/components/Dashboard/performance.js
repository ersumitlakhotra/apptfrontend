
const Performance = ({ key, label, value, width}) => {
    return (
        <div key={key} class='flex flex-row items-center text-gray-500'>
                <div class='w-10/12 whitespace-nowrap'>
                    <div class={`p-3 ${width} bg-slate-100 rounded text-sm`}>
                    <p>{label}</p>
                    </div>
                </div>
                <div class=' p-3 w-2/12  rounded flex items-center justify-center'>
                <p>{value}</p>
                </div>
        </div>
    )
}

export default Performance;