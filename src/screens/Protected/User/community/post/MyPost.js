import React, {useEffect, useState} from "react";
import styles from "./CommunityPost.module.scss"
import {readBoardById, updateBoard} from "../../../../../api/board.js";
import {useNavigate, useParams} from "react-router-dom";
import Table from "../../../../../components/table/Table.js";
import ModifyModal from "../../../../../components/buttons/modal/modifyModal/ModifyModal.js";
import Form from "../../../../../components/data/forms/Form.js";
import * as emailjs from "emailjs-com";
import {readMe} from "../../../../../api/user/user.js";

function MyPost() {
    const navigate = useNavigate();
    const [me, setMe] = useState({});
    const {id} = useParams();
    const [post, setPost] = React.useState({});

    useEffect(  () => {
        const getPost = async () => {
            const response = await readBoardById(id);
            setPost(response.data);
        }
        const getMe = async () => {
            const response = await readMe(id);
            setMe(response.data);
        }
        getPost();
        getMe();
        if (me?.id !== post?.user_id){
            if (!post.is_available){
                navigate("/community");
            }
        }
    }, [])

    const buyData  = async (email) => {
        await updateBoard(id, {is_available: false});
        emailjs.send(
            'service_n6pklym',
            'template_a1o4ruj',
            {
                from_name: 'Uberclocked',
                name_tag: me.name_tag,
                user_name: email,
                reply_to: me.email,
            },
            '6uiIiVyJ8dqFrRGRd'
        ).then(result => {
            console.log('Correo enviado', result.text);
        }).catch(error => {
            console.error('Error al enviar', error);
        });
    }

    return (
        <div className={styles.layout}>
            <h1>{post.title}</h1>
            <Table headers={["user", "buy info"]} rows={post?.interested_users || []} renderRow={(user) =>
                <>
                    <p>{user.name_tag}</p>
                    <ModifyModal triggerText={"Buy info"}>
                        <Form
                            title={"Buy user data"}
                            buttonText={"Buy user data"}
                            redirectTo={"/community"}
                            submitMethod={()=> buyData(user.email)}
                        />
                    </ModifyModal>
                </>
            } />
        </div>
    )
}
export default MyPost;