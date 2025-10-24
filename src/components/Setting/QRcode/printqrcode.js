/* eslint-disable react-hooks/exhaustive-deps */
import { Document, Page, Text, View,  StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: { flexDirection: 'column', padding: 30, gap: 20, marginTop:30 },
    header: { flexDirection: "row", justifyContent: "center", alignItems: 'center', fontSize: 18, fontFamily: "Helvetica-Bold" },
    text: { flexDirection: "row", justifyContent: "center", alignSelf: 'center', fontSize: 12 },
    textItalic: { fontSize: 12, fontStyle:'italic' },
    image: {
        width: 300, // Set desired width
        height: 300, // Maintain aspect ratio
        margin: 10,
        flexDirection:'row',
        justifyContent:'center',
        alignSelf:'center'
    },
});

const PrintQRcode = ({ link, urlImage }) => {

        return(
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.header} >
                        <Text>SCAN TO BOOK</Text>
                    </View>
                    <Text style={styles.text}>Book your appointment instantly</Text>
                    <Text style={styles.textItalic}>Open your phone camera app and scan the QR code below to check availability, See more details, and reserve your spot today!</Text>                 
                    <Image src={`data:image/png;base64, ${urlImage}`} style={styles.image} />
                    <Text style={styles.textItalic}>{link}</Text>
                </Page>
            </Document>
        )
};

export default PrintQRcode;