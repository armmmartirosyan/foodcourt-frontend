import React from 'react';
import Wrapper from "../components/Wrapper";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Branches from "../components/Branches";
import Offers from "../components/Offers";
import {useSelector} from "react-redux";

function Home() {
    const slidesStatus = useSelector(state => state.status.slidesGetListStatus);
    const categoriesStatus = useSelector(state => state.status.categoriesGetListStatus);
    const branchesStatus = useSelector(state => state.status.branchesGetListStatus);
    const offersStatus = useSelector(state => state.status.offersGetListStatus);

    return (
        <Wrapper
            statuses={{slidesStatus, categoriesStatus, branchesStatus, offersStatus}}
            pageName='главная'
        >
            <Banner/>
            <Offers/>
            <Categories/>
            <Branches/>
        </Wrapper>
    );
}

export default Home;
