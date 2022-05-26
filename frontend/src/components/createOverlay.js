import { useRef } from "react";
import "./createOverlay.scss";

function CreatePostOverlay( { url} ) {
    const title = useRef();
    const content = useRef();
    const titleErrors = useRef();
    const contentErrors = useRef();

    function uploadPost() {
        if (checkErrors()) {
            const date = new Date();
            const data = {
                title: title.current.value,
                time: date.getTime(),
                poster: "anon",
                content: content.current.value
            }
            fetch(url + "/uploadPost", {
                method: "POST",
                mode: "cors",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            }).catch(err => {
                if (err) console.log(err);
            })
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
    }

export default CreatePostOverlay;