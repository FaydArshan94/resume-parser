import axios from "axios";

const API_BASE = "https://resume-parser-zljs.onrender.com/api";

export async function parseResume(file) {
  const formData = new FormData();
  formData.append("resume", file);

  const res = await axios.post(`${API_BASE}/resume`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.data;
}

export async function getResumeById(id) {
  const res = await axios.get(`${API_BASE}/resume/${id}`);
  return res.data.data;
}

export async function getAllResumes(page = 1, limit = 10) {
  const res = await axios.get(`${API_BASE}/resume`, {
    params: { page, limit },
  });

  return res.data;
}
