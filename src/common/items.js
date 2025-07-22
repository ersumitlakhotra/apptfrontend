

import dayjs from 'dayjs';

export function getTabItems  (key, label,icon, children)  {
    return { key, label, icon, children };
};

export function getTableItem(key, label, sort, setSort) {
    return {
        key,
        label,
        sort,
        setSort
    };
} 

export function getDate(dateTime) {
    return dayjs(dateTime).format('DD MMM YYYY h:mm A')
}
