/* eslint-disable react-hooks/exhaustive-deps */
// Invoice.js
import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: { padding: 30 },
    section: { marginBottom: 10 },
    // Add more styles for your invoice layout
});

const Invoice = ({ id, refresh, billingList }) => {
    const [invoiceItem, setInvoiceItem] = useState([])

    useEffect(() => {
        const editList = billingList.find(item => item.id === id)
        setInvoiceItem(editList)
    }, [refresh, id])

        return(
        <Document>
            <Page style={styles.page}>
                <View style={styles.section}>
                    <Text>Invoice # 123</Text>
                    <Text>Date: 2025-09-09</Text>
                </View>
                {/* Add more sections for billing details, items, totals, etc. */}
            </Page>
        </Document>
        )
};

export default Invoice;