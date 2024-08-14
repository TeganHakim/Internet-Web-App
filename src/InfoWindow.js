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
        "The Internet Service Provider assigns a unique IP address to each connected device. This is the company that you and your family pay to gain access to the Internet.",
    },
    DNS: {
      title: "Domain Name System (DNS)",
      description:
        "Behind the scenes, each domain name maps to an IP address. When we type a URL in the address bar of our browser, the DNS has to figure out its IP address. If the IP address is not stored in the local cache, the ISP Domain Resolver will find it by communicating with Root Name Servers, TLD Servers, and Host Name Servers.",
    },
    tower: {
      title: "Cell Tower",
      description:
        "Cell towers (also known as cell sites), through the use of mounted antennas, help to facilitate the signal recption of electronic devices to allow for wireless communication.",
    },
    httpRequest: {
      title: "HTTP (Hypertext Transfer Protocol)",
      description:
        "HTTP is a protocol that's built on top of the TCP/IP protocols. Through the use of a DNS Resolver, the Uniform Resource Locator (URL) maps the domain (ex: www.wikipedia.com) to an IP address. The browser then sends an HTTP Request to the host server with a specific action (GET, POST, DELETE, etc.). The host then sends a response back with both the content and metadata associated with it. The response has a status code associated with it to tell the computer whether or not the packets were successfully gathered (ex: 200 OK, 404 ERROR)",
    },
    router: {
      title: "Router",
      description:
        "A router is a type of computing device used in computer networks that helps move the packets along. Computers send the first packet to the nearest router. Using a forwarding table, the router choses the next router to send the packets to based on the destination IP address.",
    },
    server: {
      title: "Server",
      description:
        "A server is a computer or system that across a network distributes resources, data, services, or programs to other computers known as clients through the use of multiple internet protocols such as IP, TCP, HTTP, etc.",
    },
  };

  const content = () =>
    hoverState !== null ? (
      <div>
        <h1 className="title">{dataInfo[hoverState].title}</h1>
        <p className="description">{dataInfo[hoverState].description}</p>
        {hoverState === "server" ? 
          <div className="server-info">
            <h3>URL</h3>
            <p className="url">{serverInfo.url}</p> 
            <h3>IP ADDRESS</h3>
            <p className="ip">{serverInfo.ip}</p> 
          </div>  
          : <div></div>}

        {hoverState === "DNS" ? 
          <div className="dns-info">
            <h3>Convert to IP</h3>
            <p className="web-url">{DNSInfo.webURL}</p> 
            <p className="arrow">&#8595;</p>
            <p className="to-url">{DNSInfo.toURL}</p> 
            <p className="arrow">&#8595;</p>
            <p className="to-ip">{DNSInfo.toIP}</p> 
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
