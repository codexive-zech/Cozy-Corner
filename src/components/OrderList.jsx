import { useLoaderData } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const OrderList = () => {
  const { productOrders, metaInfo } = useLoaderData();
  return (
    <>
      <div className=" mt-10">
        <h3 className="mb-5 capitalize font-semibold">
          Total Products Ordered : {metaInfo.pagination.total}
        </h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Products</th>
                <th>Cost</th>
                <th className=" hidden md:block">Date</th>
              </tr>
            </thead>
            <tbody>
              {productOrders.map((order) => {
                const { name, address, orderTotal, numItemsInCart, createdAt } =
                  order.attributes;
                const { id } = order.id;
                const dateOrdered = day(createdAt).format(
                  "hh:mm a - MMM Do, YYYY"
                );
                return (
                  <tr key={id}>
                    <th>{name}</th>
                    <td>{address}</td>
                    <td>{numItemsInCart}</td>
                    <td>{orderTotal}</td>
                    <td className=" hidden md:block">{dateOrdered}</td>
                  </tr>
                );
              })}
              {/* row 3 */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrderList;
