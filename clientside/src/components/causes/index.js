// import * as React from "react";
// import { useEffect, useState } from "react";
// import { Container } from "@mui/material";
// import { getUser } from "../Api/GetRequest";
// import "../css/card.css";
// import CauseCard from "../card/cause-card";

// const styleContainer = {
//   display: "flex",
//   flexWrap: "wrap",
//   marginBottom: "10px",
//   marginTop: "-50px",
// };

// export const Causes = () => {
//   const [allCauses, setAllCauses] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (loading) return setLoading(true);
//     getUser().then((allCauses) => setAllCauses(allCauses));
//     setLoading(true);
//   }, []);

//   return (
//     <Container style={styleContainer}>
//       {allCauses.map((item) => {
//         console.log(item, "item");
//         return <CauseCard key={item._id} item={item} />;
//       })}
//     </Container>
//   );
// };

import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { getUser } from "../Api/GetRequest";
import "../css/card.css";
import CauseCard from "../card/cause-card";

const styleContainer = {
  display: "flex",
  flexWrap: "wrap",
  marginBottom: "10px",
  marginTop: "-50px",
};

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
        setError("Failed to fetch causes.", err);

        console.error("Error fetching causes:", error);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!causes.length) return <div>No causes found.</div>;

  return (
    <Container style={styleContainer}>
      {causes.map((cause) => (
        <CauseCard key={cause._id} cause={cause} onDelete={handleDelete} />
      ))}
    </Container>
  );
};

export default Causes;
