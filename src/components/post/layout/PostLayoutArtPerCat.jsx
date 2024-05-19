import Link from "next/link";
import { slugify } from "../../../utils";
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios

const defaultAvatarSrc = "/images/category/BgWhite.png"; // Default avatar source

const PostLayoutArtPerCat = ({ postSizeMd, postBgDark }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/LatestArticlePerCat"); // Make request to API route
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to limit the number of words in a string
  const limitWords = (text, limit) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        {data.map((article, index) => (
          <div key={index} className={`media post-block m-b-xs-30 ${postSizeMd === true ? "post-block__mid" : ""} ${postBgDark === true ? "post-block__on-dark-bg" : ""}`}>
            <Link href={`/post/${article.slug}`}>
              <a className="align-self-center">
                {article.avatar ? (
                  <img
                    src={article.avatar} // Sử dụng đường dẫn ảnh từ dữ liệu article
                    alt={article.title}
                    width={postSizeMd === true ? 230 : 150}
                    height={postSizeMd === true ? 210 : 150}
                  />
                ) : (
                  <img
                    style={{ border: '1px solid black' }}
                    src={defaultAvatarSrc}
                    alt="Default Avatar"
                    width={postSizeMd === true ? 230 : 150}
                    height={postSizeMd === true ? 210 : 150}
                  />
                )}
              </a>
            </Link>
            <div className="media-body">
              <div className="post-cat-group m-b-xs-10">
                <Link href={`/category/${slugify(article.category.name)}`}>
                  <a className={`post-cat cat-btn ${article.cate_bg ?? "bg-color-blue-one"}`}>{article.category.name}</a>
                </Link>
              </div>
              <h3 className="axil-post-title hover-line hover-line">
                <Link href={`/post/${article.slug}`}>
                  <a>{article.title}</a>
                </Link>
              </h3>
              {postSizeMd === true ?
                <p className="mid">{limitWords(article.abstracts, 20)}</p>
                : ""
              }
              <div className="post-metas">
                <ul className="list-inline">
                {article.author_name !== undefined && article.author_name !== "" && (
											<li>
												<span>By</span>
												<Link href={`/author/${slugify(article.author_name)}`}>
													<a className="post-author">{article.author_name}</a>
												</Link>
											</li>
										)}
                  <li>
                    <span>Ngày xuất bản: </span>
                    <span>{new Date(article.create_date).toLocaleDateString()}</span>
                  </li>
                  <li>
                    <i className="feather icon-activity" />
                    {article.reading_time}
                  </li>
                  <li>
                    <i className="feather icon-share-2" />
                    {article.post_share}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostLayoutArtPerCat;