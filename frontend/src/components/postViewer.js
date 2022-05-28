import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        <>
            <div className="navbar">
            </div>
            {
                (post) ? (
                <div className="post-view-page">
                    <div>{post.content}</div>
                </div>
                ) : (<div>not found</div>)
            }
        </>
    );
}

export default PostViewer;