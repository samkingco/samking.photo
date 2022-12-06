import {
  DialogContent as ReachDialogContent,
  DialogOverlay as ReachDialogOverlay,
} from "@reach/dialog";
import React from "react";
import { styled } from "../../stitches.config";

const ModalOverlay = styled(
  ReachDialogOverlay,
  {
    "&[data-reach-dialog-overlay]": {
      zIndex: 10,
      minHeight: "100vh",
      background: "$background",
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      overflow: "auto",
    },
  },
  {
    "&[data-reach-dialog-overlay]": {
      minHeight: "-webkit-fill-available",
    },
  }
);

const ModalContent = styled(ReachDialogContent, {
  "&[data-reach-dialog-content]": {
    width: "100%",
    height: "100%",
    margin: 0,
    padding: 0,
    background: "$background",
  },
});

type ModalProps = {
  children: React.ReactNode;
  a11yLabel: string;
  isOpen: boolean;
  onClose: () => void;
};

export function Modal({ children, a11yLabel, isOpen, onClose }: ModalProps) {
  return (
    <ModalOverlay
      isOpen={isOpen}
      onDismiss={onClose}
      allowPinchZoom={true}
      className="modal-overlay"
    >
      <ModalContent aria-label={a11yLabel}>{children}</ModalContent>
    </ModalOverlay>
  );
}
