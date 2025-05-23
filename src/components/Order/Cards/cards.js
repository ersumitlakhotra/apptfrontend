const Cards = ({key,label,icon,color, value}) => {
    return (
        <div key={key} class='w-full bg-slate-50 rounded border p-4 text-gray-600 flex gap-4 '>
            <div class={`border rounded-lg ${color} h-12 w-12 mt-2 flex items-center justify-center text-xl text-white`} >{icon}</div> 
            <div class='text-gray-600 font-semibold'>
                <div class='text-lg' >{label}</div>
                <div class='text-2xl font-bold text-black' >{value}</div>
            </div>
                       
            
        </div>
    )
}

export default Cards;