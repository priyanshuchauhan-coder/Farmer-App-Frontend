

// import { BrowserRouter as Router } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import { AlertProvider } from './context/AlertContext';
// import Footer from "./components/Footer"
// import Navbar from "./components/Navbar"
// import Alert from "./components/Alert";
// import AppRoutes from './AppRoutes';
// import './App.css'

// function App() {
//   return (
//     <Router>
//       <AlertProvider>
//         <AuthProvider>
//         <div className="FarmEzy">
//         <Alert message="this is amazing react"/>
//           <Navbar/>
//           <AppRoutes />
//           <Footer/>
//           </div>
//         </AuthProvider>
//       </AlertProvider>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import AppRoutes from './AppRoutes';
import './App.css';

function App() {
  return (
    <Router>
      <AlertProvider>
        <AuthProvider>
          <div className="FarmEzy d-flex flex-column min-vh-100">
            <Alert />
            <Navbar />
            <main className="flex-grow-1">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </AlertProvider>
    </Router>
  );
}

export default App;
