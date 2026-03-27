import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  addMyAddress,
  addMyContact,
  addMyPaymentMethod,
  assetPath,
  deleteMyAddress,
  deleteMyContact,
  deleteMyPaymentMethod,
  ensureMyProfileRow,
  getAssetPublicUrl,
  getCurrentUser,
  listMyAddresses,
  listMyContacts,
  listMyPaymentMethods,
  uploadAsset,
  upsertMyProfile,
  type UserAddress,
  type UserContact,
  type UserPaymentMethod,
} from "../lib/supabase";
import "@/styles/profile.css";

export default function Profile() {
  const [searchParams] = useSearchParams();
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [userId, setUserId] = useState("");
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [contacts, setContacts] = useState<UserContact[]>([]);
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<UserPaymentMethod[]>([]);
  const [statusMessage, setStatusMessage] = useState("");
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const defaultAvatar = getAssetPublicUrl(assetPath("avatar/01.jpg"));
  const paymentIcon = getAssetPublicUrl(assetPath("payment/png/01.png"));
  const bannerImage = getAssetPublicUrl(assetPath("single-banner.jpg"));

  const loadAll = async () => {
    const [user, profile, contactRows, addressRows, paymentRows] =
      await Promise.all([
        getCurrentUser(),
        ensureMyProfileRow(),
        listMyContacts(),
        listMyAddresses(),
        listMyPaymentMethods(),
      ]);

    setName(profile?.full_name || user?.user_metadata?.full_name || "");
    setEmail(profile?.email || user?.email || "");
    setPhone(profile?.phone || "");
    setAvatarUrl(profile?.avatar_url || "");
    setUserId(user?.id || "");
    setContacts(contactRows);
    setAddresses(addressRows);
    setPaymentMethods(paymentRows);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const saveProfile = async () => {
    setIsSaving(true);
    setStatusMessage("");
    try {
      await upsertMyProfile({ full_name: name, phone });
      setStatusMessage("Profile saved successfully.");
      await loadAll();
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "Failed to save profile",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const onAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!userId) {
      setStatusMessage("User session not found. Please sign in again.");
      event.target.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      setStatusMessage("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    const maxBytes = 5 * 1024 * 1024;
    if (file.size > maxBytes) {
      setStatusMessage("Profile photo must be 5MB or less.");
      event.target.value = "";
      return;
    }

    setIsUploadingAvatar(true);
    setStatusMessage("");
    try {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const storagePath = assetPath(`avatar/${userId}-${Date.now()}.${ext}`);
      const publicUrl = await uploadAsset(file, storagePath);
      await upsertMyProfile({ avatar_url: publicUrl });
      setAvatarUrl(publicUrl);
      setStatusMessage("Profile photo updated successfully.");
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "Failed to upload photo",
      );
    } finally {
      setIsUploadingAvatar(false);
      event.target.value = "";
    }
  };

  const addContact = async () => {
    const label = prompt("Contact label (e.g. primary, secondary):", "primary");
    if (!label) return;
    const phoneValue = prompt("Contact phone:", "+255");
    if (!phoneValue) return;
    try {
      await addMyContact(label, phoneValue);
      await loadAll();
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "Failed to add contact",
      );
    }
  };

  const addAddress = async () => {
    const label = prompt("Address label (e.g. Home, Office):", "Home");
    if (!label) return;
    const text = prompt("Address line:", "Dar es Salaam");
    if (!text) return;
    try {
      await addMyAddress({
        label,
        address_line_1: text,
        city: "Dar es Salaam",
      });
      await loadAll();
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "Failed to add address",
      );
    }
  };

  const addPayment = async () => {
    const provider = prompt("Provider (M-Pesa, Card, Bank):", "M-Pesa");
    if (!provider) return;
    const accountRef = prompt("Account/Phone/Card ref:", "");
    try {
      await addMyPaymentMethod({
        provider,
        method_type: provider.toLowerCase().includes("card")
          ? "card"
          : "mobile_money",
        account_ref: accountRef || undefined,
      });
      await loadAll();
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "Failed to add payment method",
      );
    }
  };

  return (
    <>
      <section
        className="inner-section single-banner"
        style={{
          background: `url(${bannerImage}) no-repeat center`,
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <h2>my profile</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              profile
            </li>
          </ol>
        </div>
      </section>

      <section className="inner-section profile-part">
        <div className="container">
          {searchParams.get("complete") === "1" && (
            <div className="alert-info" style={{ marginBottom: "20px" }}>
              <p>
                Complete your profile with phone and delivery address before
                checkout.
              </p>
            </div>
          )}
          {statusMessage && (
            <div className="alert-info" style={{ marginBottom: "20px" }}>
              <p>{statusMessage}</p>
            </div>
          )}
          <div className="row">
            {/* Profile Info */}
            <div className="col-lg-12">
              <div className="account-card">
                <div className="account-title">
                  <h4>Your Profile</h4>
                  <button onClick={saveProfile} disabled={isSaving}>
                    {isSaving ? "saving..." : "save profile"}
                  </button>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="profile-image">
                        <button
                          type="button"
                          className="profile-avatar-btn"
                          onClick={() => avatarInputRef.current?.click()}
                          disabled={isUploadingAvatar}
                        >
                          <img src={avatarUrl || defaultAvatar} alt="user" />
                        </button>
                        <input
                          ref={avatarInputRef}
                          type="file"
                          accept="image/*"
                          onChange={onAvatarChange}
                          style={{ display: "none" }}
                        />
                        <p className="profile-avatar-hint">
                          {isUploadingAvatar ? "Uploading..." : "Change photo"}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                          className="form-control"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                          className="form-control"
                          type="email"
                          value={email}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="form-group">
                        <label className="form-label">Phone</label>
                        <input
                          className="form-control"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <div className="profile-btn">
                        <Link to="/change-password">change pass.</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Numbers */}
            <div className="col-lg-12">
              <div className="account-card">
                <div className="account-title">
                  <h4>contact number</h4>
                  <button onClick={addContact}>add contact</button>
                </div>
                <div className="account-content">
                  <div className="row">
                    {contacts.map((c) => (
                      <div
                        key={c.id}
                        className="col-md-6 col-lg-4 alert fade show"
                      >
                        <div
                          className={`profile-card contact${c.is_primary ? " active" : ""}`}
                        >
                          <h6>{c.label}</h6>
                          <p>{c.phone}</p>
                          <ul>
                            <li>
                              <button
                                className="edit icofont-edit"
                                title="Edit This"
                              ></button>
                            </li>
                            <li>
                              <button
                                className="trash icofont-ui-delete"
                                title="Remove This"
                                onClick={() =>
                                  deleteMyContact(c.id).then(loadAll)
                                }
                              ></button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Addresses */}
            <div className="col-lg-12">
              <div className="account-card">
                <div className="account-title">
                  <h4>delivery address</h4>
                  <button onClick={addAddress}>add address</button>
                </div>
                <div className="account-content">
                  <div className="row">
                    {addresses.map((a) => (
                      <div
                        key={a.id}
                        className="col-md-6 col-lg-4 alert fade show"
                      >
                        <div
                          className={`profile-card address${a.is_default ? " active" : ""}`}
                        >
                          <h6>{a.label}</h6>
                          <p>
                            {a.address_line_1}
                            {a.city ? `, ${a.city}` : ""}
                          </p>
                          <ul className="user-action">
                            <li>
                              <button
                                className="edit icofont-edit"
                                title="Edit This"
                              ></button>
                            </li>
                            <li>
                              <button
                                className="trash icofont-ui-delete"
                                title="Remove This"
                                onClick={() =>
                                  deleteMyAddress(a.id).then(loadAll)
                                }
                              ></button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="col-lg-12">
              <div className="account-card mb-0">
                <div className="account-title">
                  <h4>payment option</h4>
                  <button onClick={addPayment}>add method</button>
                </div>
                <div className="account-content">
                  <div className="row">
                    {paymentMethods.map((pm) => (
                      <div
                        key={pm.id}
                        className="col-md-6 col-lg-4 alert fade show"
                      >
                        <div
                          className={`payment-card payment${pm.is_default ? " active" : ""}`}
                        >
                          <img src={paymentIcon} alt="payment" />
                          <h4>{pm.provider}</h4>
                          <p>
                            <span>{pm.method_type}</span>
                            {pm.last4 && <sup>...{pm.last4}</sup>}
                          </p>
                          <h5>
                            {pm.account_name ||
                              pm.account_ref ||
                              "Saved method"}
                          </h5>
                          <button
                            className="trash icofont-ui-delete"
                            title="Remove This"
                            onClick={() =>
                              deleteMyPaymentMethod(pm.id).then(loadAll)
                            }
                          ></button>
                        </div>
                      </div>
                    ))}
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
