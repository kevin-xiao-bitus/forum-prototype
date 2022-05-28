import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./postViewer.scss";

const url = "http://localhost:3001";

function PostViewer (props) {
    const {postId} = useParams();
    const [post, setPost] = useState(null);
    useEffect(() => {
        const obj = {id: postId};
        fetch(url + "/getPostById", {
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(obj)
        })
        .then((res) => {
            return res.json();
        })
        .then((resjson) => {
            setPost(resjson);
        })
        .catch((err) => {
            if (err) {
                console.log(err);
            }
        })
    }, [])
    return (
        <div className="post-view-page">
            <div className="post-navbar">
                <Link to="/">
                    <button className="back-button">
                        <svg className="button-icon" viewBox="0 0 493.578 493.578"><g><path d="M487.267,225.981c0-17.365-13.999-31.518-31.518-31.518H194.501L305.35,83.615c12.24-12.24,12.24-32.207,0-44.676   L275.592,9.18c-12.24-12.24-32.207-12.24-44.676,0L15.568,224.527c-6.12,6.12-9.256,14.153-9.256,22.262   c0,8.032,3.136,16.142,9.256,22.262l215.348,215.348c12.24,12.239,32.207,12.239,44.676,0l29.758-29.759   c12.24-12.24,12.24-32.207,0-44.676L194.501,299.498h261.094c17.366,0,31.519-14.153,31.519-31.519L487.267,225.981z"/></g></svg>
                    </button>
                </Link>
            </div>
            {
                (post) ? (
                <div className="post-section">
                    <h1 className="post-title-section">{post.title}</h1>
                    <pre>
                        <div className="post-content-section content-box">{post.content}</div>
                    </pre>
                </div>
                ) : (<div>not found</div>)
            }
        </div>
    );
}

export default PostViewer;