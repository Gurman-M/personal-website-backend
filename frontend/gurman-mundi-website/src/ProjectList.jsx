import ProjectListItem from "./ProjectListItem"
import stock_chart from "/src/assets/images/stock-chart.png"
import cloud from "/src/assets/images/crc.png"
import http_server from "/src/assets/images/http_server.png"
import "./styles/styles.css"

function ProjectList() {
    return (
        <ul className="flex-container w3-center">
            {/* Stock Strategy Simulator */}
            <ProjectListItem link="https://github.com/Gurman-M/Stock-Strategy-Simulator" imgSrc={stock_chart} alt="stock simulator project" 
                caption="This app tests four different investing strategies and evaluates which strategies are successful in the market."/>
            
            {/* Cloud Resume Site */}
            <ProjectListItem link="https://github.com/Gurman-M/cloud-personal-website" imgSrc={cloud} alt="cloud resume site project" 
                caption="This project aims to host my personal website on AWS. The idea for this project is based off the Cloud Resume Challenge."/>

            {/* HTTP Server C */}
            <ProjectListItem link="https://github.com/Gurman-M/http-server-c" imgSrc={http_server} 
                alt="http server" caption="HTTP server in C tested with Docker clients, handling sockets, parsing requests, and serving responses."/>
        </ul>
    );
}

export default ProjectList