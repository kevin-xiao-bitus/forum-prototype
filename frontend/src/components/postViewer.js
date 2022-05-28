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
                    <button className="back-button">Go back</button>
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