import '../../assets/styles/custDashboardStyles/CustOrdersPage.scss';
import '../../assets/styles/custDashboardStyles/CustDashboardPage.scss';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store';
import { toast } from 'react-toastify';
import { getOrders } from '../../Redux/Templates/ProjectActions';
import { OrderInit, OrderInitState } from './CustomerInitialState';
import { AuthLoader } from '../../components/authComponents/AuthLoader';


export const CustOrdersPage: React.FC = () => {

    const dispatch = useAppDispatch();
    
    const [loader, setLoader] = useState<boolean>(false);
    const [custOrders, setcustOrders] = useState([OrderInit]);

    const getAllOrders = async () => {
        try {
            const response = await dispatch(getOrders());
            if (response) {
                if (response.payload.data) {
                    const allOrders = response.payload.data;
                    console.log(response.payload.data)
                    setcustOrders(allOrders);
                }

            }
            
            setTimeout(()=>{
                setLoader(false);
            }, 500)
        } catch (error) {
            setLoader(false);
            console.log(error)
            toast.error("Could not retrieve your Orders")
            return;
        }
    }

    useEffect(() => {
        setLoader(true);
        getAllOrders();
    }, []);

    const columns: GridColDef[] = [
        { field: "id", headerName: "Order ID", width: 300 },
        { field: "orderDate", headerName: "Order Date", width: 95 },
        { field: "orderAmount", headerName: "Amount", width: 95 },
        { field: "orderPaid", headerName: "Payment", width: 80 },
        { field: "deliveryLevel", headerName: "Delivery Level", width: 150 },
        { field: "deliveryComplete", headerName: "Delivered", width: 120 },
        { field: "shippingAddress", headerName: "Shipping Address", width: 150},
        { field: "shippingContact", headerName: "Shipping Contact", width: 180},
        { field: "products", headerName: "Items", width: 500},
    ]

    const row = (order: OrderInitState) => {
        return { id: order.id, orderDate: new Date(order.created_at).toLocaleDateString(), orderAmount: order.amount, orderPaid: order.paid ? "Paid" : "Not Paid", deliveryLevel: getdeliveryLevel(order.delivery_level_reached), deliveryComplete: order.delivery_completed ? "Yes" : "No", shippingAddress: order.shipping_reciepient_address, shippingContact: order.shipping_reciepient_contacts, products: JSON.parse(order.products || "[]")}
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
 
    const rows = custOrders &&  custOrders.length ? 
            custOrders.map((order: OrderInitState) => row(order))
        :   []

    return (
        <div style={{width: "87vw"}} className="customer-dashboard-page">
            {
                <h2 className='customer-dashboard-header'><p className='customer-header-text'>{custOrders &&  custOrders.length ? "My Orders" : "You have not made any Orders"}</p></h2>
            }
            <div style={{ overflow: "auto", height: '70%', width: "90%"}} className='grid-container'>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
            {loader && <AuthLoader />}
        </div>
    )
}