import ReactDOM from "react-dom/client";
import {HashRouter , BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import {HashRouter, Route, Switch, Link } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import React from 'react'

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

// export default function App(){
// 	return (
// 		<div className="App">
// 			<div>
// 				<nav>
// 					<ul id="navigation">
// 						<li>
// 							<Link to="/">Home</Link>
// 						</li>
// 						<li>
// 						<Link to="/product">Product</Link>
// 						</li>
// 					</ul>
// 				</nav>
// 			</div>
// 				<Switch>
// 				<Route path="/product">
// 					<Product />
// 				</Route>
// 			</Switch>
// 			</div>
// 				);
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<>
<React.StrictMode>
<App />
</React.StrictMode>
</>);
// root.render(<>
//  <React.StrictMode>
//     <HashRouter>
//       <App />
//     </HashRouter>
//   </React.StrictMode>
// </>);