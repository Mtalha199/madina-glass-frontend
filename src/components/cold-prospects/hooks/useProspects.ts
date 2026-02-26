import { useState, useEffect, useRef } from "react";
import { fetchProspects, ProspectFilters } from "../services/prospect.api";


export const useProspects = (filters?: ProspectFilters) => {
  const [prospects, setProspects] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (abortControllerRef.current) abortControllerRef.current.abort();
    
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    
    const load = async () => {
      try {
        const response = await fetchProspects(filters, abortController.signal);
        if (!isMounted) return;
        
        if (response.success && response.data) {
          setProspects(response.data.prospects);
          setMeta(response.data.meta);
        } else {
          setError(response.message || "Failed to fetch prospects");
        }
      } catch (err: any) {
        if (err?.name === 'AbortError') return;
        setError(err.message || "An error occurred");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    setIsLoading(true);
    load();
    return () => { isMounted = false; abortController.abort(); };
  }, [fetchTrigger, JSON.stringify(filters)]);

  return { prospects, meta, isLoading, error, refetch: () => setFetchTrigger(f => f + 1) };
};