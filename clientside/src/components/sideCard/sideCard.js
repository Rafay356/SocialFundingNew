import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Icon } from "@iconify/react";
import shareFill from "@iconify/icons-eva/share-fill";
import twitterFill from "@iconify/icons-eva/twitter-fill";
import linkedinFill from "@iconify/icons-eva/linkedin-fill";
import facebookFill from "@iconify/icons-eva/facebook-fill";
// import instagramFilled from "@iconify/icons-ant-design/instagram-filled";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router";

const SOCIALS = [
  {
    name: "Facebook",
    icon: <Icon icon={facebookFill} width={20} height={20} color="#1877F2" />,
  },
  // {
  //   name: "Instagram",
  //   icon: (
  //     <Icon icon={instagramFilled} width={20} height={20} color="#D7336D" />
  //   ),
  // },
  {
    name: "Linkedin",
    icon: <Icon icon={linkedinFill} width={20} height={20} color="#006097" />,
  },
  {
    name: "Twitter",
    icon: <Icon icon={twitterFill} width={20} height={20} color="#1C9CEA" />,
  },
];

export default function SideCardMedia() {
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  const [post, setPost] = useState([]);

  useEffect(() => {
    async function getPost() {
      console.log("getPost function called");
      const res = await axios.get(
        "http://127.0.0.1:8000/posts/singlepost/" + path,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRiMjliMTZiLWQxOTItNDc2ZS1hZThmLWVkY2VjMWI2NzE0MyIsImVtYWlsIjoiZHVtbXkxM0BnbWFpbC5jb20iLCJpYXQiOjE2NjQ0NDA3NzEsImV4cCI6MTY2NDQ0Nzk3MX0.uHZTHUxLv-CV8qsuG3CPSD2sL7DskBCMv3eCREvzcAM`,
          },
        }
      );
      setPost(res.data);
    }
    getPost();
  }, [path]);

  return (
    <>
      {Object.values(post).length > 0 && (
        <Card className="card" sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt={post.avatar}
            height="250"
            image={`/images/${post.user.profilepic}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {post.user.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,
            </Typography>
          </CardContent>
          <SpeedDial
            direction={"right"}
            ariaLabel="Share post"
            icon={<Icon icon={shareFill} />}
            sx={{
              "& .MuiSpeedDial-fab": { width: 38, height: 38 },
              marginTop: "-10px",
              marginLeft: "10px",
            }}
          >
            {SOCIALS.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipPlacement="top"
                FabProps={{ color: "default" }}
              />
            ))}
          </SpeedDial>
          {/* <CardActions>
        <Button size="small">Share</Button>
      </CardActions> */}
        </Card>
      )}
    </>
  );
}
