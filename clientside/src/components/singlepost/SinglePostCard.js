import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { Header } from "../Header";
import { Footer } from "../Footer";
import "./singlePost.css";

const SinglePostCard = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  const [post, setPost] = useState({});

  useEffect(() => {
    async function getPost() {
      const res = await axios.get(
        "http://127.0.0.1:8000/posts/singlepost/" + path
      );
      console.log("res", res.data);
      setPost(res.data);
    }
    getPost();
  }, [path]);
  return (
    <div className="singlePost">
      <Header />
      <div className="singlePostWrapper">
        <h1 className="singlePostTitle">{post.title}</h1>
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <b>{post.username}</b>
          </span>
        </div>
        <p className="singlePostDesc">{post.description}</p>
      </div>
      <Footer />
    </div>
  );
  // cause_details_area start
  //   <>
  //     <Header />
  //     <Grid sx={{ border: "2px solid" }}>
  //       <Grid spacing={2} sx={{ border: "2px solid" }}>
  //         <Grid xs={8}>
  //           {post.title && (
  //             <Typography
  //               gutterBottom
  //               variant="subtitle2"
  //               sx={{ color: "text.secondary" }}
  //             >
  //               {post.title}
  //             </Typography>
  //           )}
  //           <p>{post.description}</p>
  //           <div className="feature_progress_wrapper mb-25 mt-35">
  //             <div className="progress feature_progress">
  //               <div
  //                 className="progress-bar"
  //                 role="progressbar"
  //                 data-width="5%"
  //                 aria-valuenow="30"
  //                 aria-valuemin="0"
  //                 aria-valuemax="100"
  //                 style={{ width: "50%" }}
  //               ></div>
  //             </div>
  //           </div>
  //         </Grid>
  //         <div className="single_cause_meta">
  //           <div className="single_meta feature_meta feature_border d-inline-block">
  //             <span className="meta_text clr_theme1">
  //               <i className="fal fa-globe"></i> Goal
  //             </span>
  //             <span className="meta_price single_price clr_theme1">
  //               ${post.goal}
  //             </span>
  //           </div>
  //           <div className="single_meta feature_meta feature_border d-inline-block">
  //             <span className="meta_text clr_theme2">
  //               <i className="fal fa-users"></i> Raised
  //             </span>
  //             <span className="meta_price single_price clr_theme2">
  //               ${post.raised}
  //             </span>
  //           </div>
  //           <div className="single_meta feature_meta d-inline-block">
  //             <span className="meta_text clr_theme3">
  //               <i className="fal fa-reply"></i> To go
  //             </span>
  //             <span className="meta_price single_price clr_theme3">
  //               ${post.goal - post.raised}
  //             </span>
  //           </div>
  //         </div>
  //       </Grid>
  //       <Grid xs={6} md={4}>
  //         <h4>Hello</h4>
  //       </Grid>
  //     </Grid>
  //   </>
  //   // cause_details_area end
  // );
};

export default SinglePostCard;
