import { useParams } from "react-router-dom";

function PostViewer (props) {
    const {postId} = useParams();
    return (
        <div className="post-view-page">
            <div>{postId}</div>
        </div>
    );
}

export default PostViewer;