import * as React from "react";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { causes } from "../mock-data/mock";
import { getUser } from "../Api/GetRequest";
import GetRequest from "../Api/GetRequest";
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

  // useEffect(() => {
  //   setApiGetData(GetRequest);
  //   console.log(apigetData);
  // }, []);

  useEffect(() => {
    // console.log("hello");

    getUser().then((allCauses) => setAllCauses(allCauses));
    // console.log("all", users);
  }, []);

  return (
    <Container style={styleContainer}>
      {allCauses.map((item) => {
        return <CauseCard key={item.id} item={item} />;
      })}
    </Container>
  );
};
