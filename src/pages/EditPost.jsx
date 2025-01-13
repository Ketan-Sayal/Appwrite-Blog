import { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from '../appwrite/conf';
import { useParams, useNavigate } from "react-router-dom";

export default function EditPost(){
    const [post, SetPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug)
            .then((post)=>{
                if(post){
                    SetPost(post);
                }
            })
        }else{
            navigate('/');
        }
    }, [slug, navigate])

    return post?(
        <div className="py-8">
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ):null
}