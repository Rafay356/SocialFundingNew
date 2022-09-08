import * as React from "react";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { causes } from "../mock-data/mock";
import { getUser } from "../Api/GetRequest";
import GetRequest from "../Api/GetRequest";
import "../css/card.css";
import CauseCard from "../card/cause-card";

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
    <Container
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {allCauses.map((item, i) => {
        return <CauseCard key={i} item={item} />;
      })}
    </Container>
  );
};
