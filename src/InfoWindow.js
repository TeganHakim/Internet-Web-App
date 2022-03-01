import * as React from "react";
import Drawer from "@mui/material/Drawer";
import "./styles/infowindow.css";

export default function InfoWindow({ hoverState }) {
  const [state, setState] = React.useState({
    right: true,
  });

  const dataInfo = {
    ISP: {
      title: "Internet Service Provider (ISP)",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ullamcorper augue luctus, sodales quam nec, rhoncus lorem. Sed et volutpat enim. Suspendisse potenti. Donec ac convallis arcu. Morbi dapibus tellus non ipsum sagittis elementum eu sit amet enim. Sed condimentum massa dui, eget accumsan turpis vulputate finibus. Proin ac malesuada.",
    },
    DNS: {
      title: "Domain Name System (DNS)",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ullamcorper augue luctus, sodales quam nec, rhoncus lorem. Sed et volutpat enim. Suspendisse potenti. Donec ac convallis arcu. Morbi dapibus tellus non ipsum sagittis elementum eu sit amet enim. Sed condimentum massa dui, eget accumsan turpis vulputate finibus. Proin ac malesuada.",
    },
  };

  const content = () =>
    hoverState !== null ? (
      <div class="container">
        <h1 class="title">{dataInfo[hoverState].title}</h1>
        <p class="description">{dataInfo[hoverState].description}</p>
      </div>
    ) : (
      <div />
    );

  return (
    <div>
      <React.Fragment>
        <Drawer className={"info"} anchor={"right"} open={state["right"]}>
          {content()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}