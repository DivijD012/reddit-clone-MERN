// import React from 'react';
// import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Redirector from "./Pages/Redirector";
import Auth from "./Pages/Auth";
import Profile from "./Pages/Profile";
import NoPage from "./Pages/NoPage";
import React from "react";
import MyReddit from './Pages/MySubRedditPage';
import MySubRedditPage from './Pages/MySubRedditPageInd';
import MySubRedditPageUser from './Pages/MySubRedditPageUser';
import SubReddit from './Pages/SubReddit';
import MySubRedditPageJoin from './Pages/MySubRedditPageJoin';
import SubRedditPage from './Pages/SubRedditInd';
import SavedPosts from './Pages/SavedPosts';
import MySubRedditPageReport from './Pages/MySubRedditPageReport';

// export default function App() {
//   return (
//     <BrowserRouter>
//       <nav>
//         <Link to="/">Layout </Link>
//         <Link to="/blogs">Blogs</Link>
//       </nav>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Blogs />} />
//           <Route path="blogs" element={<Blogs />} />
//           {/* <Route path="contact" element={<Contact />} /> */}
//           <Route path="*" element={<NoPage />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Redirector />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mygreddiit" element={<MyReddit />} />
        <Route path="/mygreddiit/:id" element={<MySubRedditPage />} />
        <Route path="/mygreddiit/:id/users" element={<MySubRedditPageUser />} />
        <Route path="/mygreddiit/:id/joiningRequest" element={<MySubRedditPageJoin />} />
        <Route path="/mygreddiit/:id/reported" element={<MySubRedditPageReport />} />
        <Route path="/greddiit" element={<SubReddit />} />
        <Route path="/greddiit/:id" element={<SubRedditPage />} />
        <Route path="/saved" element={<SavedPosts />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
