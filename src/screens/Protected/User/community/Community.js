import React, {useEffect, useState} from "react";
import styles from "./Community.module.scss";
import {createBoard, deleteBoard, readAllBoards, readMyBoards} from "../../../../api/board.js";
import AddModal from "../../../../components/buttons/modal/addModal/AddModal.js";
import Form from "../../../../components/data/forms/Form.js";
import TextInput from "../../../../components/data/inputs/text/TextInput.js";
import DeleteModal from "../../../../components/buttons/modal/deleteModal/DeleteModal.js";
import auth from "../../../../stores/auth.js";
import {hasPermission} from "../../../../utils/authorizationChecker.js";

function Community() {
    const [myPosts, setMyPosts] = useState([]);
    const [communityPosts, setCommunityPosts] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        const getMyPosts = async () => {
            const response = await readMyBoards();
            setMyPosts(response.data);
        };
        getMyPosts();
    }, []);

    useEffect(() => {
        const getCommunityPosts = async () => {
            const response = await readAllBoards();
            const filtered = response.data.filter(
                (post) => !myPosts.some(myPost => myPost.id === post.id)
            );
            setCommunityPosts(filtered);
        };

        getCommunityPosts();
    }, [myPosts]);

    return (
        <div className={styles.layout}>
            <h1 className={styles.title}>Community</h1>
            <div className={styles.data}>
                <div className={styles.section}>
                    <h2 className={styles.subtitle}>My posts</h2>
                    <div className={styles.posts}>
                        {myPosts.length > 0 && myPosts.map((post) => (
                            <div className={styles.post} key={post.id}>
                                <p>{post.title}</p>
                                <p>{post.description}</p>
                                <DeleteModal>
                                    <Form
                                        title={"Delete " + post.title}
                                        redirectTo={window.location.pathname}
                                        submitMethod={async () => deleteBoard(post.id)}
                                        buttonText={"Delete post"}
                                        />
                                </DeleteModal>
                            </div>
                        ))}
                        {myPosts.length === 0 &&
                            <p>You've posted nothing.</p>
                        }
                    </div>
                    <AddModal text={"add post"}>
                        <Form
                            title={"Add post"}
                            buttonText={"add post"}
                            submitMethod={async () => createBoard(title, description)}
                            redirectTo={window.location.pathname}
                        >
                            <TextInput placeholder={"Title"} onChange={(e) => setTitle(e.target.value)} value={title} />
                            <TextInput maxLength={200} placeholder={"Description"} onChange={(e) => setDescription(e.target.value)} value={description} />
                        </Form>
                    </AddModal>
                </div>
                <div className={styles.section}>
                    <h2 className={styles.subtitle}>Community posts</h2>
                    <div className={styles.posts}>
                        {communityPosts.length > 0 && communityPosts.map((post) => (
                            <div className={styles.post} key={post.id}>
                                <p>{post.title}</p>
                                <p>{post.description}</p>
                                {hasPermission("admin") &&
                                    <DeleteModal>
                                        <Form
                                            title={"Delete " + post.title}
                                            redirectTo={window.location.pathname}
                                            submitMethod={async () => deleteBoard(post.id)}
                                            buttonText={"Delete post"}
                                        />
                                    </DeleteModal>
                                }
                            </div>
                        ))}
                        {communityPosts.length ===0 &&
                            <p>Community has posted nothing.</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Community;