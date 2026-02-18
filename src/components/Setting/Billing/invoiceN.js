import React, { useEffect, useState } from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
} from "@react-pdf/renderer";
import { get_Date } from "../../../common/localDate";

const styles = StyleSheet.create({
    page: {
        //padding: 30,
        fontSize: 10,
        fontFamily: "Helvetica",
      //  backgroundColor: "#f5f5f5",
    },

    /* Header */
    header: {
        backgroundColor: "#184d8f",
        color: "white",
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:'center'
    },
    invoiceTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    invoiceNo: {
        fontSize: 10,
    },

    /* Bill Section */
    section: {
        backgroundColor: "white",
        padding: 20,
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    column: {
        width: "45%",
    },
    bold: {
        fontWeight: "bold",
        marginBottom: 3,
    },
    lightText: {
        color: "#555",
    },

    /* Table */
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#184d8f",
        color: "white",
        padding: 6,
        marginTop: 10,
    },
    tableRow: {
        flexDirection: "row",
        padding: 6,
        borderBottom: "1 solid #ccc",
    },
    colDesc: { width: "50%" },
    colQty: { width: "15%", textAlign: "center" },
    colPrice: { width: "15%", textAlign: "center" },
    colTotal: { width: "20%", textAlign: "right" },

    /* Subtotal */
    subtotalContainer: {
        marginTop: 10,
        alignItems: "flex-end",
    },
    subtotalBox: {
        flexDirection: "row",
        backgroundColor: "#184d8f",
        color: "white",
        padding: 6,
        width: "40%",
        justifyContent: "space-between",
    }, 
    
    /* Total */
    totalContainer: {
        marginTop: 10,
        alignItems: "flex-end",
    },
    totalBox: {
        flexDirection: "row",
        backgroundColor: "#184d8f",
        color: "white",
        padding: 6,
        width: "40%",
        justifyContent: "space-between",
    },

    /* Footer */
    footerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
    },
    thankYou: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#184d8f",
    },
    /* Stamp */
    stampWrapper: {
        position: "absolute",
        top: "70%",
        left: "30%",
        width: 200,
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        transform: "rotate(-25deg)",
        opacity: 0.15,
    },

    stampOuter: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 4,
        justifyContent: "center",
        alignItems: "center",
    },

    stampInner: {
        width: 170,
        height: 170,
        borderRadius: 85,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
    },

    stampText: {
        fontSize: 28,
        fontWeight: "bold",
        letterSpacing: 2,
    },

});

const InvoicePDF = ({ data,id, refresh, billingList }) => {
    const {
        
        items,
        bank,
    } = data;

    const subtotal = items.reduce(
        (acc, item) => acc + item.qty * item.price,
        0
    );    
        const [invoice, setInvoice] = useState('');
        const [trnDate, setTrnDate] = useState('');
        const [dueDate, setDueDate] = useState('');
        const [subTotal, setSubTotal] = useState('');
        const [taxAmount, setTaxAmount] = useState('');
        const [tax, setTax] = useState('');
        const [total, setTotal] = useState('');
        const [status, setStatus] = useState('');
        const [billTo, setBillTo] = useState([{name:'',phone:'',address:''}]);
        const [from, setFrom] = useState([{name:'',phone:'',address:''}]);
    
        useEffect(() => {
            const editList = billingList.find(item => item.id === id)
            setInvoice(editList.invoice);
            setTrnDate(editList.trndate);
            setDueDate(editList.duedate);
            setSubTotal(editList.subtotal);
            setTaxAmount(editList.taxamount);
            setTax(editList.tax);
            setTotal(editList.totalamount);
            setStatus(editList.status);
           
        }, [refresh, id])
    
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerRow}>
                        <Text style={styles.invoiceTitle}>INVOICE</Text>
                        <Text style={styles.invoiceNo}>
                            Invoice #: {invoice}
                        </Text>
                    </View>
                </View>

                <View style={styles.section}>
                    {/* Bill To / From */}
                    <View style={styles.rowBetween}>
                        <View style={styles.column}>
                            <Text style={styles.bold}>Bill To:</Text>
                            <Text>{billTo.name}</Text>
                            <Text>{billTo.phone}</Text>
                            <Text>{billTo.address}</Text>
                        </View>

                        <View style={styles.column}>
                            <Text style={styles.bold}>From:</Text>
                            <Text>{from.name}</Text>
                            <Text>{from.phone}</Text>
                            <Text>{from.address}</Text>
                        </View>
                    </View>

                    <Text style={{ marginBottom: 10 }}>Date: {get_Date(trnDate,'DD MMM, YYYY')}</Text>

                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={styles.colDesc}>Description</Text>
                        <Text style={styles.colQty}>Qty</Text>
                        <Text style={styles.colPrice}>Price</Text>
                        <Text style={styles.colTotal}>Total</Text>
                    </View>

                    {/* Table Rows */}
                    <View key={1} style={styles.tableRow}>
                        <Text style={styles.colDesc}>Software data management</Text>
                        <Text style={styles.colQty}>1</Text>
                        <Text style={styles.colPrice}>${parseFloat(subTotal).toFixed(2)}</Text>
                        <Text style={styles.colTotal}>${parseFloat(subTotal).toFixed(2)}</Text>
                    </View>

                    {/* Circular Status Stamp */}                  
                    <View style={styles.stampWrapper}>
                        <View
                            style={[
                                styles.stampOuter,
                                { borderColor: status === "PAID" ? "green" : "red" },
                            ]}
                        >
                            <View
                                style={[
                                    styles.stampInner,
                                    { borderColor: status === "PAID" ? "green" : "red" },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.stampText,
                                        { color: status === "PAID" ? "green" : "red" },
                                    ]}
                                >
                                    {status}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Subtotal */}
                    <View style={styles.subtotalContainer}>
                        <View style={styles.subtotalBox}>
                            <Text>Sub Total</Text>
                            <Text>${parseFloat(subTotal).toFixed(2)}</Text>
                        </View>
                    </View>

                    {/* Total */}
                    <View style={styles.totalContainer}>
                        <View style={styles.totalBox}>
                            <Text>Total</Text>
                            <Text>${parseFloat(total).toFixed(2)}</Text>
                        </View>
                    </View>

                    {/* Footer */}
                    <View style={styles.footerRow}>
                        <View>
                          {/* <Text style={styles.bold}>Payment Information:</Text>
                            <Text>Bank: {bank.name}</Text>
                            <Text>Acc No: {bank.account}</Text>
                            <Text>Email: {bank.email}</Text>*/} 
                        </View>

                        <Text style={styles.thankYou}>Thank You!</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default InvoicePDF;
