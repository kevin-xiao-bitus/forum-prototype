import { useDebugValue, useEffect, useRef } from "react";
import { useState } from "react";
import "./post.scss";
import { Link } from "react-router-dom";

function Post ({post}) {
    const [pbState, setPBState] = useState("hidden");
    const [overflowing, setOverflowing] = useState(false);
    const postButton = useRef();
    const content = useRef();
    const contentContainer = useRef();
    function showButton() {
        if (pbState === "hidden") {
            showButtonAnimate(postButton);
            setPBState("shown");
        }
    }

    function hideButton() {
        if (pbState === "shown") {
            setPBState("hidden");
            hideButtonAnimate(postButton);
        }
    }

    useEffect(() => {
        if (content.current.offsetHeight > contentContainer.current.clientHeight) {
            setOverflowing(true);
        }
    });

    return (
        <div className="post-container" onClick={showButton} onMouseLeave={hideButton}>
            <div className="post-topbar">
                <p className="post-title">{post.title}</p>
                <p className="post-date">{dateToString(post.time)}</p>
            </div>
            <div className="post-content-container" ref={contentContainer}>
                <pre>
                    <p className="post-content content-box" ref={content}>{post.content}</p>
                </pre>
                {(overflowing) ? (<div className="overflow-fade"></div>) : <></>}
            </div>
                <Link to={"/view/" + post.id}>
                    <button className="load-post-button" ref={postButton} tabIndex={-1}>
                        <svg viewBox="0 0 48 48" className="button-icon right-arrow"><g><path d="M12.314,47.255c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l21.92-21.92l-21.92-21.92   c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0L35.648,22.92c0.391,0.391,0.391,1.023,0,1.414L13.021,46.962   C12.825,47.157,12.57,47.255,12.314,47.255z"/></g></svg>
                    </button>  
                </Link>
            <div className="button-trigger" onMouseEnter={showButton}></div>
        </div>
    )
}

function showButtonAnimate (ref) {
    ref.current.classList.add("pb-slidein");
    ref.current.classList.remove("pb-slideout");
}

function hideButtonAnimate (ref) {
    ref.current.classList.add("pb-slideout");
    ref.current.classList.remove("pb-slidein");
}

function dateToString (time) {
    const today = new Date(time);
    return (today.getMonth()) + 1 + "/" + today.getDate() + "/" + today.getFullYear();
}

export default Post;