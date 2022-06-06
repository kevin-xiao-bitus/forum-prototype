import "./account.scss";
import { useReducer, useState } from "react";


let user = null;

function AccountButton() {
    const [showDropDown, setShowDropDown] = useState(false);
    const [isSignedIn, setSignedIn] = useReducer()
    function toggleDropDown() {
        setShowDropDown(showDropDown => !showDropDown);
    }

    return (
        <>
            <div className="dropdown-trigger">
                <button className="account-button top-bar-button" onClick={toggleDropDown}></button>
                {(showDropDown) ? <div className="dropdown-container">
                    {(isSignedIn) ? 
                        <>
                        
                        </> : 
                        <>
                            <div className="dropdown-element">Sign in</div>
                            <div className="dropdown-element">Register</div>
                        </> }
                </div> : <></>}
            </div>
        </>
    )
}

export default AccountButton;