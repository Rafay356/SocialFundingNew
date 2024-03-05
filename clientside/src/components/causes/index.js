import * as React from "react";
import { useEffect, useState } from "react";
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
  const [allCauses, setAllCauses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) return setLoading(true);
    getUser().then((allCauses) => setAllCauses(allCauses));
    setLoading(true);
  }, []);

  return (
    <Container style={styleContainer}>
      {allCauses.map((item) => {
        return <CauseCard key={item.id} item={item} />;
      })}
    </Container>
  );
};
