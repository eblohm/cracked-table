import PleaseSignIn from '../components/PleaseSignIn';
import OrderList from '../components/OrderList';

const OrdersPage = props => {
  return (
    <div>
      <PleaseSignIn>
        <OrderList />
      </PleaseSignIn>
    </div>
  );
};

export default OrdersPage;
