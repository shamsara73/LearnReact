import ReactDOM from "react-dom/client";
import {HashRouter , BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Product from "./pages/Product";

// export default function App() {
//   return (
//     <Router basename='/LearnReact' >
//       <Routes>
//         <Route path="" element={<Layout />}>
//           <Route index element={<Home />} />
//           <Route path="/LearnReact/product" element={<Product />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

export default function App(){
  return (
    <HashRouter basename='/' >
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/product" element={<Product />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);