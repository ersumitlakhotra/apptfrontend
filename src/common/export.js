import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { getDate, getExcelItem } from './items';
import dayjs from 'dayjs';

const ExportToExcel = ({ data, fileName, servicesList, userList }) => {
  const exportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet(fileName);

      switch (fileName.toUpperCase())
      {
          case 'ORDER': {
              worksheet.columns = [
                  getExcelItem('Order', 10),
                  getExcelItem('Customer_Name', 30),
                  getExcelItem('Customer_Cell', 30),
                  getExcelItem('Date', 15),
                  getExcelItem('Services', 30),
                  getExcelItem('Rate', 15),
                  getExcelItem('Status', 15),
                  getExcelItem('Booked', 15),
                  getExcelItem('Last_Modified', 15)
              ];
              data.forEach(item => {
                  worksheet.addRow({
                      Order: item.order_no,
                      Customer_Name: item.customerinfo !== null && item.customerinfo[0].name,
                      Customer_Cell: item.customerinfo !== null && item.customerinfo[0].cell,
                      Date: dayjs(item.trndate).format('DD MMM YYYY'),
                      Services: item.serviceinfo !== null && (servicesList.filter(a => item.serviceinfo.some(b => b === a.id)).map(c => c.name)).toString(),
                      Rate: `$ ${item.total}` ,
                      Status: item.status ,
                      Booked: userList.filter(user => user.id === item.assignedto).map(a => a.fullname).toString(),
                      Last_Modified:getDate(item.modifiedat),
                  });
              });
              break;
          }
          case 'EVENT': { break; }
          case 'PAYMENT': { break; }
          case 'SERVICES': { break; }
          case 'USER': { break; }
          case 'SALES': { break; }
          default: { break; }
      }
 
    // Add rows from your data
      worksheet.addRow(1)

    // Generate buffer and save
    try {
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, `${fileName}.xlsx`);     
    } catch (error) {
      console.error('Error exporting Excel:', error);
    }
  };

  return (
    <Button type='default' icon={<DownloadOutlined />} size="large" onClick={exportExcel}>Export</Button>
  );
};

export default ExportToExcel;