import { useState } from "react";
import { useRemoveProductMutation } from "../api";

import { toast } from "sonner";
import type { Product } from "@/shared/types";
import { useTranslation } from "react-i18next";

export const useProductItemState = (product: Product) => {
  const [show, setShow] = useState(false);
  const [removeProduct] = useRemoveProductMutation();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { t } = useTranslation();

  const handleRemove = async () => {
    try {
      await removeProduct(+product.id).unwrap();
      handleClose();
      toast.success(t("Product deleted"));
    } catch (e) {
      console.error("Failed to delete product", e);
    }
  };
  return { show, handleClose, handleShow, handleRemove };
};
