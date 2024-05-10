"use client";

import { getSession } from "@/app/actions";
import { Button, Container, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

const UploadForm: FC = () => {
  
  // useEffect(() => {
  //   const fetchSession=async()=>{
  //   const session = await getSession();
  //   const userId=session.userId
  //   console.log("userIduserIduserId",userId)
  //   setId(userId)
  //   }
  //   fetchSession()
  // }, [])
  

  const [file, setFile] = useState<File>();
  const [id, setId] = useState<number|undefined>(undefined);

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
    } catch (error) {
      console.error(e);
    }
  };
  return (
    // <main>
    //   <form onSubmit={onSubmit}>
    //     <input
    //       type="file"
    //       name="file"
    //       onChange={(e) => setfile(e.target.files?.[0])}
    //     />
    //     <input type="submit" value="Upload image" />
    //   </form>
    // </main>
    <Container maxWidth="sm">
      <Typography variant="h5" align="center" gutterBottom>
        Upload Image
      </Typography>
      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: "20px" }}>
          Upload
        </Button>
      </form>
    </Container>
  );
};

export default UploadForm;
