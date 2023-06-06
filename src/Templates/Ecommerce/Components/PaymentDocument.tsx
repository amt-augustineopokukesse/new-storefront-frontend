import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { referenceGenerator } from './EcommerceUtils';
import { ProjectState } from '../../../Redux/Templates/ProjectInitialState';
import { OrderResponse } from '../../../Redux/Payment/PaymentInitialState';

interface DocumentProps {
    project: ProjectState;
    itemCount: number;
    totalOrders: number;
    currentTab: 'Bank' | 'Mobile Money';
    currency: string;
    orderInformation?: OrderResponse;
}
  
const styles = StyleSheet.create({
    page: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30pt',
    },
    header: {
      fontSize: '20pt',
      marginBottom: '20pt',
    },
    otherText: {
        fontSize: '16pt',
        marginBottom: '20pt',
    },
    listItem: {
      fontSize: '12pt',
      marginBottom: '10pt',
    },
  });

const PaymentDocument: React.FC<DocumentProps> = (props) => {

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>{props.project.name} Payment Information</Text>
        <Text style={styles.otherText}>{props.project.phoneNumber && `Contact us on ${props.project.phoneNumber} for any assistance.`}</Text>
        <Text style={styles.listItem}>Items: {props.itemCount}</Text>
        <Text style={styles.listItem}>Total Orders: {props.totalOrders}</Text>
        <Text style={styles.listItem}>Payment Method: {props.currentTab} Transfer</Text>
        <Text style={styles.listItem}>Amount: {props.currency} {Number(props.orderInformation?.amount)?.toLocaleString() || ''}</Text>
        <Text style={styles.listItem}>Order ID: {props.orderInformation?.id}</Text>
        
        <View>
        <Text style={styles.header}>Bank Transfer Details</Text>
        <Text style={styles.listItem}>Account Name: {props.project.name}</Text>
        <Text style={styles.listItem}>Account Number: 00157655478</Text>
        <Text style={styles.listItem}>SWIFT CODE: BARCGHAC</Text>
        <Text style={styles.listItem}>SORT CODE: 030475</Text>
        <Text style={styles.listItem}>Bank Name: Absa Bank</Text>
        <Text style={styles.listItem}>Bank Branch: Adenta</Text>
        <Text style={styles.listItem}>Payment Reference: {props.orderInformation?.id && referenceGenerator(props.orderInformation.id)}</Text>
        </View>
       
        
        <View>
            <Text style={styles.header}>Mobile Money Transfer Details</Text>
            <Text style={styles.listItem}>Account Name: {props.project.name}</Text>
            <Text style={styles.listItem}>Mobile Money Number: {props.project.phoneNumber}</Text>
            <Text style={styles.listItem}>Mobile Money Network: MTN</Text>
            <Text style={styles.listItem}>Payment Reference: {props.orderInformation?.id && referenceGenerator(props.orderInformation.id)}</Text>
        </View>
      </Page>
    </Document>
  );
};



export default PaymentDocument;
