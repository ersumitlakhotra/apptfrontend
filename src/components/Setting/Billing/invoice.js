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

const Invoice = ({ id, refresh, billingList }) => {
    const [invoiceData, setInvoiceData] = useState([])

    useEffect(() => {
        const editList = billingList.find(item => item.id === id)
        setInvoiceData(editList)
    }, [refresh, id])

        return(
            <Document>
                <Page size="A4" style={styles.page}>

                    {/* Invoice Header */}
                    <View style={styles.header}>
                        <View style={{ flexDirection: "column", columnGap: 10 }}>
                            <Text style={[{ fontSize: 24 }, styles.textBold]}>INVOICE</Text>
                            <Text style={{ fontSize: 12 }}>Invoice #INV-2024-001</Text>
                        </View>
                        <View style={{ flexDirection: "column", columnGap: 10 }}>
                            <Text style={[{ fontSize: 16, marginBottom: 10 }, styles.textBold]}>Company Name</Text>
                            <Text style={styles.text}>123 business street</Text>
                            <Text style={styles.text}>city, state 12354</Text>
                        </View>
                    </View>

                    {/* Bill to */}
                    <View style={styles.header}>
                        <View style={{ flexDirection: "column", columnGap: 10 }}>
                            <Text style={[{ fontSize: 16, marginBottom:10 }, styles.textBold]}>Bill To:</Text>
                            <Text style={styles.text}>Client Name</Text>
                            <Text style={styles.text}>123 client street</Text>
                            <Text style={styles.text}>city, state 12354</Text>
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
                            <Text style={{ width: '20%' }}>Name</Text>
                            <Text style={{ width: '35%' }}>Description</Text>
                            <Text style={{ width: '15%' }}>Quantity</Text>
                            <Text style={{ width: '15%' }}>Price</Text>
                            <Text style={{ width: '15%' }}>Total</Text>
                        </View>
                    </View>
                  
                    {/* Invoice Details */}
                    <View style={styles.invDetail}>
                        <View style={{ flexDirection: "column", columnGap: 10, width: '30%', marginRight: 10 }}>
                            <View style={styles.invDetailRow}>
                                <Text style={styles.text}>Subtotal</Text>
                                <Text style={styles.text}>$1,750.00</Text>
                            </View>
                            <View style={styles.invDetailRow}>
                                <Text style={styles.text}>Tax (10%)</Text>
                                <Text style={styles.text}>$175.00</Text>
                            </View>
                            <View style={styles.invDetailRow}>
                                <Text style={[styles.text, styles.textBold]}>Total</Text>
                                <Text style={[styles.text, styles.textBold]}>$1,925.00</Text>
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