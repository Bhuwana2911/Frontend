import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from './Login'
import Logout from './Logout'
import Admin from './Admin'
import Manager from './Manager'
import Employee from './Employee'
import HomePage from './HomePage';
import AddEmployee from './AddEmployee';
import AddManager from './AddManager';
import DisplayAllEmployees from './DisplayAllEmployees';
import ParticularEmployee from './ParticularEmployee';
import UnderManager from './UnderManager';
import UpdateEmployeeDetails from './UpdateEmployeeDetails'
import LeaveRequest from './LeaveRequest';
import TaskAssigning from './TaskAssigning';
import CheckTasks from './CheckTasks';
import EmployeeLeaves from './EmployeeLeaves';
import AllLeavesUnderManager from './AllLeavesUnderManager';
import AllTasksOfEmployee from './AllTasksOfEmployee';
import DisplayAllManagers from './DisplayAllManagers';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path = "/" element = {<HomePage></HomePage>} />
        <Route exact path = "/admin" element = {<Admin />} />
        <Route exact path = "/manager" element = {<Manager />} />
        <Route exact path = "/employee" element = {<Employee />} />
        <Route exact path = "/addEmployeeByAdmin" element = {< AddEmployee/>} />
        <Route exact path = "/addManagerByAdmin" element = {< AddManager />} />
        <Route exact path = "/viewEmployees/" element = {<DisplayAllEmployees />} />
        <Route exact path = "/particularEmployee" element = {<ParticularEmployee />} />
        <Route exact path = "/assignedEmployessOfManager" element = {<UnderManager />} />
        <Route exact path = "/updateDetails/:employeeMail" element = {<UpdateEmployeeDetails />} />
        <Route exact path = "/leaverequest" element = {<LeaveRequest />} />
        <Route exact path = "/assigntask" element = {<TaskAssigning />} />
        <Route exact path = "/checktasks" element = {<CheckTasks />} />
        <Route exact path = "/allemployeeleaves" element = {<EmployeeLeaves/>} />
        <Route exact path = "/leavesundermanager" element = {<AllLeavesUnderManager/>} />
        <Route exact path = "/allemployeetasks/:employeeMail" element = {<AllTasksOfEmployee/>} />
        <Route exact path = "/viewManagers" element = {<DisplayAllManagers />} />
        </Routes>
      </Router>
      



      
    </div>
  );
}

export default App;
