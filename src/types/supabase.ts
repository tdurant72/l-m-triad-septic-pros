export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          appointment_date: string
          created_at: string | null
          customer_id: string | null
          email: string
          end_time: string
          full_name: string
          id: string
          notes: string | null
          phone: string
          property_address: string | null
          review_rating: number | null
          review_text: string | null
          service_id: string
          start_time: string
          status: string
        }
        Insert: {
          appointment_date: string
          created_at?: string | null
          customer_id?: string | null
          email: string
          end_time: string
          full_name: string
          id?: string
          notes?: string | null
          phone: string
          property_address?: string | null
          review_rating?: number | null
          review_text?: string | null
          service_id: string
          start_time: string
          status?: string
        }
        Update: {
          appointment_date?: string
          created_at?: string | null
          customer_id?: string | null
          email?: string
          end_time?: string
          full_name?: string
          id?: string
          notes?: string | null
          phone?: string
          property_address?: string | null
          review_rating?: number | null
          review_text?: string | null
          service_id?: string
          start_time?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      blocked_dates: {
        Row: {
          blocked_date: string
          created_at: string | null
          id: string
          reason: string | null
        }
        Insert: {
          blocked_date: string
          created_at?: string | null
          id?: string
          reason?: string | null
        }
        Update: {
          blocked_date?: string
          created_at?: string | null
          id?: string
          reason?: string | null
        }
        Relationships: []
      }
      business_hours: {
        Row: {
          end_time: string | null
          id: string
          is_open: boolean
          start_time: string | null
          weekday: number
        }
        Insert: {
          end_time?: string | null
          id?: string
          is_open?: boolean
          start_time?: string | null
          weekday: number
        }
        Update: {
          end_time?: string | null
          id?: string
          is_open?: boolean
          start_time?: string | null
          weekday?: number
        }
        Relationships: []
      }
      business_settings: {
        Row: {
          booking_notice_hours: number
          business_address: string | null
          business_email: string | null
          business_name: string
          business_phone: string | null
          created_at: string | null
          id: string
          slot_interval_minutes: number
        }
        Insert: {
          booking_notice_hours?: number
          business_address?: string | null
          business_email?: string | null
          business_name?: string
          business_phone?: string | null
          created_at?: string | null
          id?: string
          slot_interval_minutes?: number
        }
        Update: {
          booking_notice_hours?: number
          business_address?: string | null
          business_email?: string | null
          business_name?: string
          business_phone?: string | null
          created_at?: string | null
          id?: string
          slot_interval_minutes?: number
        }
        Relationships: []
      }
      customers: {
        Row: {
          address: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          internal_notes: string | null
          phone: string
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          internal_notes?: string | null
          phone: string
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          internal_notes?: string | null
          phone?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          description: string | null
          duration_minutes: number
          id: string
          is_active: boolean
          name: string
          price: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_minutes: number
          id?: string
          is_active?: boolean
          name: string
          price?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number
          id?: string
          is_active?: boolean
          name?: string
          price?: number | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
