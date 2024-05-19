import AdBanner from "../common/AdBanner";
import SectionTitle from "../elements/SectionTitle";
import WidgetAd from "../widget/WidgetAd";
import WidgetCategory from "../widget/WidgetCategory";
import WidgetInstagram from "../widget/WidgetInstagram";
import WidgetNewsletter from "../widget/WidgetNewsletter";
import WidgetPost from "../widget/WidgetPost";
import WidgetSocialShare from "../widget/WidgetSocialShare";
import PostLayoutArtPerCat from "./layout/PostLayoutArtPerCat";
import PostLayoutTwo from "./layout/PostLayoutTwo";

const PostSectionFive = ({postData, adBanner, pClass}) => {
    return ( 
        <div className={`random-posts ${pClass ?? "section-gap"}`}>
            <div className="container">
            <SectionTitle title="Newest Story Per Cat" pClass="title-black m-b-xs-40"/>
                <div className="row">
                    <div className="col-lg-8">
                        
                        <div className="axil-content">
                                <PostLayoutArtPerCat  postSizeMd={true} />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="post-sidebar">
                            <WidgetAd />
                            <WidgetNewsletter />
                            <WidgetCategory cateData={postData} />
                            <WidgetSocialShare />
                            <WidgetPost dataPost={postData} />
                            <WidgetInstagram />
                            {adBanner === true ? <AdBanner /> : "" }
                        </div>
                    </div>
                </div>
            </div>
        </div>

     );
}
 
export default PostSectionFive;