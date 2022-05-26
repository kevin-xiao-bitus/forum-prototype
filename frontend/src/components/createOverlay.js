import { useRef } from "react";
import "./createOverlay.scss";

function CreatePostOverlay( {show, url} ) {
    const title = useRef();
    const content = useRef();
    const titleErrors = useRef();
    const contentErrors = useRef();

    function uploadPost() {
        if (checkErrors()) {
            const date = new Date();
            console.log(date);
            console.log(date.getTime());
            console.log(new Date(date.getTime()));
            const data = {
                title: title.current.value,
                date: {
                    month: 11,
                    day: 15,
                    year: 2020
                },
                poster: "admin",
                content: "dolor sit amet"
            }
            // fetch(url + "/uploadPost", {
            //     mode: "POST",
            //     method: "cors",
            //     headers: {"Content-Type": "application/json"},
            //     body: JSON.stringify(data)
            // })
        }
    }

    function checkErrors() {
        let valid = true;
        let t = title.current;
        let c = content.current;
        let te = titleErrors.current;
        let ce = contentErrors.current;
        if (t.value === "") {
            te.innerHTML = "Title cannot be empty";
            valid = false;
        }
        else te.innerHTML = "";
        if (c.value === "") {
            ce.innerHTML = "Post cannot be empty";
            valid = false;
        }
        else ce.innerHTML = "";
        return valid;
    }

    if (show) {
        return(
            <div className="overlay">
                <div className="create-post-container">
                    <div className="create-post-text-containers">
                        <input ref={title} type="text" className="post-title-input" placeholder="Title"></input>
                        <p ref={titleErrors} className="create-post-helper-text"></p>
                    </div>
                    <div className="create-post-text-containers post-content-container">
                        <textarea ref={content} placeholder="Content" className="post-content-input"></textarea>
                        <p ref={contentErrors} className="create-post-helper-text"></p>
                    </div>
                    <div className="submit-post-button-container">
                        <button className="post-button" onClick={uploadPost}>Post</button>
                    </div>
                </div>
            </div>
        );
    } else {
        return;
    }
}

export default CreatePostOverlay;