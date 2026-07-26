import axios from "axios";

const API_BASE = "http://localhost:5000/api";

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

export async function getAllResumes() {
  const res = await axios.get(`${API_BASE}/resume`);
  return res.data.data;
}