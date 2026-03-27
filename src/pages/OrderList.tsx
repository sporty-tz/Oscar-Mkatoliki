import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCurrentUser,
  loadOrders,
  subscribeToOrders,
  type Order,
} from "../lib/supabase";
import "@/styles/orderlist.css";

export default function OrderList() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let channel: ReturnType<typeof subscribeToOrders> | null = null;

    (async () => {
      const user = await getCurrentUser();
      const rows = await loadOrders("all");
      if (!mounted) return;
      setOrders(rows);
      setLoading(false);

      if (user) {
        channel = subscribeToOrders(user.id, async () => {
          const next = await loadOrders("all");
          if (mounted) setOrders(next);
        });
      }
    })();

    return () => {
      mounted = false;
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, []);

  const visibleOrders = useMemo(
    () =>
      statusFilter === "all"
        ? orders
        : orders.filter((o) => o.status === statusFilter),
    [orders, statusFilter],
  );

  return (
    <>
      <section
        className="inner-section single-banner"
        style={{
          background: "url(/images/single-banner.jpg) no-repeat center",
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <h2>order history</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              orders
            </li>
          </ol>
        </div>
      </section>

      <section className="inner-section orderlist-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="orderlist-filter"
                style={{ marginBottom: "20px" }}
              >
                <select
                  id="orderFilter"
                  className="form-control"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{ maxWidth: "200px" }}
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="table-scroll">
                <table className="table-list">
                  <thead>
                    <tr>
                      <th>Order #</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && (
                      <tr>
                        <td
                          colSpan={5}
                          style={{ textAlign: "center", padding: "30px" }}
                        >
                          <p>Loading orders...</p>
                        </td>
                      </tr>
                    )}
                    {!loading && visibleOrders.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          style={{ textAlign: "center", padding: "30px" }}
                        >
                          <p>
                            No orders yet.{" "}
                            <Link to="/shop">Start shopping</Link>
                          </p>
                        </td>
                      </tr>
                    )}
                    {visibleOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.order_number}</td>
                        <td>
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td>{order.status}</td>
                        <td>
                          Tsh {Number(order.total_amount).toLocaleString()}
                        </td>
                        <td>
                          <Link to="/invoice">view</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
