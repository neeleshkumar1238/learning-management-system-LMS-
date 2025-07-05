import { Outlet } from "react-router-dom";


function StudentViewCommanLayout(){
    return(
        <div>
            Comman content
            <Outlet/>
        </div>
    )
}

export default StudentViewCommanLayout