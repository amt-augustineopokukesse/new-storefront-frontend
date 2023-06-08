import { useEffect, useState } from 'react';
import '../../assets/styles/dashboardStyles/DashboardPage.scss'
import { useAppDispatch } from '../../store';
import { AuthLoader } from '../../components/authComponents/AuthLoader';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { Order } from '../CustDashboard/CustomerInitialState';
import { getStores, updateDelivery } from '../../Redux/Templates/ProjectActions';
import { useFormik } from 'formik';
import { BiWindowClose } from 'react-icons/bi';
import { GrDocumentUpdate } from 'react-icons/gr';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { MdOutlineBorderColor, MdOutlineNewLabel } from 'react-icons/md';




interface Project {
    id: number;
    orders: Order[];
}

interface OrderRow {
    customerId: string;
    deliveryComplete: string;
    deliveryLevel: string;
    id: string;
    orderAmount: string;
    orderDate: string;
    orderPaid: string;
    products: string[];
    shippingAddress: string;
    shippingContact: string[];
    shippingReceipient: string[];
}

const OrderRowInit = {
    customerId: "",
    deliveryComplete: "",
    deliveryLevel: "",
    id: "",
    orderAmount: "",
    orderDate: "",
    orderPaid: "",
    products: [],
    shippingAddress: "",
    shippingContact: [],
    shippingReceipient: [],
}

const orderInit: Order = {
    amount: 0,
    created_at: "",
    paid: false,
    delivery_completed: false,
    shipping_reciepient_address: "",
    delivery_level_reached: "",
    id: "",
    userId: "",
    payment_method: "",
    pickup_mode: "",
    products: "",
    shipping_reciepient_contacts: [],
    shipping_reciepient_names: []
}

export const DashboardPage: React.FC = () => {

    const [loader, setLoader] = useState<boolean>(false);
    const [earnings, setEarnings] = useState(0);
    const [orders, setOrders] = useState(0);
    const [views, setViews] = useState(0);
    const [totalStores, setTotalStores] = useState(0);
    const [trackOrders, setTrachOrders] = useState([orderInit]);
    const [editorder, setEditorder] = useState(false);
    const [viewpdf, setviewpdf] = useState(false);
    const [confirmModal, setconfirmModal] = useState(false);
    const [updateId, setUpdateId] = useState("");
    const [labelValues, setlabelValues] = useState<OrderRow>(OrderRowInit);


    const dispatch = useAppDispatch();

    const getAllStores = async () => {
        try {
            const response = await dispatch(getStores());
            if (response) {                
                if (response.payload.data) {
                    const store = response.payload.data;
                    const totalAmountPaid: number = store.projects.reduce((accumulator: number, project: Project) => {
                        const paidOrders: Order[] = project.orders.filter((order: Order) => order.paid);
                        const paidAmounts: number[] = paidOrders.map((order: Order) => Number(order.amount));
                        return accumulator + paidAmounts.reduce((sum: number, amount: number) => sum + amount, 0);
                    }, 0);
                    const totalOrders: number = store.projects.reduce((accumulator: number, currentValue: Project) => accumulator + currentValue.orders.length, 0);

                    const totalViews: number = store.projects.reduce((accumulator: number, currentValue: { view_count: number; }) => accumulator + currentValue.view_count, 0);

                    const AllOrders = store.projects.map((project: Project) => project.orders);
                    setTrachOrders(AllOrders.flat())
                    setTotalStores(store.projects.length)
                    setEarnings(totalAmountPaid);
                    setOrders(totalOrders);
                    setViews(totalViews);
                }
                setTimeout(()=>{
                    setLoader(false);
                }, 500)
            }
        } catch (error) {
            setLoader(false);
            console.log(error)
            toast.error("Error Retrieving Storefront Stores")
            return;
        }
    }
    useEffect(() => {
        setLoader(true);
        getAllStores();
    },[]);

    const styles = StyleSheet.create({
        page: {
          flexDirection: 'column',
          backgroundColor: '#E4E4E4'
        },
        section: {
          margin: 10,
          padding: 10,
          flexGrow: 1
        }
      });
    
    const MyDocument = () => (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text style={{marginBottom: "30px", textAlign: "center", fontSize: "9px", color: "red"}}>!!Confidential - Storefront - Confidential - Storefront - Confidential - Storefront - Confidential - Storefront - Confidential!!</Text>
              <Text style={{textAlign: "center"}}>----------------------------------</Text>
              <Text style={{color: "red", textAlign: "center"}}>Order Shipping Label</Text>
              <Text style={{marginBottom: "50px", textAlign: "center"}}>----------------------------------</Text>
              <Text style={{textAlign: "center"}} > Label Date</Text>
              <Text style={{textAlign: "center", marginBottom: "30px"}} > ** {Date()} **</Text>
              <Text style={{marginHorizontal: "50px", marginBottom: "30px"}} > ** Order ID: {labelValues.id}</Text>
              <Text style={{marginHorizontal: "50px", marginBottom: "30px"}} > ** Order Date: {labelValues.orderDate}</Text>
    
              <Text style={{marginHorizontal: "50px", marginBottom: "30px"}} > ** Receipient Name: {labelValues.shippingReceipient}</Text>
              <Text style={{marginHorizontal: "50px", marginBottom: "30px"}} > ** Receipient Address: {labelValues.shippingAddress}</Text>
              <Text style={{marginHorizontal: "50px", marginBottom: "30px"}} > ** Receipient Contact: {labelValues.shippingContact}</Text>
              <Text style={{marginHorizontal: "50px", marginBottom: "30px"}} > ** Expected Arrival: 48hrs after Label Date</Text>
              <Text style={{textAlign: "center", marginTop: "50px", fontSize: "50px", color: "green"}} > {labelValues.orderPaid}</Text>
            </View>
          </Page>
        </Document>
    );

    /**
     * orderDate: "",
    orderPaid
    orderDate: string;
    orderPaid: string;
    products: string[];
    shippingAddress: string;
    shippingContact: string[];
    shippingReceipient: string[];
     */
    
    const ViewDoc = () => (
        <PDFViewer style={{height: "100%", width: "80%", display: "flex", margin: "auto"}}>
            <MyDocument />
        </PDFViewer>
    )

    const changeOrderStatusButton = (params: { id: unknown; }) => {
        return (
            <MdOutlineBorderColor 
                className='update-button'
                onClick={(e) => {
                    e.stopPropagation();
                    setUpdateId(params.id as string);
                    handleOpenEditOrder();
                }}
            />
        )
    }

    useEffect(() => {
        (() => {
            if (labelValues.id) {
                setviewpdf(true);
    
                console.log(labelValues)
                const readerRooot = createRoot(document.getElementById('doc-content')!);
                readerRooot.render(<ViewDoc />);
                toast.info("Shipping Label Generated!!")
            }
        })()
    }, [labelValues])

    // const xxx = () => {
    //     console.log(labelValues)
    //     console.log("dfdfdf")
    //     if (labelValues.id) {
    //         setviewpdf(true);

    //         console.log(labelValues)
    //         const readerRooot = createRoot(docContainer!);
    //         readerRooot.render(<ViewDoc />);
    //     }
    // }

    const generateOrderLabel = (params: { row: OrderRow; }) => {
        return (
            <GrDocumentUpdate 
                className='update-button'
                onClick={(e) => {
                    e.stopPropagation();
                    setlabelValues(params.row);
                    // xxx();
                    
                    // ReactDOM.render(<ViewDoc />, document.getElementById('doc-content'));
                    // const docContainer = document.getElementById('doc-content');
                    
                }}
            />
        )
    }


    const columns: GridColDef[] = [
        { field: "labels", headerName: "Generate Label", width: 120, renderCell: generateOrderLabel },
        { field: "update", headerName: "Update Status", width: 100, renderCell: changeOrderStatusButton },
        { field: "id", headerName: "Order ID", width: 300 },
        { field: "orderDate", headerName: "Order Date", width: 95 },
        { field: "orderAmount", headerName: "Amount", width: 95 },
        { field: "orderPaid", headerName: "Payment", width: 80 },
        { field: "deliveryLevel", headerName: "Delivery Level", width: 150 },
        { field: "deliveryComplete", headerName: "Delivered", width: 120 },
        { field: "customerId", headerName: "Customer", width: 250},
        { field: "shippingAddress", headerName: "Shipping Address", width: 150},
        { field: "shippingReceipient", headerName: "Reciever Name", width: 150},
        { field: "shippingContact", headerName: "Shipping Contact", width: 180},
        { field: "products", headerName: "Items", width: 500},
    ]


    
    const row = (order: Order) => {
        return {id: order.id, orderDate: new Date(order.created_at).toLocaleDateString(), orderAmount: order.amount, orderPaid: order.paid ? "Paid" : "Not Paid", deliveryLevel: getdeliveryLevel(order.delivery_level_reached), deliveryComplete: order.delivery_completed ? "Yes" : "No", customerId: order.userId, shippingAddress: order.shipping_reciepient_address, shippingReceipient: order.shipping_reciepient_names, shippingContact: order.shipping_reciepient_contacts, products: JSON.parse(order.products || "[]")}
    }

    const getdeliveryLevel = (value?: string) => {
        switch (value) {
            case "L_ONE":
                return "1/5 starting";
                break;
            case "L_TWO":
                return "2/5 moved";
                break;
            case "L_THREE":
                return "3/5 halfway";
                break;
            case "L_FOUR":
                return "4/5 almost";
                break;
            case "L_FIVE":
                return "5/5 completed";
                break;
            default:
                return "1/5 start";
        }
    }

    const rows = trackOrders && trackOrders.length ?
            trackOrders.map((order: Order) => row(order))
        :   []

    const handleOpenEditOrder = () => {
        setconfirmModal(false)
        setEditorder(editorder ? false : true)
        if (editorder === true) {
            setUpdateId("");
        }
    }

    const handleOpenConfirmModal = () => {
        setconfirmModal(confirmModal ? false : true)
    }

    const handlePdfClose = () => {
        setlabelValues(OrderRowInit);
        setviewpdf(false);
    }

    const handleMe = (e: EventTarget) => {
        if (e === document.getElementById("doc-content")) {
            handlePdfClose();
        }
    }

    const formik = useFormik({
        initialValues: { orderid: updateId, deliverylevel: ""},
        onSubmit: async (values, action) => {
            try {
                action.resetForm();
                const { payload } = await dispatch(updateDelivery({orderId: updateId, deliveryLevel: values.deliverylevel}))
                if (payload.success) {
                    toast.success(payload.message);
                    getAllStores();
                    setEditorder(false);
                } else toast.error(payload);
                setEditorder(false);
                setUpdateId("");
                return;
            } catch (error) {
                toast.warn("An error occurred");
                console.log(error);
                setUpdateId("");
                return false;
            }
        }
    })
    return (
        <div className='dashboard-page'>
            <div className='top-containers'>
                <div className='site-created-div block-view'>
                    <h3>Sites Created</h3>
                    <p>{ totalStores }</p>
                </div>
                <div className='views-div block-view'>
                    <h3>Views</h3>
                    <p>{views}</p>
                </div>
                <div className='order-div block-view'>
                    <h3>Orders</h3>
                    <p>{orders }</p>
                </div>
                <div className="earnings-div block-view">
                    <h3>Earnings</h3>
                    <p>GH &#8373; {earnings.toLocaleString()}</p>
                </div>
            </div>
            <div className='grid-top'>
                <h2 className='grid-header'>Order Tracker</h2>  
                <button onClick={handleOpenEditOrder} className='edit-order-button'>Update Order Status</button>
            </div>
            <div className="grid-container">
                
                <form onSubmit={formik.handleSubmit} style={{display: `${editorder ? "flex" : "none"}`}} className='edit-order-form'>
                    <BiWindowClose onClick={handleOpenEditOrder} className='order-form-close' />
                    <div onClick={handleOpenConfirmModal} className='order-pre-submit'>Submit</div>
                    <div style={{display: `${confirmModal ? "flex" : "none"}`}} className='submit-modal'>
                        <p style={{textAlign: "center"}} className='confirm-change'>{updateId ? `Confirm This Change for Order Id ${updateId}` : "Confirm"}</p>
                        <button 
                            disabled={!formik.values.deliverylevel || !updateId} 
                            className='yes-confirm' type='submit'>Yes</button>
                        <div onClick={handleOpenConfirmModal} className='dont-confirm'>Close</div>
                    </div>
                    <div className='edit-order-div'>
                        <div className='order-input-div'>
                            <label htmlFor="order-id">Order ID</label>
                            <input onChange={(e) => setUpdateId(e.target.value)} 
                                value={updateId}
                                name="orderid" className='order-input' type="text" id="" placeholder='Enter order id (eg. d123fvffvdvv333333)' />
                        </div>
                        <div className='order-input-div'>
                            <label htmlFor="order-id">Change Delivery Level</label>
                            <select onChange={formik.handleChange} 
                                value={formik.values.deliverylevel}
                                name="deliverylevel" className='order-input'>
                                <option value="">----</option>
                                <option value="L_ONE">starting</option>
                                <option value="L_TWO">moved</option>
                                <option value="L_THREE">halfway</option>
                                <option value="L_FOUR">almost</option>
                                <option value="L_FIVE">completed</option>
                            </select>
                        </div>
                    </div>
                </form>
                <div style={{ overflow: "auto", height: '80%', width: "100%"}}>
                    <DataGrid style={{width: "91%"}}
                        rows={rows}
                        isCellEditable={() => true}
                        columns={columns}
                        initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                        }}
                        pageSizeOptions={[4, 5, 8, 10]}
                        checkboxSelection
                    />
                </div>
            </div>
            <div onClick={e => handleMe(e.target)} style={{display: `${viewpdf ? "flex" : "none"}`}} id='pdf-viewer'>
                <div id='doc-content'></div>
                <BiWindowClose onClick={handlePdfClose} className='pdf-reader-close' />
            </div>
            {loader && <AuthLoader />}
        </div>
    )
}

