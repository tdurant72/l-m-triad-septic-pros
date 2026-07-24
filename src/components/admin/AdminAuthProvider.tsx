"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

type AdminAuthContextType = {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextType>({
  user: null,
  isAdmin: false,
  isLoading: true,
  signOut: async () => {},
});

export const useAdminAuth = () => useContext(AdminAuthContext);

export default function AdminAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          if (mounted) {
            setUser(null);
            setIsAdmin(false);
            setIsLoading(false);
          }
          if (pathname !== "/admin/login") {
            router.push("/admin/login");
          }
          return;
        }

        const currentUser = session.user;
        if (mounted) setUser(currentUser);

        // Check if user is in admin_users table
        const { data: adminData, error } = await supabase
          .from("admin_users")
          .select("*")
          .eq("user_id", currentUser.id)
          .maybeSingle();

        if (mounted) {
          if (adminData && !error) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      if (session) {
        setUser(session.user);
        // Only re-verify if not already verified to prevent UI flickering,
        // or re-verify if needed depending on the event
        if (event === "SIGNED_IN") {
            setIsLoading(true);
            const { data: adminData, error } = await supabase
            .from("admin_users")
            .select("*")
            .eq("user_id", session.user.id)
            .maybeSingle();

            if (adminData && !error) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
            setIsLoading(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
        if (pathname !== "/admin/login") {
          router.push("/admin/login");
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [pathname, router]);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <AdminAuthContext.Provider value={{ user, isAdmin, isLoading, signOut }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
