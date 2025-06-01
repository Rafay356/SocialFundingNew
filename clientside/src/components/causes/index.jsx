import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { getUser } from "../Api/GetRequest";
import "../css/card.css";
import CauseCard from "../card/cause-card";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import BasicPagination from "../Pagination";

const styleContainer = {
  display: "flex",
  flexWrap: "wrap",
  marginBottom: "10px",
  marginTop: "-50px",
};
const pagination = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
};

const skeletonCount = 6;
const PAGE_SIZE = 6;

export const Causes = () => {
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchCauses = async () => {
      setLoading(true);
      try {
        const causes = await getUser();
        setCauses(causes);
        console.log(causes, "causes");
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
    setCauses((prevCauses) => {
      const newCauses = prevCauses.filter((cause) => cause._id !== deletedId);
      if (newCauses.length <= currentPage * PAGE_SIZE) {
        setCurrentPage(0);
      }
      return newCauses;
    });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); // Update currentPage when page changes
  };

  if (loading || causes.length < 1) {
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
  const totalPosts = causes.length;
  const totalPages = Math.ceil(totalPosts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE; //this is for start page posts whch is 6 in this case
  const end = start + PAGE_SIZE; //this is end posts which is 12 in this if statrt is 6
  return (
    <>
      <Container style={styleContainer}>
        {causes.slice(start, end).map((cause) => (
          <CauseCard key={cause._id} cause={cause} onDelete={handleDelete} />
        ))}
      </Container>
      <div style={pagination}>
        <BasicPagination
          totalPages={totalPages}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default Causes;
