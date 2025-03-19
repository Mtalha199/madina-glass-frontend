import { useCallback, useEffect, useState } from "react";

export const pollInProgressItems = (data, fetchFunction, interval = 3000) => {
    console.log('pollInProgressItems',data)
  const [pollingIds, setPollingIds] = useState({});
  const [itemLoadingStates, setItemLoadingStates] = useState({});

  // Start polling for an item
  const startPolling = useCallback((id) => {
    if (pollingIds[id]) return; // Already polling this item
    
    setItemLoadingStates(prev => ({ ...prev, [id]: true }));
    
    const timerId = setInterval(async () => {
      try {
        // Fetch the latest data for this specific item
        const response = await fetchFunction(id);
        
        // If the status is no longer in_progress, stop polling
        if (response && response.status !== 'in_progress') {
          stopPolling(id);
        }
      } catch (error) {
        console.error(`Error polling item ${id}:`, error);
      }
    }, interval);
    
    setPollingIds(prev => ({ ...prev, [id]: timerId }));
  }, [pollingIds, fetchFunction, interval]);

  // Stop polling for an item
  const stopPolling = useCallback((id) => {
    if (pollingIds[id]) {
      clearInterval(pollingIds[id]);
      setPollingIds(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
      
      setItemLoadingStates(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }
  }, [pollingIds]);

  // Clean up all polling on unmount
  useEffect(() => {
    return () => {
      Object.values(pollingIds).forEach(timerId => {
        clearInterval(timerId);
      });
    };
  }, [pollingIds]);

  // Check data and start polling for in_progress items
  useEffect(() => {
    if (!data || !Array.isArray(data)) return;
    
    data.forEach(item => {
      if (item.status !== 'COMPLETED' && !pollingIds[item.id]) {
        startPolling(item.id);
      }
    });
  }, [data, startPolling, pollingIds]);

  return {
    isItemLoading: (id) => !!itemLoadingStates[id],
    startPolling,
    stopPolling
  };
};