import React, { useState } from 'react';
import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

// Thiết lập cache: lưu dữ liệu trong 15 giây
const cache = setupCache({
  maxAge: 8 * 1000, // 15 giây
});

// Tạo Axios instance có adapter cache
const api = axios.create({
  adapter: cache.adapter,
});

function App() {
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("");

  const fetchData = async () => {
    try {
      const response = await api.get("https://jsonplaceholder.typicode.com/posts/4");
      setPost(response.data);
      setStatus(response.request.fromCache ? "Cache hit 🟢 (lấy từ cache)" : "Cache miss 🔴 (gọi API mới)");
    } catch (error) {
      console.error(error);
      setStatus("❌ Lỗi khi tải dữ liệu");
    }
  };

  return (
    <div style={{
      fontFamily: "Arial",
      padding: "30px",
      maxWidth: "600px",
      margin: "auto",
      textAlign: "center"
    }}>
      <h2>🧠 Demo Caching với Axios</h2>
      <button 
        onClick={fetchData}
        style={{
          background: "#007bff",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        Fetch Data
      </button>

      {status && <p style={{ marginTop: "20px", fontWeight: "bold" }}>{status}</p>}

      {post && (
        <div style={{
          marginTop: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "15px",
          textAlign: "left",
          background: "#f9f9f9"
        }}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      )}
    </div>
  );
}

export default App;