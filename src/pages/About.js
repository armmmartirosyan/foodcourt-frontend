import React from 'react';
import {useSelector} from "react-redux";
import Wrapper from "../components/Wrapper";
import Branches from "../components/Branches";
import Blockquote from "../components/Blockquote";
import AboutText from "../components/About";

function About() {
    const branchesStatus = useSelector(state => state.status.branchesGetListStatus);
    const commentsStatus = useSelector(state => state.status.commentGetAllStatus);
    const commentAddStatus = useSelector(state => state.status.commentAddStatus);
    const aboutStatus = useSelector(state => state.status.aboutGetStatus);

    return (
        <Wrapper
            statuses={{branchesStatus, aboutStatus, commentsStatus, commentAddStatus}}
            pageName='о нас'
        >
            <AboutText/>
            <Blockquote/>
            <Branches/>
        </Wrapper>
    );
}

export default About;
