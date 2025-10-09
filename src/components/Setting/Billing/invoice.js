/* eslint-disable react-hooks/exhaustive-deps */
// Invoice.js
import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: { flexDirection: 'column', padding: 30, gap: 30 },
    header: { flexDirection: "row", justifyContent: "space-between", textAlign: 'left' },
    section: { marginBottom: 10 },
    text: { fontSize: 12 },
    textBold: { fontFamily: "Helvetica-Bold" },
    table: { display: 'table', width: '100%', marginBottom: 10, borderStyle: 'solid', borderWidth: 1, borderColor: '#bfbfbf' },
    tableRow: { flexDirection: 'row', fontSize: 10, padding: 5 },
    tableColHeader: { flexDirection: 'row', backgroundColor: '#f0f0f0', padding: 5 },
    tableColHeaderText: { fontSize: 12, fontFamily: "Helvetica-Bold" },
    tableCol: { width: '20%', borderStyle: 'solid', borderWidth: 1, borderColor: '#bfbfbf', padding: 5 },
    invDetail: { flexDirection: "row", justifyContent: "flex-end", textAlign: 'left', },
    invDetailRow: { flexDirection: "row", justifyContent: "space-between", textAlign: 'left' ,marginBottom:10},
});

const Invoice = ({ id, refresh, billingList, companyList }) => {
    const [invoiceData, setInvoiceData] = useState([])

    const [invoice, setInvoice] = useState('');
    const [trnDate, setTrnDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [subTotal, setSubTotal] = useState('');
    const [taxAmount, setTaxAmount] = useState('');
    const [tax, setTax] = useState('');
    const [total, setTotal] = useState('');

    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [postal, setPostal] = useState('');
    const [province, setProvince] = useState('');
    const [country, setCountry] = useState('');

    useEffect(() => {
        const editList = billingList.find(item => item.id === id)
        setInvoice(editList.invoice);
        setTrnDate(editList.trndate);
        setDueDate(editList.duedate);
        setSubTotal(editList.subtotal);
        setTaxAmount(editList.taxamount);
        setTax(editList.tax);
        setTotal(editList.totalamount);
        if (companyList.length !== 0) {
            setName(companyList.name);
            if (companyList.addressinfo !== null) {
                setStreet(companyList.addressinfo[0].street);
                setCity(companyList.addressinfo[0].city);
                setPostal(companyList.addressinfo[0].postal);
                setProvince(companyList.addressinfo[0].province);
                setCountry(companyList.addressinfo[0].country);
            }
        }
        setInvoiceData(editList)
    }, [refresh, id])

        return(
            <Document>
                <Page size="A4" style={styles.page}>

                    {/* Invoice Header */}
                    <View style={styles.header}>
                        <View style={{ flexDirection: "column", columnGap: 10 }}>
                            <Text style={[{ fontSize: 24 }, styles.textBold]}>INVOICE</Text>
                            <Text style={{ fontSize: 12 }}>Invoice #{invoice}</Text>
                        </View>
                        <View style={{ flexDirection: "column", columnGap: 10 }}>
                            <Text style={[{ fontSize: 16, marginBottom: 10 }, styles.textBold]}>Appointee</Text>
                            <Text style={styles.text}>199 Kingknoll Drive</Text>
                            <Text style={styles.text}>Brampton, Ontario, CA L6Y4N2</Text>
                        </View>
                    </View>

                    {/* Bill to */}
                    <View style={styles.header}>
                        <View style={{ flexDirection: "column", columnGap: 10 }}>
                            <Text style={[{ fontSize: 16, marginBottom:10 }, styles.textBold]}>Bill To:</Text>
                            <Text style={styles.text}>{name}</Text>
                            <Text style={styles.text}>{street}</Text>
                                <Text style={styles.text}>{`${city}, ${province}, ${country} ${postal} `}</Text>
                        </View>
                    </View>

                    {/* Table */}
                    <View style={styles.table}>
                        <View style={styles.tableColHeader}>
                            <Text style={[{ width: '20%' },styles.tableColHeaderText]}>Name</Text>
                            <Text style={[{ width: '35%' }, styles.tableColHeaderText]}>Description</Text>
                            <Text style={[{ width: '15%' }, styles.tableColHeaderText]}>Quantity</Text>
                            <Text style={[{ width: '15%' }, styles.tableColHeaderText]}>Price</Text>
                            <Text style={[{ width: '15%' }, styles.tableColHeaderText]}>Total</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={{ width: '20%' }}>Services</Text>
                            <Text style={{ width: '35%' }}>Software data management</Text>
                            <Text style={{ width: '15%' }}>1</Text>
                            <Text style={{ width: '15%' }}>{subTotal}</Text>
                            <Text style={{ width: '15%' }}>{subTotal}</Text>
                        </View>
                    </View>
                  
                    {/* Invoice Details */}
                    <View style={styles.invDetail}>
                        <View style={{ flexDirection: "column", columnGap: 10, width: '30%', marginRight: 10 }}>
                            <View style={styles.invDetailRow}>
                                <Text style={styles.text}>Subtotal</Text>
                                <Text style={styles.text}>${subTotal}</Text>
                            </View>
                            <View style={styles.invDetailRow}>
                                <Text style={styles.text}>Tax ({tax})</Text>
                                <Text style={styles.text}>${taxAmount}</Text>
                            </View>
                            <View style={styles.invDetailRow}>
                                <Text style={[styles.text, styles.textBold]}>Total</Text>
                                <Text style={[styles.text, styles.textBold]}>${total}</Text>
                            </View>
                        </View>
                    </View>

                   
                    {/* Total
                    <View style={styles.section}>
                        <Text style={styles.text}>Total: {invoiceData.totalAmount}</Text>
                    </View> */}
                </Page>
            </Document>
        )
};

export default Invoice;