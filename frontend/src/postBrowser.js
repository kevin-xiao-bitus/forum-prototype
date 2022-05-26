import { useEffect, useReducer, useRef, useState } from "react";
import Post from "./components/post";
import "./postBrowser.scss";
import CreatePostOverlay from "./components/createOverlay";

const url = "http://localhost:3001";

function PostBrowser() {
    const plusIconRef = useRef();
    var plusIcon = plusIconRef.current;
    const [posts, setPosts] = useState([]);
    const [showOverlay, dispatchShowOverlay] = useReducer((showOverlay) => {
        if (!showOverlay) {
            plusIcon.classList.add("plus-to-x");
            plusIcon.classList.remove("x-to-plus");
            plusIcon.style.transform = "rotate(45deg)";
        } else {
            plusIcon.classList.remove("plus-to-x");
            plusIcon.classList.add("x-to-plus");
            plusIcon.style.transform = "rotate(0deg)";
        }
        return !showOverlay
    }, false);
    useEffect(() => {
        async function fetchData() {
            fetch(url + "/getPosts", {
                method: "GET",
                mode: "cors",
            }).then((response) => {
                return response.json();
            }).then((data) => {
                setPosts(data.Posts);
            }).catch(err => {
                console.log(err);
            });
        }
        fetchData();

    }, []);

    return (
        <>
            <div className="browser-page">
                <div className="browser-topbar">
                    <div className="search-container">
                        <input type="text" className="post-search-bar"></input>
                        <button className="search-button">
                            <svg viewBox="0 0 24 24" className="button-icon"><g><path d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"></path></g></svg>
                        </button>
                    </div>
                    <button className="create-post-button" onClick={() => dispatchShowOverlay()}>
                        <svg viewBox="0 0 459.325 459.325" className="button-icon" id="plus-icon" ref={plusIconRef}><g><path d="M459.319,229.668c0,22.201-17.992,40.193-40.205,40.193H269.85v149.271c0,22.207-17.998,40.199-40.196,40.193   c-11.101,0-21.149-4.492-28.416-11.763c-7.276-7.281-11.774-17.324-11.769-28.419l-0.006-149.288H40.181   c-11.094,0-21.134-4.492-28.416-11.774c-7.264-7.264-11.759-17.312-11.759-28.413C0,207.471,17.992,189.475,40.202,189.475h149.267   V40.202C189.469,17.998,207.471,0,229.671,0c22.192,0.006,40.178,17.986,40.19,40.187v149.288h149.282   C441.339,189.487,459.308,207.471,459.319,229.668z"/></g></svg>
                    </button>
                </div>
                <div className="posts-container">
                    {posts.map((post, i) => {
                        return <Post key={i} post={post}/>
                    })}
                </div>
            </div>
            {
                showOverlay && (
                    <CreatePostOverlay url={url}/>
                )
            }
        </>
    );
}

export default PostBrowser;