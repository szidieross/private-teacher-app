"use client";

import React, { useState } from "react";
import { Modal, Button, Typography } from "@mui/material";
import { useUserContext } from "@/app/(client)/hooks/context.hook";

interface Props {
  open: boolean;
  onClose: () => void;
}

const UploadForm: React.FC<Props> = ({ open, onClose }) => {
  const [file, setFile] = useState<File>();
  const { userInfo, setUserInfo } = useUserContext();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error(await res.text());
      setUserInfo((prevState) => {
        return {
          ...prevState,
          userImg: file.name,
        };
      });
      onClose();
    } catch (error) {
      console.error(e);
    }
  };

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
        <Typography variant="h5" align="center" gutterBottom>
          Upload Image
        </Typography>
        <form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="contained-button-file"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0])}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Choose Image
            </Button>
          </label>
          {file && (
            <Typography variant="body1" style={{ marginTop: "20px" }}>
              File selected: {file.name}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Upload
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default UploadForm;
