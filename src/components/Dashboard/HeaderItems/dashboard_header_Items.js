function getItem( key,label, value) {
    return {
      key,
      label,
      value,
    };
  }
const DashHeaderItems =[ 
    getItem('1','Total Page Views','4,500'), 
    getItem('2','Revenue Over Time','51,000'), 
    getItem('3','7d Task Completed','96'), 
    getItem('4','Task By Users','563'), 
  ];

export default DashHeaderItems;