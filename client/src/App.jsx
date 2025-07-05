import { Button } from "./components/ui/button"
import './App.css'
import { Routes,Route } from "react-router-dom"
import AuthPage from "./pages/auth"
import RouteGuard from "./components/route-guard"
import InstructorDashboardPage from "./pages/instructor"
import StudentHomePage from "./pages/student/home"
import { useContext } from "react"
import { AuthContext } from "./context/auth-context"
import StudentViewCommanLayout from "./components/student-view/comman-layout"




function App() {

  const {auth}=useContext(AuthContext)

  return (
    <Routes>
      <Route path="/auth" 
        element={
          <RouteGuard
            element={<AuthPage/>}
            authenticated={auth?.authenticate}
            user={auth?.user}
          /> 
        }
      />

      <Route path="/instructor"
        element={
          <RouteGuard
            element={<InstructorDashboardPage/>}
            authenticated={auth?.authenticate}
            user={auth?.user}
          /> 
        }
      />
      
      <Route path="/"
        element={
          <RouteGuard
            element={<StudentViewCommanLayout/>}
            authenticated={auth?.authenticate}
            user={auth?.user}
          /> 
        }
      >
        <Route path="" element={<StudentHomePage />}/>
        <Route path="home" element={<StudentHomePage />}/>
      </Route>
    </Routes>
  )
}

export default App
