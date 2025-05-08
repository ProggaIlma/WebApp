import { useState } from "react";
export const useDModal = () => {
  const [dModalOpen, setDModalOpen] = useState(false);
  return { dModalOpen, setDModalOpen };
};
