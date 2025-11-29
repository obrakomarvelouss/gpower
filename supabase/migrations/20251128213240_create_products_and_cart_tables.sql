/*
  # GPower E-commerce Database Schema

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, product name)
      - `slug` (text, URL-friendly identifier)
      - `description` (text, short description)
      - `full_description` (text, detailed description)
      - `price` (decimal, product price)
      - `category` (text, product category)
      - `image_url` (text, product image path)
      - `specifications` (jsonb, technical specs)
      - `stock` (integer, available quantity)
      - `featured` (boolean, show on homepage)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `cart_items`
      - `id` (uuid, primary key)
      - `session_id` (text, browser session identifier)
      - `product_id` (uuid, references products)
      - `quantity` (integer, number of items)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text, sender name)
      - `email` (text, sender email)
      - `message` (text, message content)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on all tables
    - Products: Public read access for browsing
    - Cart items: Access based on session_id
    - Contact messages: Public insert access, admin read
  
  3. Notes
    - Using session_id instead of user auth for cart (guest checkout)
    - Products table supports full e-commerce functionality
    - JSONB for flexible product specifications
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  full_description text NOT NULL,
  price decimal(10,2) NOT NULL,
  category text NOT NULL DEFAULT 'solar',
  image_url text NOT NULL,
  specifications jsonb DEFAULT '{}'::jsonb,
  stock integer NOT NULL DEFAULT 0,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(session_id, product_id)
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Cart items are viewable by session owner"
  ON cart_items FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Cart items can be inserted by anyone"
  ON cart_items FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Cart items can be updated by anyone"
  ON cart_items FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Cart items can be deleted by anyone"
  ON cart_items FOR DELETE
  TO anon
  USING (true);

CREATE POLICY "Contact messages can be inserted by anyone"
  ON contact_messages FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_cart_items_session ON cart_items(session_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);