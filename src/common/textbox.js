const Textbox = ({ type, label, value, setValue, placeholder, isRequired = false, isDisable = false, footer = '',className='' }) => {
    return (
        <div class={`${isDisable ? 'text-gray-400' : 'text-gray-700'} `}>
            <label class="block mb-2 text-sm font-medium ">{label} {isRequired && <span class='text-red-500'>*</span>}</label>
            <input type={type} value={value} disabled={isDisable}
                class={`bg-gray-50 border border-gray-300  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${className}`}
                placeholder={placeholder} onChange={(e) => setValue(e.target.value)} />
            {footer !== '' &&
                <label class="block mb-2 text-xs ml-3 mt-1 ">{footer} </label>
            }
        </div>
    )
}
export default Textbox