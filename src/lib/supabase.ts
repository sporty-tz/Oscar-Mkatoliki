import { createClient, type RealtimeChannel } from "@supabase/supabase-js";

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.PUBLIC_SUPABASE_URL ||
  "";
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
  "";
const ASSETS_BUCKET = import.meta.env.VITE_SUPABASE_ASSETS_BUCKET || "Assets";
// Root folder inside the bucket — "All Assets" from the Supabase dashboard
const ASSETS_FOLDER =
  import.meta.env.VITE_SUPABASE_ASSETS_FOLDER || "All Assets";

/** Returns the full path inside the bucket, e.g. "All Assets/avatar/01.jpg" */
export function assetPath(subPath: string): string {
  return `${ASSETS_FOLDER}/${subPath}`;
}

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Keeps failure explicit during setup if env is missing.
  throw new Error(
    "Missing Supabase env: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env",
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export function getAssetPublicUrl(path: string): string {
  const { data } = supabase.storage.from(ASSETS_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadAsset(file: File, path: string): Promise<string> {
  const { error } = await supabase.storage
    .from(ASSETS_BUCKET)
    .upload(path, file, { upsert: true });
  if (error) throw error;
  return getAssetPublicUrl(path);
}

export async function invokeEdgeFunction<T = unknown>(
  functionName: string,
  body?:
    | string
    | Record<string, unknown>
    | Blob
    | ArrayBuffer
    | FormData
    | File,
): Promise<T> {
  const { data, error } = await supabase.functions.invoke(functionName, {
    body,
  });
  if (error) throw error;
  return data as T;
}

/* ─── currency helper ─── */
export function formatCurrency(val: number): string {
  return new Intl.NumberFormat("en-TZ", {
    style: "currency",
    currency: "TZS",
  }).format(val);
}

/* ─── auth ─── */
export async function signup(name: string, email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } },
  });
  if (error) throw error;
  return data;
}

export async function signin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signInWithGoogle(redirectPath = "/") {
  const redirectTo = `${window.location.origin}${redirectPath}`;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  });
  if (error) throw error;
  return data;
}

export async function signout() {
  await supabase.auth.signOut();
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/* ─── products ─── */
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  currency: string;
  image_url: string | null;
  is_featured: boolean;
  inventor_count: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  icon_class: string | null;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface StaticPage {
  slug: string;
  title: string;
  body: string | null;
  sections: Array<{ id?: string; title: string; content?: string }>;
}

export interface UserProfile {
  user_id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  preferred_language: string | null;
  preferred_currency: string | null;
}

export interface UserContact {
  id: string;
  user_id: string;
  label: string;
  phone: string;
  is_primary: boolean;
}

export interface UserAddress {
  id: string;
  user_id: string;
  label: string;
  address_line_1: string;
  city: string | null;
  region: string | null;
  is_default: boolean;
}

export interface UserPaymentMethod {
  id: string;
  user_id: string;
  provider: string;
  method_type: "mobile_money" | "card" | "bank" | "cash";
  account_name: string | null;
  account_ref: string | null;
  last4: string | null;
  is_default: boolean;
}

export interface WalletTransaction {
  id: string;
  transaction_type: "credit" | "debit" | "refund" | "adjustment";
  method: string | null;
  document_type: string | null;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
}

export async function loadProducts(limit = 50): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(
      "id,name,slug,description,price,currency,image_url,is_featured,inventor_count",
    )
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("loadProducts", error);
    return [];
  }
  return data as Product[];
}

export async function loadCategories(limit = 50): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id,name,slug,image_url,icon_class")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .limit(limit);
  if (error) {
    console.error("loadCategories", error);
    return [];
  }
  return data as Category[];
}

export async function loadBrands(limit = 50): Promise<Brand[]> {
  const { data, error } = await supabase
    .from("brands")
    .select("id,name,slug,image_url")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .limit(limit);
  if (error) {
    console.error("loadBrands", error);
    return [];
  }
  return data as Brand[];
}

export async function loadFaqs(): Promise<FaqItem[]> {
  const { data, error } = await supabase
    .from("faqs")
    .select("id,question,answer")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("loadFaqs", error);
    return [];
  }
  return data as FaqItem[];
}

export async function loadStaticPage(slug: string): Promise<StaticPage | null> {
  const { data, error } = await supabase
    .from("static_pages")
    .select("slug,title,body,sections")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();
  if (error) {
    console.error("loadStaticPage", error);
    return null;
  }
  return data as StaticPage;
}

/* ─── cart ─── */
export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  products: { name: string; image_url: string | null };
}

export async function getCart(): Promise<CartItem[]> {
  const user = await getCurrentUser();
  if (!user) return [];
  const { data, error } = await supabase
    .from("cart_items")
    .select("id,product_id,quantity,unit_price,products(name,image_url)")
    .eq("user_id", user.id);
  if (error) {
    console.error("getCart", error);
    return [];
  }
  return data as unknown as CartItem[];
}

export async function addToCart(
  productId: string,
  unitPrice: number,
  quantity = 1,
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");
  const { data: existing } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .single();

  if (existing) {
    await supabase
      .from("cart_items")
      .update({ quantity: existing.quantity + quantity })
      .eq("id", existing.id);
  } else {
    await supabase.from("cart_items").insert({
      user_id: user.id,
      product_id: productId,
      quantity,
      unit_price: unitPrice,
    });
  }
}

export async function removeCartItem(itemId: string) {
  await supabase.from("cart_items").delete().eq("id", itemId);
}

export async function getCartCount(): Promise<number> {
  const user = await getCurrentUser();
  if (!user) return 0;
  const { data, error } = await supabase
    .from("cart_items")
    .select("id")
    .eq("user_id", user.id);
  if (error) return 0;
  return data.length;
}

export async function getCartSubtotal(): Promise<number> {
  const cart = await getCart();
  return cart.reduce((sum, item) => sum + item.quantity * item.unit_price, 0);
}

/* ─── wishlist ─── */
export async function addToWishlist(productId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");
  await supabase
    .from("wishlist_items")
    .insert({ user_id: user.id, product_id: productId });
}

/* ─── orders ─── */
export interface Order {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  currency: string;
  shipping_address: string | null;
  payment_method: string;
  payment_status: string;
  delivery_fee: number | null;
  discount: number | null;
  total_items: number | null;
  delivery_eta: string | null;
  created_at: string;
}

export async function checkout(payload: {
  shipping_address: string;
  shipping_address_id?: string;
  payment_method: string;
}): Promise<Order> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  const cart = await getCart();
  if (cart.length === 0) throw new Error("Cart is empty");

  const total = cart.reduce(
    (sum, item) => sum + item.quantity * item.unit_price,
    0,
  );
  const orderNumber = "ORD-" + Date.now();

  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .insert([
      {
        user_id: user.id,
        order_number: orderNumber,
        status: "pending",
        total_amount: total,
        subtotal: total,
        total_items: cart.reduce((sum, item) => sum + item.quantity, 0),
        currency: "TZS",
        shipping_address: payload.shipping_address,
        shipping_address_id: payload.shipping_address_id || null,
        payment_method: payload.payment_method || "cash",
        payment_status: "pending",
      },
    ])
    .select()
    .single();
  if (orderErr) throw orderErr;

  const items = cart.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    unit_price: item.unit_price,
    subtotal: item.quantity * item.unit_price,
  }));
  const { error: itemsErr } = await supabase.from("order_items").insert(items);
  if (itemsErr) throw itemsErr;

  await supabase.from("cart_items").delete().eq("user_id", user.id);
  return order as Order;
}

export async function initiateOrderPayment(orderId: string, method: string) {
  return invokeEdgeFunction("initiate-payment", { orderId, method });
}

export async function sendOrderNotification(orderId: string, event: string) {
  return invokeEdgeFunction("send-order-notification", { orderId, event });
}

export async function loadOrders(status = "all"): Promise<Order[]> {
  const user = await getCurrentUser();
  if (!user) return [];
  let query = supabase.from("orders").select("*").eq("user_id", user.id);
  if (status && status !== "all") query = query.eq("status", status);
  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) {
    console.error("loadOrders", error);
    return [];
  }
  return data as Order[];
}

/* ─── contact ─── */
export async function submitContact(
  name: string,
  email: string,
  subject: string,
  message: string,
) {
  const { error } = await supabase
    .from("contact_requests")
    .insert([{ name, email, subject, message }]);
  if (error) throw error;
  return true;
}

/* ─── profile / account ─── */
export async function getMyProfile(): Promise<UserProfile | null> {
  const user = await getCurrentUser();
  if (!user) return null;
  const { data, error } = await supabase
    .from("user_profiles")
    .select(
      "user_id,full_name,email,phone,avatar_url,preferred_language,preferred_currency",
    )
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error("getMyProfile", error);
    return null;
  }
  return data as UserProfile;
}

export async function upsertMyProfile(payload: {
  full_name?: string;
  phone?: string;
  avatar_url?: string;
  preferred_language?: string;
  preferred_currency?: string;
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  const { data: updatedRows, error: updateError } = await supabase
    .from("user_profiles")
    .update({ ...payload })
    .eq("user_id", user.id)
    .select("user_id");

  if (updateError) throw updateError;
  if ((updatedRows?.length ?? 0) > 0) return;

  const { error: insertError } = await supabase.from("user_profiles").insert({
    user_id: user.id,
    email: user.email || null,
    full_name: user.user_metadata?.full_name || null,
    ...payload,
  });

  if (insertError) {
    if (insertError.code === "42501") {
      throw new Error(
        "Profile row insert is blocked by RLS. Add an INSERT policy for user_profiles where auth.uid() = user_id.",
      );
    }
    throw insertError;
  }
}

export async function ensureMyProfileRow() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  const profile = await getMyProfile();
  if (profile) return profile;

  await upsertMyProfile({
    full_name: user.user_metadata?.full_name || "",
    phone: "",
  });

  return getMyProfile();
}

export async function listMyContacts(): Promise<UserContact[]> {
  const user = await getCurrentUser();
  if (!user) return [];
  const { data, error } = await supabase
    .from("user_contacts")
    .select("id,user_id,label,phone,is_primary")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("listMyContacts", error);
    return [];
  }
  return data as UserContact[];
}

export async function addMyContact(label: string, phone: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");
  const { error } = await supabase
    .from("user_contacts")
    .insert({ user_id: user.id, label, phone });
  if (error) throw error;
}

export async function deleteMyContact(id: string) {
  const { error } = await supabase.from("user_contacts").delete().eq("id", id);
  if (error) throw error;
}

export async function listMyAddresses(): Promise<UserAddress[]> {
  const user = await getCurrentUser();
  if (!user) return [];
  const { data, error } = await supabase
    .from("user_addresses")
    .select("id,user_id,label,address_line_1,city,region,is_default")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("listMyAddresses", error);
    return [];
  }
  return data as UserAddress[];
}

export async function addMyAddress(payload: {
  label: string;
  address_line_1: string;
  city?: string;
  region?: string;
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");
  const { error } = await supabase
    .from("user_addresses")
    .insert({ user_id: user.id, ...payload });
  if (error) throw error;
}

export async function deleteMyAddress(id: string) {
  const { error } = await supabase.from("user_addresses").delete().eq("id", id);
  if (error) throw error;
}

export async function listMyPaymentMethods(): Promise<UserPaymentMethod[]> {
  const user = await getCurrentUser();
  if (!user) return [];
  const { data, error } = await supabase
    .from("user_payment_methods")
    .select(
      "id,user_id,provider,method_type,account_name,account_ref,last4,is_default",
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("listMyPaymentMethods", error);
    return [];
  }
  return data as UserPaymentMethod[];
}

export async function addMyPaymentMethod(payload: {
  provider: string;
  method_type: "mobile_money" | "card" | "bank" | "cash";
  account_name?: string;
  account_ref?: string;
  last4?: string;
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");
  const { error } = await supabase
    .from("user_payment_methods")
    .insert({ user_id: user.id, ...payload });
  if (error) throw error;
}

export async function deleteMyPaymentMethod(id: string) {
  const { error } = await supabase
    .from("user_payment_methods")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

export async function requiresProfileCompletion(): Promise<boolean> {
  const profile = await ensureMyProfileRow();
  const addresses = await listMyAddresses();
  if (!profile) return true;
  return !profile.phone || addresses.length === 0;
}

/* ─── wallet + realtime ─── */
export async function loadWalletTransactions(): Promise<WalletTransaction[]> {
  const user = await getCurrentUser();
  if (!user) return [];
  const { data, error } = await supabase
    .from("wallet_transactions")
    .select(
      "id,transaction_type,method,document_type,amount,currency,status,created_at",
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("loadWalletTransactions", error);
    return [];
  }
  return data as WalletTransaction[];
}

export function subscribeToOrders(
  userId: string,
  onChange: () => void,
): RealtimeChannel {
  return supabase
    .channel(`orders:${userId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "orders",
        filter: `user_id=eq.${userId}`,
      },
      onChange,
    )
    .subscribe();
}

export function subscribeToCart(
  userId: string,
  onChange: () => void,
): RealtimeChannel {
  return supabase
    .channel(`cart:${userId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "cart_items",
        filter: `user_id=eq.${userId}`,
      },
      onChange,
    )
    .subscribe();
}

export function subscribeToWallet(
  userId: string,
  onChange: () => void,
): RealtimeChannel {
  return supabase
    .channel(`wallet:${userId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "wallet_transactions",
        filter: `user_id=eq.${userId}`,
      },
      onChange,
    )
    .subscribe();
}

/* ─── blog ─── */
export interface BlogAuthor {
  id: string;
  name: string;
  slug: string;
  bio: string | null;
  avatar_url: string | null;
  email: string | null;
  social_links: Record<string, string>;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface BlogPost {
  id: string;
  author_id: string | null;
  category_id: string | null;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image_url: string | null;
  tags: string[];
  view_count: number;
  published_at: string | null;
  blog_authors?: {
    id: string;
    name: string;
    bio: string | null;
    avatar_url: string | null;
    slug: string;
    email: string | null;
    social_links: Record<string, string>;
  } | null;
  blog_categories?: { name: string; slug: string } | null;
}

export interface BlogComment {
  id: string;
  post_id: string;
  author_name: string | null;
  comment: string;
  created_at: string;
}

export async function loadBlogPosts(limit = 20): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      "id,author_id,category_id,title,slug,excerpt,featured_image_url,tags,view_count,published_at,blog_authors(id,name,avatar_url,slug,email,social_links),blog_categories(name,slug)",
    )
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("loadBlogPosts", error);
    return [];
  }
  return data as unknown as BlogPost[];
}

export async function loadBlogPost(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      "*,blog_authors(id,name,bio,avatar_url,slug,email,social_links),blog_categories(name,slug)",
    )
    .eq("slug", slug)
    .eq("is_published", true)
    .single();
  if (error) {
    console.error("loadBlogPost", error);
    return null;
  }
  return data as unknown as BlogPost;
}

export async function loadBlogCategories(): Promise<BlogCategory[]> {
  const { data, error } = await supabase
    .from("blog_categories")
    .select("id,name,slug,description")
    .eq("is_active", true)
    .order("name");
  if (error) {
    console.error("loadBlogCategories", error);
    return [];
  }
  return data as BlogCategory[];
}

export async function loadBlogAuthor(id: string): Promise<BlogAuthor | null> {
  const { data, error } = await supabase
    .from("blog_authors")
    .select("id,name,slug,bio,avatar_url,email,social_links")
    .eq("id", id)
    .eq("is_active", true)
    .single();
  if (error) {
    console.error("loadBlogAuthor", error);
    return null;
  }
  return data as BlogAuthor;
}

export async function loadBlogPostsByAuthor(
  authorId: string,
  limit = 10,
): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      "id,author_id,category_id,title,slug,excerpt,featured_image_url,tags,view_count,published_at,blog_categories(name,slug)",
    )
    .eq("author_id", authorId)
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("loadBlogPostsByAuthor", error);
    return [];
  }
  return data as unknown as BlogPost[];
}

export async function loadBlogComments(postId: string): Promise<BlogComment[]> {
  const { data, error } = await supabase
    .from("blog_comments")
    .select("id,post_id,author_name,comment,created_at")
    .eq("post_id", postId)
    .eq("is_approved", true)
    .order("created_at", { ascending: true });
  if (error) {
    console.error("loadBlogComments", error);
    return [];
  }
  return data as BlogComment[];
}

export async function submitBlogComment(payload: {
  post_id: string;
  author_name: string;
  author_email: string;
  comment: string;
}) {
  const { error } = await supabase.from("blog_comments").insert([payload]);
  if (error) throw error;
}
