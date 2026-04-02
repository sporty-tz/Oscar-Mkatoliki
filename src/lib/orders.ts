import { supabase } from "./supabase";
import type { Product } from "./products";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface OrderResult {
  id: string;
  order_number: string;
  total_amount: number;
  delivery_fee: number;
  status: string;
  payment_status: string;
  created_at: string;
}

export interface DonationResult {
  id: string;
  amount: number;
  status: string;
}

// ─── Place Order (works for guest + authenticated users) ─────────────────────

export async function placeOrder(payload: {
  items: (Product & { qty: number })[];
  subtotal: number;
  shipping: number;
  total: number;
  delivery: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
  paymentMethod: "mpesa" | "card";
  mpesaPhone?: string;
}): Promise<OrderResult> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const orderNumber = `OM-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  // 1. Insert order
  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .insert({
      order_number: orderNumber,
      user_id: user?.id ?? null,
      status: "pending",
      payment_status: "unpaid",
      subtotal: payload.subtotal,
      delivery_fee: payload.shipping,
      total_amount: payload.total,
      currency: "TZS",
      notes: `${payload.delivery.name} | ${payload.delivery.phone} | ${payload.delivery.email} | ${payload.delivery.address}, ${payload.delivery.city}`,
    })
    .select(
      "id, order_number, total_amount, delivery_fee, status, payment_status, created_at",
    )
    .single();

  if (orderErr) throw orderErr;

  // 2. Insert order items (snapshot product data)
  const items = payload.items.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    product_name: item.name,
    product_image: item.image,
    quantity: item.qty,
    unit_price: item.price,
    subtotal: item.price * item.qty,
  }));

  const { error: itemsErr } = await supabase.from("order_items").insert(items);
  if (itemsErr) throw itemsErr;

  // 3. Create payment record
  const { error: payErr } = await supabase.from("payments").insert({
    order_id: order.id,
    provider: payload.paymentMethod,
    provider_ref: payload.paymentMethod === "mpesa" ? payload.mpesaPhone : null,
    amount: payload.total,
    currency: "TZS",
    status: "pending",
  });
  if (payErr) throw payErr;

  return order as OrderResult;
}

// ─── Fetch Order by ID or order_number ───────────────────────────────────────

export async function getOrder(orderNumber: string) {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `id, order_number, status, payment_status, subtotal, delivery_fee,
       total_amount, currency, notes, created_at,
       order_items(product_name, product_image, quantity, unit_price, subtotal)`,
    )
    .eq("order_number", orderNumber)
    .single();

  if (error) return null;
  return data;
}

// ─── Create Donation ─────────────────────────────────────────────────────────

export async function createDonation(payload: {
  amount: number;
  donorName?: string;
  phone?: string;
  paymentMethod: "mpesa" | "card";
  cause?: string;
}): Promise<DonationResult> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("donations")
    .insert({
      user_id: user?.id ?? null,
      donor_name: payload.donorName || null,
      amount: payload.amount,
      currency: "TZS",
      cause: payload.cause || "General",
      payment_method: payload.paymentMethod,
      provider_ref: payload.paymentMethod === "mpesa" ? payload.phone : null,
      status: "pending",
      message: null,
    })
    .select("id, amount, status")
    .single();

  if (error) throw error;
  return data as DonationResult;
}
