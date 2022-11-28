import {
  DialogContent as ReachDialogContent,
  DialogOverlay as ReachDialogOverlay,
} from "@reach/dialog";
import React from "react";

interface ModalProps {
  children: React.ReactNode;
  a11yLabel: string;
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ children, a11yLabel, isOpen, onClose }: ModalProps) {
  return (
    <ReachDialogOverlay
      isOpen={isOpen}
      onDismiss={onClose}
      allowPinchZoom={true}
      className="modal-overlay"
    >
      <ReachDialogContent aria-label={a11yLabel} className="modal-content">
        {children}
      </ReachDialogContent>
    </ReachDialogOverlay>
  );
}
