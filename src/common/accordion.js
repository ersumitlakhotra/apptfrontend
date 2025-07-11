const Accordion = ({ label, value, border_bottom = true, current }) => {
    return (
        <div class={`${border_bottom && 'border-b'} p-4 ps-6 flex flex-row gap-6 ${current && ' bg-gray-50'}`}>
            <p class='w-28 font-medium text-gray-500'>{label}</p>
            <p class='text-black font-semibold'>{value}</p>
        </div>
    )

}

export default Accordion