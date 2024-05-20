import Link from "next/link";
import { slugify } from "../../../utils";
import React, { useEffect, useState } from "react";
import axios from "axios";

const defaultAvatarSrc = "/images/category/BgWhite.png"; // Default avatar source

const PostLayoutThree = ({ postSizeLg, pClass, videoPost }) => {
	const [fetchedData, setFetchedData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("/api/Top3Star");
				setFetchedData(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<>
			{fetchedData.slice(0, 1).map((data, index) => (
				<div key={index} className={`axil-img-container ${pClass ?? "m-b-xs-30"}`}>
					<Link href={`/${data.id}`}>
						<a className={`d-block ${videoPost === true ? "h-100" : ""}`}>
							{data.avatar ? (
								<img
									src={data.avatar} // Sử dụng đường dẫn ảnh từ dữ liệu data
									alt={data.title}
									width={postSizeLg ? 730 : 350}
									height={postSizeLg ? 550 : 260}
								/>
							) : (
								<img
									style={{ border: '1px solid black' }}
									src={defaultAvatarSrc}
									alt={data.title}
									width={postSizeLg ? 730 : 350}
									height={postSizeLg ? 550 : 260}
								/>
							)}

							<div className={`grad-overlay ${videoPost === true ? "grad-overlay__transparent" : ""}`} />
						</a>
					</Link>
					<div className="media post-block position-absolute">
						<div className={`media-body ${postSizeLg === true ? "media-body__big" : ""}`}>
							<div className="post-cat-group m-b-xs-10">
								<Link href={`/category/${slugify(data.category.name)}`}>
									<a className={`post-cat cat-btn ${data.category.second_name ?? "bg-color-blue-one"}`}>{data.category.name}</a>
								</Link>
							</div>
							<div className="axil-media-bottom">
								<h3 className="axil-post-title hover-line hover-line">
								<Link href={`/${data.id}`}>
										<a>{data.title}</a>
									</Link>
								</h3>
								<div className="post-metas">
									<ul className="list-inline">
										{data.author_name !== undefined && data.author_name !== "" && (
											<li>
												<span>By</span>
												<Link href={`/author/${slugify(data.author_name)}`}>
													<a className="post-author">{data.author_name}</a>
												</Link>
											</li>
										)}


										{postSizeLg === true && (
											<>
												<li>
													<span>Ngày xuất bản: </span>
													<span>{new Date(data.create_date).toLocaleDateString()}</span>
												</li>
												<li>
													<i className="feather icon-activity" />
													{data.reading_time}
												</li>
												<li>
													<i className="feather icon-share-2" />
													{data.post_share}
												</li>
											</>
										)}
									</ul>
								</div>
							</div>
						</div>
					</div>
					{/* End of .post-block */}
				</div>
			))}
		</>
	);
};

export default PostLayoutThree;
