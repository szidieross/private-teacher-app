"use client";

import { getSession } from "@/app/actions";
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
  

  const [file, setfile] = useState<File>();
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
    <main>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setfile(e.target.files?.[0])}
        />
        <input type="submit" value="Upload image" />
      </form>
    </main>
  );
};

export default UploadForm;
