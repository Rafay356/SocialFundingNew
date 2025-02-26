import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { getUser } from "../Api/GetRequest";
import "../css/card.css";
import CauseCard from "../card/cause-card";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

const styleContainer = {
  display: "flex",
  flexWrap: "wrap",
  marginBottom: "10px",
  marginTop: "-50px",
};

const skeletonCount = 6;
const PAGE_SIZE = 6;

export const Causes = () => {
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCauses = async () => {
      setLoading(true);
      try {
        const causes = await getUser();
        setCauses(causes);
      } catch (err) {
        setError("Failed to fetch causes.");

        console.error("Error fetching causes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCauses();
  }, []);

  const handleDelete = (deletedId) => {
    setCauses((prevCauses) =>
      prevCauses.filter((cause) => cause._id !== deletedId)
    );
  };

  if (loading) {
    return (
      <Container style={styleContainer}>
        {Array.from(new Array(skeletonCount)).map((_, index) => (
          <div key={index} style={{ width: "30%", padding: "10px" }}>
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="40%" />
            <Skeleton
              sx={{ height: 190 }}
              animation="wave"
              variant="rectangular"
            />
            <React.Fragment>
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width="80%" />
            </React.Fragment>
          </div>
        ))}
      </Container>
    );
  }
  if (error) {
    return (
      <Container style={styleContainer}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container style={styleContainer}>
      {causes.length > 0 ? (
        causes.map((cause) => (
          <CauseCard key={cause._id} cause={cause} onDelete={handleDelete} />
        ))
      ) : (
        <Typography>No posts available</Typography>
      )}
    </Container>
  );
};

export default Causes;
