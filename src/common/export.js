import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import {  getExcelItem } from './items';
import dayjs from 'dayjs';
import { UTC_LocalDateTime } from './localDate';

const ExportToExcel = ({ data, fileName, servicesList, userList }) => {
  const exportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(fileName);

    switch (fileName.toUpperCase()) {
      case 'ORDER': {
        worksheet.columns = [
          getExcelItem('Order', 10),
          getExcelItem('Customer_Name', 30),
          getExcelItem('Customer_Cell', 30),
          getExcelItem('Date', 20),
          getExcelItem('Services', 50),
          getExcelItem('Rate', 20),
          getExcelItem('Status', 20),
          getExcelItem('Booked', 20),
          getExcelItem('Last_Modified', 30)
        ];
        data.forEach(item => {
          worksheet.addRow({
            Order: item.order_no,
            Customer_Name: item.customerinfo !== null && item.customerinfo[0].name,
            Customer_Cell: item.customerinfo !== null && item.customerinfo[0].cell,
            Date: dayjs(item.trndate).format('DD MMM YYYY'),
            Services: item.serviceinfo !== null && (servicesList.filter(a => item.serviceinfo.some(b => b === a.id)).map(c => c.name)).toString(),
            Rate: `$ ${item.total}`,
            Status: item.status,
            Booked: userList.filter(user => user.id === item.assignedto).map(a => a.fullname).toString(),
            Last_Modified: UTC_LocalDateTime(item.modifiedat, 'DD MMM YYYY h:mm A'),
          });
        });
        break;
      }
      case 'EVENT': {
        worksheet.columns = [
          getExcelItem('Name', 20),
          getExcelItem('Description', 50),
          getExcelItem('Services', 50),
          getExcelItem('Coupon', 20),
          getExcelItem('Amount', 20),
          getExcelItem('Date', 20),
          getExcelItem('Status', 20),
          getExcelItem('Last_Modified', 30)
        ];
        data.forEach(item => {
          worksheet.addRow({
            Name: item.title,
            Description: item.description,
            Services: item.serviceinfo !== null && (servicesList.filter(a => item.serviceinfo.some(b => b === a.id)).map(c => c.name)).toString(),
            Coupon: item.coupon,
            Amount: `$ ${item.total}`,
            Date: dayjs(item.trndate).format('DD MMM YYYY'),
            Status: item.case,
            Last_Modified: UTC_LocalDateTime(item.modifiedat, 'DD MMM YYYY h:mm A'),
          });
        });
        break;
      }
      case 'EXPENSE': {
        worksheet.columns = [
          getExcelItem('Date', 20),
          getExcelItem('Name', 20),
          getExcelItem('Quantity', 10),
          getExcelItem('Price', 20),
          getExcelItem('Tax', 20),
          getExcelItem('Amount', 20),
          getExcelItem('Notes', 50),
          getExcelItem('Last_Modified', 30)
        ];
        data.forEach(item => {
          worksheet.addRow({
            Date: UTC_LocalDateTime(item.trndate, "MMM DD,YYYY"),
            Name: item.name,
            Quantity: item.quantity,
            Price: `$ ${item.netamount}`,
            Tax: `$ ${item.taxamount}`,
            Amount: `$ ${item.grossamount}`,
            Notes: item.notes,
            Last_Modified: UTC_LocalDateTime(item.modifiedat, 'DD MMM YYYY h:mm A'),
          });
        });
        break;
      }
      case 'PAYMENT': {
        worksheet.columns = [
          getExcelItem('Date', 20),
          getExcelItem('User', 20),
          getExcelItem('Type', 10),
          getExcelItem('Net_Pay', 20),
          getExcelItem('Tax', 20),
          getExcelItem('Gross_Pay', 20),
          getExcelItem('Notes', 50),
          getExcelItem('Last_Modified', 30)
        ];
        data.forEach(item => {
          worksheet.addRow({
            Date: UTC_LocalDateTime(item.trndate, "MMM DD,YYYY"),
            User: userList.filter(user => user.id === item.assignedto).map(a => a.fullname).toString(),
            Type: item.ptype,
            Net_Pay: `$ ${item.netamount}`,
            Tax: `$ ${item.taxamount}`,
            Gross_Pay: `$ ${item.grossamount}`,
            Notes: item.notes,
            Last_Modified: UTC_LocalDateTime(item.modifiedat, 'DD MMM YYYY h:mm A'),
          });
        });
        break;
      }
      case 'SERVICES': {
        worksheet.columns = [
          getExcelItem('Name', 30),
          getExcelItem('Price', 20),
          getExcelItem('Time', 10),
          getExcelItem('Status', 20),
          getExcelItem('Last_Modified', 30)
        ];
        data.forEach(item => {
          worksheet.addRow({
            Name: item.name,
            Price: `$ ${item.price}`,
            Time: item.timing,
            Status: item.status,
            Last_Modified: UTC_LocalDateTime(item.modifiedat, 'DD MMM YYYY h:mm A'),
          });
        });
          break; }
      case 'USER': { 
        worksheet.columns = [
          getExcelItem('Name', 30),
          getExcelItem('Cell', 20),
          getExcelItem('Email', 50),
          getExcelItem('Address', 50),
          getExcelItem('Gender', 10),
          getExcelItem('Username', 20),
          getExcelItem('Password', 20),
          getExcelItem('Role', 10),
          getExcelItem('Account', 10),
          getExcelItem('Status', 10),
          getExcelItem('Last_Modified', 30)
        ];
        data.forEach(item => {
          worksheet.addRow({
            Name: item.fullname,
            Cell: item.cell,
            Email: item.email,
            Address: item.address,
            Gender: item.gender,
            Username: item.username,
            Password: item.password,
            Role: item.role,
            Account: item.accounttype,
            Status: item.status,
            Last_Modified: UTC_LocalDateTime(item.modifiedat, 'DD MMM YYYY h:mm A'),
          });
        });
        break;
       }
      case 'SALES': { 
        worksheet.columns = [
          getExcelItem('User', 30),
          getExcelItem('Sales', 20),
          getExcelItem('Expense', 20),
          getExcelItem('Amount', 20),
        ];
        data.forEach(item => {
          worksheet.addRow({
            User: item.fullname,
            Sales: `$ ${item.sale}`,
            Expense: `$ ${item.expense}`,
            Amount: `$ ${item.result}`,
          });
        });
        break;
      
      }
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