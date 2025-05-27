/*
  # Initial Schema for Coiffure+

  1. New Tables
    - `salons`
      - Basic salon information
      - Operating hours
      - Contact details
    - `stylists`
      - Stylist profiles
      - Certification info
      - Work schedule
    - `services`
      - Available services
      - Pricing
      - Duration
    - `bookings`
      - Appointment scheduling
      - Service selection
      - Payment status
    - `users`
      - Customer profiles
      - Authentication
    - `reviews`
      - Customer feedback
      - Ratings

  2. Security
    - Enable RLS on all tables
    - Policies for different user roles
    - Data access control
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('super_admin', 'manager', 'stylist', 'client');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'refunded', 'failed');

-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text NOT NULL UNIQUE,
  full_name text NOT NULL,
  phone text,
  role user_role NOT NULL DEFAULT 'client',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create salons table
CREATE TABLE IF NOT EXISTS salons (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  timezone text NOT NULL DEFAULT 'America/Chicago',
  opening_hours jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create stylists table
CREATE TABLE IF NOT EXISTS stylists (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id),
  salon_id uuid NOT NULL REFERENCES salons(id),
  license_number text NOT NULL,
  license_expiry date NOT NULL,
  specialties text[] NOT NULL DEFAULT '{}',
  bio text,
  availability jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  salon_id uuid NOT NULL REFERENCES salons(id),
  name text NOT NULL,
  description text NOT NULL,
  duration integer NOT NULL, -- in minutes
  price decimal(10,2) NOT NULL,
  category text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id uuid NOT NULL REFERENCES users(id),
  stylist_id uuid NOT NULL REFERENCES stylists(id),
  service_id uuid NOT NULL REFERENCES services(id),
  salon_id uuid NOT NULL REFERENCES salons(id),
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  status booking_status NOT NULL DEFAULT 'pending',
  payment_status payment_status NOT NULL DEFAULT 'pending',
  payment_intent_id text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id uuid NOT NULL REFERENCES bookings(id),
  client_id uuid NOT NULL REFERENCES users(id),
  stylist_id uuid NOT NULL REFERENCES stylists(id),
  salon_id uuid NOT NULL REFERENCES salons(id),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE salons ENABLE ROW LEVEL SECURITY;
ALTER TABLE stylists ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Super admins can view all users"
  ON users
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'super_admin'
  ));

-- Create policies for salons table
CREATE POLICY "Anyone can view salons"
  ON salons
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Managers and super admins can manage salons"
  ON salons
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND (role = 'super_admin' OR role = 'manager')
  ));

-- Create policies for stylists table
CREATE POLICY "Anyone can view stylists"
  ON stylists
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Stylists can update their own profile"
  ON stylists
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Managers and super admins can manage stylists"
  ON stylists
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND (role = 'super_admin' OR role = 'manager')
  ));

-- Create policies for services table
CREATE POLICY "Anyone can view services"
  ON services
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Managers and super admins can manage services"
  ON services
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND (role = 'super_admin' OR role = 'manager')
  ));

-- Create policies for bookings table
CREATE POLICY "Clients can view and manage their own bookings"
  ON bookings
  FOR ALL
  TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Stylists can view and update their assigned bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (stylist_id IN (
    SELECT id FROM stylists WHERE user_id = auth.uid()
  ));

CREATE POLICY "Managers and super admins can manage all bookings"
  ON bookings
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND (role = 'super_admin' OR role = 'manager')
  ));

-- Create policies for reviews table
CREATE POLICY "Anyone can view reviews"
  ON reviews
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Clients can create and manage their own reviews"
  ON reviews
  FOR ALL
  TO authenticated
  USING (client_id = auth.uid());

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_stylists_salon_id ON stylists(salon_id);
CREATE INDEX IF NOT EXISTS idx_services_salon_id ON services(salon_id);
CREATE INDEX IF NOT EXISTS idx_bookings_client_id ON bookings(client_id);
CREATE INDEX IF NOT EXISTS idx_bookings_stylist_id ON bookings(stylist_id);
CREATE INDEX IF NOT EXISTS idx_bookings_salon_id ON bookings(salon_id);
CREATE INDEX IF NOT EXISTS idx_bookings_start_time ON bookings(start_time);
CREATE INDEX IF NOT EXISTS idx_reviews_booking_id ON reviews(booking_id);
CREATE INDEX IF NOT EXISTS idx_reviews_salon_id ON reviews(salon_id);
CREATE INDEX IF NOT EXISTS idx_reviews_stylist_id ON reviews(stylist_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_salons_updated_at
  BEFORE UPDATE ON salons
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stylists_updated_at
  BEFORE UPDATE ON stylists
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();