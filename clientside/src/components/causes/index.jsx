import React, { useEffect, useState } from "react";
import { Container, Skeleton, Typography, Box, styled } from "@mui/material";
import { getUser } from "../Api/GetRequest";
import "../css/card.css";
import CauseCard from "../card/cause-card";
import BasicPagination from "../Pagination";
import { useSearchParams } from "react-router-dom";

const styleContainer = {
  display: "flex",
  flexWrap: "wrap",
  marginBottom: "10px",
  marginTop: "-50px",
};
const Contain = styled(Container)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  marginBottom: "10px",
  marginTop: "-50px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
  [theme.breakpoints.down("md")]: {
    // flex: 2,
    flexDirection: "row",
  },
}));
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
  // const [currentPage, setCurrentPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = (parseInt(searchParams.get("page")) || 1) - 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPosts = causes.length;
  const totalPages = Math.ceil(totalPosts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE; //this is for start page posts whch is 6 in this case
  const end = start + PAGE_SIZE; //this is end posts which is 12 in this if statrt is 6

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
  useEffect(() => {
    if (currentPage > 0 && currentPage * PAGE_SIZE >= causes.length) {
      const newPage = Math.max(currentPage - 1, 0);
      if (currentPage !== newPage) {
        setCurrentPage(newPage);
        setSearchParams({ page: newPage });
      }
      // setCurrentPage((prev) => Math.max(prev - 1, 0));
      // setSearchParams({ page: Math.max(currentPage - 1, 0) });
    }
  }, [causes]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleDelete = (deletedId) => {
    setCauses((prevCauses) => {
      const newCauses = prevCauses.filter((cause) => cause._id !== deletedId);

      return newCauses;
    });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); // Update currentPage when page changes
    setSearchParams({ page: newPage + 1 });
  };

  if (loading) {
    return (
      <Container style={styleContainer}>
        {Array.from(new Array(skeletonCount)).map((_, index) => (
          <Box
            key={index}
            sx={{ width: { xs: "100%", sm: "48%", md: "30%" }, p: 1 }}
          >
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
          </Box>
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
    <>
      <Contain>
        {causes.slice(start, end).map((cause) => (
          <div style={{ display: "flex" }} key={cause._id}>
            <CauseCard key={cause._id} cause={cause} onDelete={handleDelete} />
          </div>
        ))}
      </Contain>
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
