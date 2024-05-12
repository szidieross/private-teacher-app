"use client";

import React from "react";
import { Modal, Button } from "@mui/material";
import UploadForm from "@/app/(client)/(routes)/profile/components/upload-form/upload-form";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: 2,
          width: 400,
        }}
      >
        <h2 id="modal-title">Upload your profile picture</h2>
        <UploadForm />
        <Button onClick={onClose}>Close Modal</Button>
      </div>
    </Modal>
  );
};

export default CustomModal;
