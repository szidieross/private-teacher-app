"use client";

import React, { useState } from "react";
import { Modal, Button, Typography } from "@mui/material";
import { useUserContext } from "@/app/(client)/hooks/context.hook";
import { PhotoCameraRounded as PhotoCameraRoundedIcon } from "@mui/icons-material";
import { colors } from "@/app/(client)/constants/color.constant";

interface Props {
  open: boolean;
  onClose: () => void;
}

const UploadForm: React.FC<Props> = ({ open, onClose }) => {
  const [file, setFile] = useState<File | undefined>(undefined);
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
      setUserInfo((prevState) => ({
        ...prevState,
        userImg: file.name,
      }));
      onClose();
      setFile(undefined);
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
          backgroundColor: colors.background,
          padding: "20px",
          borderRadius: "10px",
          width: "400px",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Upload Profile Picture
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
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<PhotoCameraRoundedIcon />}
              sx={{
                mb: 2,
                backgroundColor: colors.primary,
                "&:hover": {
                  bgcolor: colors.mediumPurple,
                },
              }}
            >
              Choose Image
            </Button>
          </label>
          {file && (
            <>
              <Typography
                variant="body1"
                style={{ marginBottom: "20px", fontSize: 12 }}
              >
                Selected File: {file.name}
              </Typography>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "100%",
                  backgroundColor: colors.primary,
                  "&:hover": {
                    bgcolor: colors.mediumPurple,
                  },
                }}
              >
                Upload
              </Button>
            </>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default UploadForm;
