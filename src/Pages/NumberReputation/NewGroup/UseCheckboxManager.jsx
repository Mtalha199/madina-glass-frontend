import { useState, useCallback } from "react";

const useCheckboxManager = (initialServices) => {
  const [checkedStates, setCheckedStates] = useState(
    initialServices.reduce((acc, service) => {
      acc[service.id] = false;
      return acc;
    }, {})
  );

  const [error, setError] = useState(null);

  const toggleCheckbox = useCallback((id) => {
    setCheckedStates((prev) => {
      const updatedStates = {
        ...prev,
        [id]: !prev[id],
      };

      if (Object.values(updatedStates).some((checked) => checked)) {
        setError(null);
      }

      return updatedStates;
    });
  }, []);

  const validateCheckboxes = useCallback(() => {
    const isAnyChecked = Object.values(checkedStates).some((checked) => checked);
    if (!isAnyChecked) {
      setError("Please select at least one service to proceed.");
      return false;
    }
    return true;
  }, [checkedStates]);

  return { checkedStates, toggleCheckbox, validateCheckboxes, error };
};

export default useCheckboxManager;
