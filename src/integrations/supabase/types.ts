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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      exercises: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: number
          name: string
          primary_muscle_id: number | null
          secondary_muscle_ids: number[] | null
          updated_at: string | null
          variante: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
          primary_muscle_id?: number | null
          secondary_muscle_ids?: number[] | null
          updated_at?: string | null
          variante?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
          primary_muscle_id?: number | null
          secondary_muscle_ids?: number[] | null
          updated_at?: string | null
          variante?: string | null
        }
        Relationships: []
      }
      muscles: {
        Row: {
          body_part: string
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          body_part: string
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          body_part?: string
          created_at?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      session_exercises: {
        Row: {
          created_at: string | null
          exercise_id: number
          id: number
          joint_discomfort: string | null
          order_index: number | null
          pump: number | null
          session_id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          exercise_id: number
          id?: number
          joint_discomfort?: string | null
          order_index?: number | null
          pump?: number | null
          session_id: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          exercise_id?: number
          id?: number
          joint_discomfort?: string | null
          order_index?: number | null
          pump?: number | null
          session_id?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      set_logs: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: number
          notes: string | null
          reps: number
          rir: number | null
          session_exercise_id: number
          set_number: number
          type: string
          updated_at: string | null
          weight_kg: number
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: number
          notes?: string | null
          reps: number
          rir?: number | null
          session_exercise_id: number
          set_number: number
          type: string
          updated_at?: string | null
          weight_kg: number
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: number
          notes?: string | null
          reps?: number
          rir?: number | null
          session_exercise_id?: number
          set_number?: number
          type?: string
          updated_at?: string | null
          weight_kg?: number
        }
        Relationships: []
      }
      training_sessions: {
        Row: {
          created_at: string | null
          date: string | null
          duration_minutes: number | null
          end_time: string | null
          id: number
          name: string
          notes: string | null
          rpe: number | null
          start_time: string | null
          template_id: number | null
          updated_at: string | null
          user_id: number
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          duration_minutes?: number | null
          end_time?: string | null
          id?: number
          name: string
          notes?: string | null
          rpe?: number | null
          start_time?: string | null
          template_id?: number | null
          updated_at?: string | null
          user_id: number
        }
        Update: {
          created_at?: string | null
          date?: string | null
          duration_minutes?: number | null
          end_time?: string | null
          id?: number
          name?: string
          notes?: string | null
          rpe?: number | null
          start_time?: string | null
          template_id?: number | null
          updated_at?: string | null
          user_id?: number
        }
        Relationships: []
      }
      users: {
        Row: {
          auth_user_id: string | null
          created_at: string | null
          display_name: string | null
          email: string
          id: number
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string | null
          display_name?: string | null
          email: string
          id?: number
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string
          id?: number
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      workout_template_exercises: {
        Row: {
          created_at: string | null
          exercise_id: number
          id: number
          notes: string | null
          order_index: number | null
          target_reps: number | null
          target_sets: number | null
          template_id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          exercise_id: number
          id?: number
          notes?: string | null
          order_index?: number | null
          target_reps?: number | null
          target_sets?: number | null
          template_id: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          exercise_id?: number
          id?: number
          notes?: string | null
          order_index?: number | null
          target_reps?: number | null
          target_sets?: number | null
          template_id?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      workout_templates: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
          updated_at: string | null
          user_id: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
          updated_at?: string | null
          user_id: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
          updated_at?: string | null
          user_id?: number
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
