import { Pagination } from "antd"
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
const DataTable = ({ headerItems, list, body, onChange, current=1, isFooter = true }) => {
    return (
        <div class="relative overflow-x-auto">
            <table class="w-full text-left h-40 overflow-auto">
                <thead class="h-12 border-b text-gray-700 bg-zinc-50 z-50 sticky top-0 ">
                    <tr>
                        {headerItems.map(items => (
                            <th scope="col" id={items.key} key={items.key} class={`py-3 font-medium `}>
                                <div class='flex flex-row justify-between border-e'>
                                    <p class='w-full px-3 text-sm whitespace-nowrap'>{items.label}</p>
                                    <div class='cursor-pointer'>
                                        {items.sort === 'asc' ? <TiArrowSortedDown size={18} onClick={(e) =>items.setSort('desc')} /> :
                                            items.sort === 'desc' ? <TiArrowSortedUp size={18} onClick={(e) => items.setSort('asc')} /> : ''}</div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {list.length === 0 ?
                        <tr><td colSpan={headerItems.length} class='text-left border-b p-4 text-sm font-medium text-gray-500'>No data found</td></tr>
                        :
                        body
                    }
                </tbody>
                {isFooter &&
                <tfoot>
                    <tr>
                        <td align="right" colSpan={headerItems.length} class='p-1 place-items-start md:place-items-end'>
                            <Pagination
                                total={list.length}
                                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                                defaultPageSize={10}
                                current={current}
                                pageSizeOptions={[10]}                               
                                onChange={onChange}
                            />
                        </td>
                    </tr>
                </tfoot>
                }
            </table>
        </div>
    )
}

export default DataTable;
