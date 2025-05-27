export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string
          client_id: string
          stylist_id: string
          service_id: string
          salon_id: string
          start_time: string
          end_time: string
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          payment_status: 'pending' | 'paid' | 'refunded' | 'failed'
          payment_intent_id: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          stylist_id: string
          service_id: string
          salon_id: string
          start_time: string
          end_time: string
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          payment_status?: 'pending' | 'paid' | 'refunded' | 'failed'
          payment_intent_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          stylist_id?: string
          service_id?: string
          salon_id?: string
          start_time?: string
          end_time?: string
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          payment_status?: 'pending' | 'paid' | 'refunded' | 'failed'
          payment_intent_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          booking_id: string
          client_id: string
          stylist_id: string
          salon_id: string
          rating: number
          comment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          client_id: string
          stylist_id: string
          salon_id: string
          rating: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          client_id?: string
          stylist_id?: string
          salon_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      salons: {
        Row: {
          id: string
          name: string
          address: string
          city: string
          state: string
          zip_code: string
          phone: string
          email: string
          timezone: string
          opening_hours: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          address: string
          city: string
          state: string
          zip_code: string
          phone: string
          email: string
          timezone?: string
          opening_hours: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string
          city?: string
          state?: string
          zip_code?: string
          phone?: string
          email?: string
          timezone?: string
          opening_hours?: Json
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          salon_id: string
          name: string
          description: string
          duration: number
          price: number
          category: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          salon_id: string
          name: string
          description: string
          duration: number
          price: number
          category: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          salon_id?: string
          name?: string
          description?: string
          duration?: number
          price?: number
          category?: string
          created_at?: string
          updated_at?: string
        }
      }
      stylists: {
        Row: {
          id: string
          user_id: string
          salon_id: string
          license_number: string
          license_expiry: string
          specialties: string[]
          bio: string | null
          availability: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          salon_id: string
          license_number: string
          license_expiry: string
          specialties?: string[]
          bio?: string | null
          availability: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          salon_id?: string
          license_number?: string
          license_expiry?: string
          specialties?: string[]
          bio?: string | null
          availability?: Json
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          phone: string | null
          role: 'super_admin' | 'manager' | 'stylist' | 'client'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          phone?: string | null
          role?: 'super_admin' | 'manager' | 'stylist' | 'client'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          phone?: string | null
          role?: 'super_admin' | 'manager' | 'stylist' | 'client'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}