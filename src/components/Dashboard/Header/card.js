
const Card = ({ key, title, value,sign, chart }) => {
    return (
        <div class='w-full bg-white border rounded text-gray-500'>
            <div class='flex items-center justify-between px-4 mt-2'>
                <p key={key} class='text-sm font-medium ' >{title}</p>
                <p class='text-xl text-black font-semibold'>{sign} {value}</p>
            </div>
            {chart}
        </div>
    )
}

export default Card;