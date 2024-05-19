import Image from "next/image";
import Link from "next/link";
import { slugify } from "../../../utils";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const defaultAvatarSrc = "/images/category/BgWhite.png"; // Default avatar source

const PostPer4Cat = ({ pClass, videoIcon, postSizeMd }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/latesPer4Cat");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.map(article => (
        <div key={article.id} className={`media post-block post-block__small ${pClass ?? "post-block__on-dark-bg m-b-xs-30"}`}>
          <Link href={`/post/${article.id}`}>
            <a className="align-self-center">
              {article.avatar ? (
                <img
                  src={article.avatar}
                  alt={article.title}
                  width={100}
                  height={100}
                />
              ) : (
                <img
                  style={{ border: '1px solid black' }}
                  src={defaultAvatarSrc}
                  alt="Default Avatar"
                  width={100}
                  height={100}
                />
              )}
              {videoIcon === true ? <span className="video-play-btn video-play-btn__small" /> : ""}
            </a>
          </Link>

          <div className="media-body">
            <div className="post-cat-group">
              <Link href={`/category/${slugify(article.category.name)}`}>
                <a className={`post-cat bg-color-blue-one`}>{article.category.name}</a>
              </Link>
            </div>
            <h3 className="axil-post-title hover-line hover-line">
              <Link href={`/post/${article.id}`}>
                <a>{article.title}</a>
              </Link>
            </h3>
            <div className="post-metas">
              <ul className="list-inline">
                {article.user && article.user.name && (
                  <li>
                    <span>By</span>
                    <Link href={`/author/${slugify(article.user.name)}`}>
                      <a className="post-author">{article.user.name}</a>
                    </Link>
                  </li>
                )}
                <li>
                  <span>Ngày xuất bản: </span>
                  <span>{new Date(article.create_date).toLocaleDateString()}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostPer4Cat;