"use client";

import { FC, useState } from "react";

const UploadForm: FC = () => {
  const [file, setfile] = useState<File>();

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
        <input type="submit" value="Upload" />
      </form>
    </main>
  );
};

export default UploadForm;
