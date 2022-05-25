import "./createOverlay.scss";

function CreatePostOverlay( {show} ) {
    if (show) {
        return(
            <div className="overlay">
                <div className="create-post-container">
                    <input type="text" className="post-title-input" placeholder="Title"></input>
                    <textarea placeholder="Content" className="post-content-input"></textarea>
                    <div className="submit-post-button-container">
                        <button className="post-button">Post</button>
                    </div>
                </div>
            </div>
        );
    } else {
        return;
    }
}

export default CreatePostOverlay;