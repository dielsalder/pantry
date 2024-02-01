import { useDisclosure, useFocusTrap } from "@mantine/hooks";
import { useEditTableItem } from "./useEditTableItem";
import { type KeyboardEvent } from "react";
export function useField() {
  const [editing, { open, close, toggle }] = useDisclosure();
  const { mutateAsync, isLoading } = useEditTableItem();
  const focusTrapRef = useFocusTrap();
  const inputProps = {
    onClick: toggle,
    onBlur: close,
    ref: focusTrapRef,
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Escape") close();
    },
  };
  const cellProps = {
    onClick: open,
    loading: isLoading,
  };
  return {
    editing,
    open,
    close,
    toggle,
    inputProps,
    cellProps,
    mutateAsync,
    focusTrapRef,
    isLoading,
  };
}
