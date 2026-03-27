import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCurrentUser,
  loadWalletTransactions,
  subscribeToWallet,
  type WalletTransaction,
} from "../lib/supabase";
import "@/styles/wallet.css";

const statusClass: Record<string, string> = {
  paid: "green",
  due: "red",
  cancel: "red",
  return: "orange",
  process: "yellow",
};

export default function Wallet() {
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);

  useEffect(() => {
    let mounted = true;
    let channel: ReturnType<typeof subscribeToWallet> | null = null;

    (async () => {
      const user = await getCurrentUser();
      const rows = await loadWalletTransactions();
      if (!mounted) return;
      setTransactions(rows);

      if (user) {
        channel = subscribeToWallet(user.id, async () => {
          const next = await loadWalletTransactions();
          if (mounted) setTransactions(next);
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

  const totalCredit = useMemo(
    () =>
      transactions
        .filter(
          (t) =>
            t.transaction_type === "credit" || t.transaction_type === "refund",
        )
        .reduce((sum, t) => sum + Number(t.amount), 0),
    [transactions],
  );

  const totalDebit = useMemo(
    () =>
      transactions
        .filter((t) => t.transaction_type === "debit")
        .reduce((sum, t) => sum + Number(t.amount), 0),
    [transactions],
  );

  const balance = totalCredit - totalDebit;

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
          <h2>my wallet</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              wallet
            </li>
          </ol>
        </div>
      </section>

      <section className="inner-section wallet-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="account-card">
                <div className="account-title">
                  <h4>my wallet</h4>
                </div>
                <div className="account-content">
                  <div className="my-wallet">
                    <p>Your Current Balance</p>
                    <h3>TZS {balance.toLocaleString()}</h3>
                  </div>
                  <div className="wallet-card-group">
                    <div className="wallet-card green">
                      <h3>TZS {totalCredit.toLocaleString()}</h3>
                      <p>total credit</p>
                    </div>
                    <div className="wallet-card red">
                      <h3>TZS {totalDebit.toLocaleString()}</h3>
                      <p>total debit</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="account-card">
                <div className="account-title">
                  <h4>wallet recharge</h4>
                </div>
                <div className="account-content">
                  <form className="wallet-form">
                    <div className="form-group">
                      <label className="form-label">amount</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Enter your amount"
                      />
                    </div>
                    <div className="wallet-suggest">
                      {[5000, 10000, 25000, 50000, 100000, 500000].map(
                        (amt) => (
                          <button key={amt} type="button">
                            TZS {amt.toLocaleString()}
                          </button>
                        ),
                      )}
                    </div>
                    <button type="submit" className="form-btn">
                      add to wallet
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="account-card">
                <div className="account-title">
                  <h4>Wallet Transaction</h4>
                </div>
                <div className="account-content">
                  <div className="table-scroll">
                    <table className="table-list">
                      <thead>
                        <tr>
                          <th>SL</th>
                          <th>transaction date</th>
                          <th>payment method</th>
                          <th>document type</th>
                          <th>received amount</th>
                          <th>order amount</th>
                          <th>status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((t, i) => (
                          <tr key={t.id}>
                            <td>{i + 1}</td>
                            <td>
                              {new Date(t.created_at).toLocaleDateString()}
                            </td>
                            <td>{t.method || "-"}</td>
                            <td>{t.document_type || "-"}</td>
                            <td>
                              {t.transaction_type === "credit" ||
                              t.transaction_type === "refund"
                                ? `TZS ${Number(t.amount).toLocaleString()}`
                                : "-"}
                            </td>
                            <td>
                              {t.transaction_type === "debit"
                                ? `TZS ${Number(t.amount).toLocaleString()}`
                                : "-"}
                            </td>
                            <td>
                              <span
                                className={statusClass[t.status] || "yellow"}
                              >
                                {t.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
