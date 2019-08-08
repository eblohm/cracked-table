import React from 'react';
import { Query } from 'react-apollo';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import styled from 'styled-components';
import gql from 'graphql-tag';
import formatMoney from '../lib/formatMoney';
import OrderItemStyles from './styles/OrderItemStyles';
import ErrorMessage from './ErrorMessage';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      total
      createdAt
      items {
        id
        title
        price
        description
        quantity
        image
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
  grid-gap: 4rem;
`;

const OrderList = props => {
  return (
    <Query query={USER_ORDERS_QUERY}>
      {({ data: { orders }, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <ErrorMessage error={error} />;
        return (
          <div>
            <h2>
              You have {orders.length} order{orders.length > 1 ? 's' : ''}
            </h2>
            <OrderUl>
              {orders.map(order => (
                <OrderItemStyles key={order.id}>
                  <Link
                    href={{
                      pathname: '/order',
                      query: { id: order.id },
                    }}
                  >
                    <a>
                      <div className="order-meta">
                        <p>
                          {order.items.reduce((a, b) => a + b.quantity, 0)}{' '}
                          Items
                        </p>
                        <p>{order.items.length} Products</p>
                        <p>{formatDistance(order.createdAt, new Date())}</p>
                        <p>{formatMoney(order.total)}</p>
                      </div>
                      <div className="images">
                        {order.items.map(item => (
                          <img
                            key={item.id}
                            src={item.image}
                            alt={item.title}
                          />
                        ))}
                      </div>
                    </a>
                  </Link>
                </OrderItemStyles>
              ))}
            </OrderUl>
          </div>
        );
      }}
    </Query>
  );
};

// const OrderList = props => {
//   return (
//     <User>
//       {({ data: { me } }) => {
//         return (
//           <Query
//             query={USER_ORDERS_QUERY}
//             variables={{
//               id: me.id,
//             }}
//           >
//             {({ error, loading, data }) => {
//               if (error) return <ErrorMessage error={error} />;
//               if (loading) return <p>Loading...</p>;
//               return <p>We did something</p>;
//             }}
//           </Query>
//         );
//       }}
//     </User>
//   );
// };

export default OrderList;
