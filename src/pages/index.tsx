import { FC, Fragment } from 'react';
import HomePageComponent from '@Components/Home';
import Header from '@Common/Header';
import Footer from '@Common/Footer';
import Meta from '@Common/Meta';
import { GetStaticProps } from 'next';
import { useAppSelector, wrapper } from '@Redux/store';
import { END } from 'redux-saga';
import { getSeoHome } from '@Redux/actionCreators/seoHomeActionCreators';

import 'swiper/swiper.min.css';
import { SeoHome } from 'src/models/seo-home';


// interface IIndexPage {
//     seoHome: SeoHome;
// }
// 123

const IndexPage: FC<any> = props => {
    const seoHome = useAppSelector(store => store.seoHomeReducer) as SeoHome;
    const { messageCrash } = useAppSelector(store => store.isLoadingReducer);

    return !messageCrash && <Fragment>
        <Meta seoHome={seoHome} />
        <Header />
        <HomePageComponent {...props} />
        <Footer />
    </Fragment>;

};

export default IndexPage;

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(store => async () => {
    store.dispatch(getSeoHome());
    store.dispatch(END);
    await store.sagaTask.toPromise();
    return { props: {} };
});
