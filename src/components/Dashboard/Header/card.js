
const Card = ({ srno, title, value,sign, chart }) => {
    return (
        <div key={srno} class='w-full bg-white border rounded text-gray-500'>
            <div class='flex items-center justify-between px-4 mt-2'>
                <p class='text-sm font-medium ' >{title}</p>
                <p class='text-xl text-black font-semibold'>{sign} {value}</p>
            </div>
            {chart}
        </div>
    )
}

export default Card;