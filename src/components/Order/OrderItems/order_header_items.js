import { CheckSquareOutlined, ClockCircleOutlined, CloseOutlined, ScissorOutlined, SolutionOutlined, UnorderedListOutlined } from '@ant-design/icons';

function getItem( key,label,icon,color, value) {
    return {
      key,
      label,
      value,
      icon,
      color,
    };
  }
const OrderHeaderItems =[ 
    getItem('1','Total orders',<UnorderedListOutlined/>,'bg-blue-400',120), 
    getItem('2','Pending',<ClockCircleOutlined/>,'bg-yellow-400',20), 
    getItem('3','Assigned',<SolutionOutlined/>,'bg-slate-400',5), 
    getItem('4','In progress',<ScissorOutlined/>,'bg-orange-400',36), 
    getItem('5','Completed',<CheckSquareOutlined/>,'bg-green-400',9), 
    getItem('6','Cancelled',<CloseOutlined/>,'bg-red-400',2), 
  ];

export default OrderHeaderItems;