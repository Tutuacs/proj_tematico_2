import { useSession } from "next-auth/react";
import { Backend_URL } from "@/lib/Constants";
import { getToastConfig } from "@/components/ui/toastConfig";
import { toast, useToast } from "@/components/ui/use-toast";
// import { useToast } from "@/components/ui/use-toast";
// import { getToastConfig, toastConfig } from "@/components/ui/toastConfig";

const useFetch = (title?: string) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  
  const refreshToken = async () => {
    if (!session || !session.tokens) return;

    const res = await fetch(`${Backend_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        authorization: `Refresh ${session.tokens.refresh}`,
      },
    });

    const response = await res.json();
    session.profile = response.profile;

    session.tokens = response;
  };

  const fetchWithAuth = async (url: string, options: RequestInit & { showToast?: boolean } = {}) => {
    if (!session || !session.profile) return;

    const { showToast = true, ...fetchOptions } = options;

    const headers: Record<string, string> = {
      ...(fetchOptions.headers as Record<string, string> || {}),
      Authorization: `Bearer ${session.tokens.access}`,
    };

    // Add Content-Type header if body is present
    if (fetchOptions.body && typeof fetchOptions.body === 'string') {
      headers['Content-Type'] = 'application/json';
    }

    if (!(new Date().getTime() < session.tokens.expiresIn)){
      await refreshToken();
      headers.Authorization = `Bearer ${session.tokens.access}`;
    }
    
    const res = await fetch(`${Backend_URL}${url}`, { ...fetchOptions, headers });

    return handleResponse(res, showToast);
  };

  const handleResponse = async (res: Response, showToast = true) => {
    const data = await res.json();
    
    if (showToast) {
      const config = getToastConfig(res.status.toString());

      if (res.status === 200 || res.status === 201) {
        data.message = title;
      }

      toast({ title: config!.title, description: data!.message, variant: config!.variant });
    }

    return { data, status: res.status };
  };

  return { fetchWithAuth };
};

export default useFetch;