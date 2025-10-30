import { useState, useCallback, useEffect } from "react";
import { shouldShowShareModal } from "@/utils/shareUtils";

interface UseShareModalOptions {
  enableAutoShow?: boolean;
  delayMs?: number;
}

export const useShareModal = (options: UseShareModalOptions = {}) => {
  const { enableAutoShow = true, delayMs = 1000 } = options;
  const [isOpen, setIsOpen] = useState(false);
  const [canShow, setCanShow] = useState(false);

  useEffect(() => {
    // Check if modal can be shown based on rate limiting
    setCanShow(shouldShowShareModal());
  }, []);

  const showModal = useCallback(() => {
    if (canShow && enableAutoShow) {
      // Add a small delay to not interrupt user flow
      setTimeout(() => {
        setIsOpen(true);
      }, delayMs);
    }
  }, [canShow, enableAutoShow, delayMs]);

  const hideModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openModal = useCallback(() => {
    // Allow manual trigger regardless of rate limiting
    setIsOpen(true);
  }, []);

  return {
    isOpen,
    canShow,
    showModal,
    hideModal,
    openModal,
  };
};
