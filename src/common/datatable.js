
const DataHeader = ({ header }) => {
    return (
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {header.map(items => (
                    <th key={items.key} scope="col" id={items.key} class="px-6 py-3">
                        {items.label}
                    </th>
                ))}
            </tr>
        </thead>
    )
}
const DataRow = ({ row }) => {
    return (
        <tbody>
            <tr key={row.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-6 py-4">
                    <span class="text-base font-semibold">{row.title}</span>
                </td>
            </tr>
        </tbody>
    )
}

const DataTable = ({ header,row }) => {
    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <DataHeader header={header}/>
                <DataRow row={row}/>
            </table>
        </div>
    )
}

export default DataTable;
