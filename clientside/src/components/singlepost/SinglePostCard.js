import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import "./singlePost.css";
import { styled } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";

const Row = styled("div")({
  display: "flex",
  gap: "10rem",
});

const Column = styled("div")({
  float: "left",
});
const P = styled("p")({
  fontWeight: "500",
  fontSize: "18px",
});

const SinglePostCard = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  const [post, setPost] = useState({});
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function getPost() {
      const res = await axios.get(
        "http://127.0.0.1:8000/posts/singlepost/" + path,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRiMjliMTZiLWQxOTItNDc2ZS1hZThmLWVkY2VjMWI2NzE0MyIsImVtYWlsIjoiZHVtbXkxM0BnbWFpbC5jb20iLCJpYXQiOjE2NjQ0NDA3NzEsImV4cCI6MTY2NDQ0Nzk3MX0.uHZTHUxLv-CV8qsuG3CPSD2sL7DskBCMv3eCREvzcAM`,
          },
        }
      );
      const token = JSON.parse(localStorage.getItem(res));
      console.log(token, "token");
      setPost(res.data);
    }
    getPost();
  }, [path]);

  useEffect(() => {
    if (Object.values(post).length !== 0) {
      const percantage = (post.raised / post.goal) * 100;
      setProgress(percantage);
    }
  }, [post]);
  return (
    <div className="singlePost">
      {Object.values(post).length > 0 && (
        <div className="singlePostWrapper">
          <h1 className="singlePostTitle">{post.title}</h1>
          <div className="singlePostInfo">
            <span className="singlePostAuthor">
              Author:
              <b>{post.user.firstname}</b>
            </span>
          </div>
          <p className="singlePostDesc">{post.description}</p>
          <LinearProgress
            variant="determinate"
            color="success"
            sx={{
              width: "50% ",
              height: "20px",
              marginBottom: "10px",
              borderRadius: "20px",
            }}
            value={progress}
          />
          <Row>
            <Column>
              <span>
                <i>
                  <LanguageOutlinedIcon sx={{ fontSize: 15 }} />
                </i>
                Goal
              </span>
              <P sx={{ color: "#f15b43" }}>${post.goal}</P>
            </Column>
            <Column>
              <span>
                <i>
                  <LanguageOutlinedIcon sx={{ fontSize: 15 }} />
                </i>
                Raised
              </span>
              <P sx={{ color: "#65c9bb" }}>${post.raised}</P>
            </Column>
            <Column>
              <span>
                <i>
                  <LanguageOutlinedIcon sx={{ fontSize: 15 }} />
                </i>
                ToGo
              </span>
              <P sx={{ color: "#ff9a39" }}>${post.goal - post.raised}</P>
            </Column>
          </Row>
        </div>
      )}
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
