import * as React from "react";
import Drawer from "@mui/material/Drawer";
import "./styles/infowindow.css";

export default function InfoWindow({ hoverState, serverInfo, DNSInfo }) {
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
    tower: {
      title: "Cell Tower",
      description:
        "Cell towers (also known as cell sites), through the use of mounted antennas, help to facilitate the signal recption of electronic devices to allow for wireless communication.",
    },
    httpRequest: {
      title: "HTTP Request",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ullamcorper augue luctus, sodales quam nec, rhoncus lorem. Sed et volutpat enim. Suspendisse potenti. Donec ac convallis arcu. Morbi dapibus tellus non ipsum sagittis elementum eu sit amet enim. Sed condimentum massa dui, eget accumsan turpis vulputate finibus. Proin ac malesuada.",
    },
    router: {
      title: "Router",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ullamcorper augue luctus, sodales quam nec, rhoncus lorem. Sed et volutpat enim. Suspendisse potenti. Donec ac convallis arcu. Morbi dapibus tellus non ipsum sagittis elementum eu sit amet enim. Sed condimentum massa dui, eget accumsan turpis vulputate finibus. Proin ac malesuada.",
    },
    server: {
      title: "Server",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ullamcorper augue luctus, sodales quam nec, rhoncus lorem. Sed et volutpat enim. Suspendisse potenti. Donec ac convallis arcu. Morbi dapibus tellus non ipsum sagittis elementum eu sit amet enim. Sed condimentum massa dui, eget accumsan turpis vulputate finibus. Proin ac malesuada.",
    },
  };

  const content = () =>
    hoverState !== null ? (
      <div>
        <h1 class="title">{dataInfo[hoverState].title}</h1>
        <p class="description">{dataInfo[hoverState].description}</p>
        {hoverState === "server" ? 
          <div class="server-info">
            <h3>URL</h3>
            <p class="url">{serverInfo.url}</p> 
            <h3>IP ADDRESS</h3>
            <p class="ip">{serverInfo.ip}</p> 
          </div>  
          : <div></div>}

        {hoverState === "DNS" ? 
          <div class="dns-info">
            <h3>Convert to IP</h3>
            <p class="web-url">{DNSInfo.webURL}</p> 
            <p class="arrow">&#8595;</p>
            <p class="to-url">{DNSInfo.toURL}</p> 
            <p class="arrow">&#8595;</p>
            <p class="to-ip">{DNSInfo.toIP}</p> 
          </div>  
          : <div></div>}
      </div>
    ) : (
      <div />
    );

  return (
    <div>
      <React.Fragment>
        <Drawer className={"info"} anchor={"right"} open={state["right"]}>
          <div className={"container"}>
            {content()}
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
