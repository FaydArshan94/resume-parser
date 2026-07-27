<div align="center">
  <h1>📄 AI Resume Parser</h1>

  <p>
    <a href="https://nextjs.org/">
      <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white" alt="Next.js" />
    </a>
    <a href="https://nodejs.org/">
      <img src="https://img.shields.io/badge/Node.js-Backend-green?logo=node.js&logoColor=white" alt="Node.js" />
    </a>
    <a href="https://expressjs.org/">
      <img src="https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white" alt="express.js" />
    </a>
    <a href="https://www.mongodb.com/">
      <img src="https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
    </a>
  </p>

  <blockquote>
    <p>An AI-powered, full-stack application that extracts structured information from PDF and DOCX resumes using <strong>Google Gemini 2.5 Flash</strong>, validates the output, stores parsed data in <strong>MongoDB</strong>, and provides a sleek modern dashboard to browse candidates.</p>
  </blockquote>

  <p>
    <strong><a href="https://resume-parser-roan.vercel.app">Frontend Live Demo</a></strong> • 
    <strong><a href="https://resume-parser-zljs.onrender.com">Backend API</a></strong>
  </p>
</div>

<hr />

<h2>✨ Features</h2>

<h3>📤 Resume Upload</h3>
<ul>
  <li>Drag & Drop interface for seamless user experience</li>
  <li>Supports PDF and DOCX formats</li>
  <li>Strict file type and size validation</li>
  <li>Automatic unsupported file type detection</li>
</ul>

<h3>🧠 AI-Powered Parsing (Google Gemini)</h3>
<ul>
  <li>Extracts rich structured data: Personal Info, Professional Summary, Current Designation, Target Role, Industry, Skills, Experience, Education, Projects, Certifications, Achievements, Languages, and Social Links.</li>
</ul>

<h3>🛡️ Smart Validation</h3>
<ul>
  <li>Detects non-resume documents and rejects empty files or those with insufficient text</li>
  <li>Enforces structured JSON validation using <strong>Zod</strong></li>
  <li>Normalizes resume data before validation</li>
</ul>

<h3>🗄️ Candidate Database</h3>
<ul>
  <li>Stores parsed resumes to avoid repeated AI requests</li>
  <li>Intuitive detail pages for individual resumes</li>
  <li>Supports single and bulk deletion</li>
  <li>Implements pagination and "Load More" functionality</li>
</ul>

<h3>🎨 Modern UI/UX</h3>
<ul>
  <li>Sleek dark mode interface</li>
  <li><strong>Framer Motion</strong> animations and <strong>Lenis</strong> smooth scrolling</li>
  <li>Fully responsive design with intelligent loading, empty, and error states (including custom 404 & global error pages)</li>
</ul>

<hr />

<h2>🛠️ Tech Stack</h2>

<table>
  <thead>
    <tr>
      <th>Environment</th>
      <th>Technologies</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Frontend</strong></td>
      <td>Next.js 16, React 19, Tailwind CSS v4, Framer Motion, Axios, Lucide Icons, Lenis</td>
    </tr>
    <tr>
      <td><strong>Backend</strong></td>
      <td>Node.js, Express.js, MongoDB, Mongoose, Multer, Mammoth, PDF Parse, Google Gemini API, Zod</td>
    </tr>
  </tbody>
</table>

<hr />

<h2>🚀 API Endpoints</h2>

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>POST</code></td>
      <td><code>/api/resume</code></td>
      <td>Upload and parse a PDF or DOCX resume.</td>
    </tr>
    <tr>
      <td><code>GET</code></td>
      <td><code>/api/resume</code></td>
      <td>Fetch paginated resumes (e.g., <code>?page=1&limit=10</code>).</td>
    </tr>
    <tr>
      <td><code>GET</code></td>
      <td><code>/api/resume/:id</code></td>
      <td>Retrieve a single parsed resume by ID.</td>
    </tr>
    <tr>
      <td><code>DELETE</code></td>
      <td><code>/api/resume/:id</code></td>
      <td>Delete a specific resume.</td>
    </tr>
    <tr>
      <td><code>DELETE</code></td>
      <td><code>/api/resume</code></td>
      <td>Delete all stored resumes.</td>
    </tr>
  </tbody>
</table>

<hr />

<h2>⚙️ Installation & Setup</h2>

<h3>1. Clone the repository</h3>
<pre><code>git clone https://github.com/your-username/resume-parser.git</code></pre>

<h3>2. Setup Backend</h3>
<pre><code>cd server
npm install
npm run dev</code></pre>

<h3>3. Setup Frontend</h3>
<pre><code>cd client
npm install
npm run dev</code></pre>

<h3>Environment Variables</h3>
<p>Create a <code>.env</code> file in the <strong>server</strong> directory:</p>
<pre><code>PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key</code></pre>

<p>Create a <code>.env.local</code> file in the <strong>client</strong> directory:</p>
<pre><code>NEXT_PUBLIC_API_URL=http://localhost:5000/api</code></pre>

<hr />

<h2>📂 Project Structure</h2>

<table>
  <thead>
    <tr>
      <th>Client (<code>/client</code>)</th>
      <th>Server (<code>/server</code>)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>app/</code> (Next.js App Router)</td>
      <td><code>config/</code> (Environment & DB setup)</td>
    </tr>
    <tr>
      <td><code>components/</code> (UI, Results, Lenis)</td>
      <td><code>controllers/</code> (Route logic)</td>
    </tr>
    <tr>
      <td><code>lib/</code> (Utilities)</td>
      <td><code>models/</code> (Mongoose Schemas)</td>
    </tr>
    <tr>
      <td><code>public/</code> (Static Assets)</td>
      <td><code>routes/</code>, <code>services/</code>, <code>middlewares/</code></td>
    </tr>
  </tbody>
</table>

<hr />

<h2>🔒 Security & Performance</h2>

<h3>Security Measures:</h3>
<ul>
  <li>Helmet, CORS, Rate Limiting, and HPP Protection</li>
  <li>Input and File Validation (preventing malicious uploads)</li>
  <li>Global Error Handling</li>
</ul>

<h3>Backend Optimizations:</h3>
<ul>
  <li>Lean Queries & Field Selection for fast database reads</li>
  <li>Async Processing & Schema Validation</li>
  <li>Resume Normalization</li>
</ul>

<h3>Frontend Optimizations:</h3>
<ul>
  <li>Lazy Loading & Route-based detail pages</li>
  <li>Load More Pagination (eliminates heavy initial loads)</li>
  <li>Optimized Animations & Smooth Scrolling</li>
</ul>

<hr />

<h2>🚦 Error Handling</h2>
<p>The application gracefully handles a variety of edge cases:</p>
<ul>
  <li>Invalid Resumes, Empty Files, or Unsupported Formats</li>
  <li>Insufficient Text Content</li>
  <li>Gemini API Quota Exceeded (HTTP 429)</li>
  <li>Resumes Not Found & Server/Routing Errors</li>
</ul>

<hr />

<h2>🏗️ Design Decisions & Limitations</h2>

<h3>Design Decisions:</h3>
<ul>
  <li><strong>Google Gemini:</strong> Chosen over regex-based extraction for highly flexible, context-aware parsing.</li>
  <li><strong>Zod Validation:</strong> Ensures every AI response strictly adheres to the expected schema before saving.</li>
  <li><strong>MongoDB Storage:</strong> Acts as a caching layer to store parsed resumes, minimizing expensive AI API calls.</li>
</ul>

<h3>Current Limitations:</h3>
<ul>
  <li>Embedded hyperlinks inside PDFs/DOCX are lost because raw text extraction discards metadata.</li>
  <li>Scanned or image-based PDFs are not supported (no OCR implementation).</li>
  <li>AI parsing quality heavily relies on the textual clarity and formatting of the uploaded resume.</li>
</ul>

<hr />

<h2>🔮 Future Improvements</h2>
<ul>
  <li><input type="checkbox" disabled /> Authentication system</li>
  <li><input type="checkbox" disabled /> Resume Comparison & ATS Scoring</li>
  <li><input type="checkbox" disabled /> Skill Matching & Bulk Upload support</li>
  <li><input type="checkbox" disabled /> Embedded Hyperlink Extraction</li>
  <li><input type="checkbox" disabled /> OCR Support for scanned PDFs</li>
</ul>

<hr />

<h2>👤 Author & License</h2>
<p>
  <strong>Fayd Arshan</strong><br />
  GitHub: <a href="https://github.com/FaydArshan94">FaydArshan94</a>
</p>
