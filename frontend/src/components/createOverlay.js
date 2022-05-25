

function CreatePostOverlay( {show} ) {
    if (show) {
        console.log("overlay shown")
        return(
            <div className="overlay">
                bruh
            </div>
        );
    } else {
        console.log("overlay hidden");
        return;
    }
}

export default CreatePostOverlay;