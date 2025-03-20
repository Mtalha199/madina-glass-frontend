import { useCallback, useEffect, useState } from "react";

export const pollInProgressItems = (DATA,MAX_POLLING_TIME, fetchFunction, interval = 3000) => {
      const checkPendingItems = () => {
        if (!Array.isArray(DATA) || DATA.length === 0) return;
        const pendingItems = DATA.filter((item) => item.state !== "COMPLETED");
  
        const newLoadingState = {};
        pendingItems.forEach((item) => {
          const createdDate = new Date(item.createdAt);
          const currentTime = new Date();
          const timeDifferenceInMinutes =
            (currentTime - createdDate) / (1000 * 60);
          if (timeDifferenceInMinutes < MAX_POLLING_TIME) {
            newLoadingState[item.id] = true;
          }
        });
        setLoaderDownload(newLoadingState);
        if (pendingItems.length > 0) {
          pendingItems.forEach(async (row) => {
            const checkStatus = async () => {
              const response = await APICALL(
                API_TYPE.GET,
                `${API_END_POINT.RATE_DECK}/${row.id}`,
                setloadingId,
                null,
                setDataId,
                setCountId
              );
              const createdDate = new Date(response.data.data.createdAt);
              const currentTime = new Date();
              const timeDifferenceInMinutes =
                (currentTime - createdDate) / (1000 * 60);
              if (response.data.data.state === "COMPLETED") {
                delete newLoadingState[response.data.data.id];
                setLoaderDownload(newLoadingState);
              } else if (timeDifferenceInMinutes > 20) {
                delete newLoadingState[response.data.data.id];
                setLoaderDownload({ ...newLoadingState });
              } else {
                setTimeout(checkStatus, 5000);
              }
            };
            checkStatus();
          });
        }
      };
      checkPendingItems();
};