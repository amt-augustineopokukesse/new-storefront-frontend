import '../../assets/styles/custDashboardStyles/CustOrdersPage.scss';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

type StoreUser = {
    orders: OrderType[];
}

type OrderType = {
    amount: number;
    created_at: string;
    paid: boolean;
    delivery_completed: boolean;
    shipping_reciepient_address: string;
}

export const CustOrdersPage: React.FC = () => {

    const orderInit: OrderType = {
        amount: 0,
        created_at: "",
        paid: false,
        delivery_completed: false,
        shipping_reciepient_address: ""
    }

    const userInit: StoreUser = {
        orders: [ orderInit ]
    }
    
    const [ customerExists, setcustomerExists ] = useState<StoreUser>(userInit);
    
    useEffect(() => {
        const customer = localStorage.getItem("customer");
        if (customer) {
            setcustomerExists(JSON.parse(customer));
        }
    }, []);

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "orderDate", headerName: "Order Date", width: 180 },
        { field: "orderAmount", headerName: "Amount", width: 180 },
        { field: "orderPaid", headerName: "Status", width: 180 },
        { field: "deliveryComplete", headerName: "Delivered", width: 180 },
        { field: "shippingAddress", headerName: "Shipping Address", width: 180}
    ]

    const row = (order: OrderType, idx: number) => {
        return { id: idx, orderDate: new Date(order.created_at).toLocaleDateString(), orderAmount: order.amount, orderPaid: order.paid ? "Paid" : "Not Paid", deliveryComplete: order.delivery_completed ? "Yes" : "No", shippingAddress: order.shipping_reciepient_address}
    }
 
    const rows = customerExists && customerExists.orders &&  customerExists.orders.length ? 
            customerExists.orders.map((order: OrderType, index: number) => row(order, index))
        :   []

    return (
        <div style={{padding: "30px"}} className="orders-container">
            {
                customerExists && customerExists.orders &&  customerExists.orders.length ?
                <h1 className='customer-orders-header'>Orders</h1> : <h2>You have not made any Orders </h2>
            }
            <div style={{ height: 400, width: "fit-content" }} className='orders-table'>
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
        </div>
    )
}