"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import styles from "./form.module.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>
});

export default function BlogEditor({ readOnly, placeholder }) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const quillRef = useRef(null);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block", "blockquote"]
      ]
    }
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "image",
    "code-block",
    "blockquote"
  ];

  const handleSave = async () => {
    try {
      if (!title || !content || !category) {
        alert("Lütfen başlık, içerik ve kategori alanlarını doldurun.");
        return;
      }

      setIsLoading(true);

      const postData = {
        title: title.trim(),
        content,
        summary: summary.trim() || content.slice(0, 150) + "...",
        category: category.trim()
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/test`, postData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        alert("Blog yazısı başarıyla kaydedildi!");
        setTitle("");
        setContent("");
        setSummary("");
        setCategory("");
      }
    } catch (error) {
      console.error("Kaydetme hatası:", error);
      const errorMessage = error.response?.data?.error || error.message;
      alert("Blog yazısı kaydedilirken bir hata oluştu: " + errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.editorContainer}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter blog title"
        className={styles.title}
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter blog category"
        className={styles.category}
      />
      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Enter blog summary"
        className={styles.summary}
        rows={3}
      />
      <div className={styles.editor}>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          placeholder={placeholder || "Write your blog content here..."}
        />
      </div>
      <button 
        onClick={handleSave}
        className={styles.saveButton}
        disabled={isLoading}
      >
        {isLoading ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </div>
  );
}
