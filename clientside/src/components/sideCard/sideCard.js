import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useLocation } from "react-router";

export default function SideCardMedia() {
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  console.log(path);
  const [post, setPost] = useState({});

  useEffect(() => {
    async function getPost() {
      const res = await axios.get(
        "http://127.0.0.1:8000/posts/singlepost/" + path
      );
      setPost(res.data);
    }
    getPost();
  }, [path]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={post.avatar}
        height="140"
        image={`/images/${post.avatar}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s,
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>
  );
}
