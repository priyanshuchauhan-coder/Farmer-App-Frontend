import React from "react"
import { useContext } from "react"
import alertContext from "../context/alert/alertContext";




function Alert(){
  const context = useContext(alertContext);
  const { alert } = context;

    return(
        <div style={{height:'50px'}}>
   
  { alert &&    
            <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
  <strong>{alert.msg}</strong>
  
</div>}
        </div>

       
    )
}

export default Alert;