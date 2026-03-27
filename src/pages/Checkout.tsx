import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  checkout,
  getCartSubtotal,
  getCurrentUser,
  getMyProfile,
  initiateOrderPayment,
  listMyAddresses,
  listMyPaymentMethods,
  type UserAddress,
  type UserPaymentMethod,
} from "../lib/supabase";
import "@/styles/checkout.css";

export default function Checkout() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<UserPaymentMethod[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      const [user, profile, addressRows, paymentRows, cartSubtotal] =
        await Promise.all([
          getCurrentUser(),
          getMyProfile(),
          listMyAddresses(),
          listMyPaymentMethods(),
          getCartSubtotal(),
        ]);

      if (!mounted) return;

      setFullName(profile?.full_name || user?.user_metadata?.full_name || "");
      setPhone(profile?.phone || "");
      setEmail(profile?.email || user?.email || "");
      setAddresses(addressRows);
      setPaymentMethods(paymentRows);
      setSubtotal(cartSubtotal);

      if (addressRows.length > 0) {
        setSelectedAddressId(addressRows[0].id);
        setShippingAddress(addressRows[0].address_line_1);
      }
      if (paymentRows.length > 0) {
        setPaymentMethod(paymentRows[0].provider.toLowerCase());
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const deliveryFee = 0;
  const serviceFee = 0;
  const total = useMemo(
    () => subtotal + deliveryFee + serviceFee,
    [subtotal, deliveryFee, serviceFee],
  );

  const placeOrder = async () => {
    setStatusMessage("");
    setSubmitting(true);
    try {
      const order = await checkout({
        shipping_address: shippingAddress,
        shipping_address_id: selectedAddressId || undefined,
        payment_method: paymentMethod,
      });

      if (paymentMethod.includes("mpesa")) {
        try {
          await initiateOrderPayment(order.id, paymentMethod);
        } catch (paymentError) {
          console.error("initiateOrderPayment", paymentError);
        }
      }

      setStatusMessage(`Order placed successfully. Ref: ${order.order_number}`);
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "Failed to place order",
      );
    } finally {
      setSubmitting(false);
    }
  };

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
          <h2>checkout</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              checkout
            </li>
          </ol>
        </div>
      </section>

      <section className="inner-section checkout-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="alert-info">
                <p>
                  Returning customer?{" "}
                  <Link to="/login">Click here to login</Link>
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="checkout-content">
                <h4 className="checkout-title">Shipping Information</h4>
                <form
                  className="checkout-form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  {statusMessage && (
                    <div
                      className="alert-info"
                      style={{ marginBottom: "15px" }}
                    >
                      <p>{statusMessage}</p>
                    </div>
                  )}
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="+255 xxx xxx xxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {addresses.length > 0 && (
                    <div className="form-group">
                      <label htmlFor="savedAddress">Saved Address</label>
                      <select
                        id="savedAddress"
                        className="form-control"
                        value={selectedAddressId}
                        onChange={(e) => {
                          const nextId = e.target.value;
                          setSelectedAddressId(nextId);
                          const row = addresses.find((a) => a.id === nextId);
                          if (row) setShippingAddress(row.address_line_1);
                        }}
                      >
                        {addresses.map((a) => (
                          <option key={a.id} value={a.id}>
                            {a.label} - {a.address_line_1}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="form-group">
                    <label htmlFor="shippingAddress">Shipping Address</label>
                    <textarea
                      id="shippingAddress"
                      className="form-control"
                      rows={3}
                      placeholder="Your delivery address"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="paymentMethod">Payment Method</label>
                    <select
                      id="paymentMethod"
                      className="form-control"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      {paymentMethods.length > 0 ? (
                        paymentMethods.map((pm) => (
                          <option key={pm.id} value={pm.provider.toLowerCase()}>
                            {pm.provider}
                          </option>
                        ))
                      ) : (
                        <>
                          <option value="mpesa">M-Pesa</option>
                          <option value="cash">Cash on Delivery</option>
                        </>
                      )}
                    </select>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="checkout-content">
                <h4 className="checkout-title">Order Summary</h4>
                <table className="checkout-table" style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td>Subtotal</td>
                      <td>Tsh {subtotal.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>Delivery Fee</td>
                      <td>Tsh {deliveryFee.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>Service Fee</td>
                      <td>Tsh {serviceFee.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total</strong>
                      </td>
                      <td>
                        <strong>Tsh {total.toLocaleString()}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button
                  id="checkout-place-order"
                  className="btn btn-inline"
                  style={{ marginTop: "20px", width: "100%" }}
                  onClick={placeOrder}
                  disabled={submitting}
                >
                  <i className="fas fa-shopping-basket"></i>
                  <span>{submitting ? "placing order..." : "place order"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
