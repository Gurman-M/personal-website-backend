import ProjectListItem from "./ProjectListItem"
import guessing from "/src/assets/images/guessing-game-thumbnail.png"
import pointillism from "/src/assets/images/pointillism-thumbnail.png"
import calculator from "/src/assets/images/budgeting-calc-thumbnail.png"
import wolfHacks from "/src/assets/images/wolf-hacks-thumbnail.png"
import "./styles/styles.css"

function ProjectList() {
    return (
        <ul className="flex-container w3-center">
            {/* Guessing Game Project */}
            <ProjectListItem link="https://github.com/Gurman-M/guessing-game" imgSrc={guessing} alt="guessing game project" 
                caption="A basic game I have created in C++. Try to get the right number in a range of 0 to 251!"/>
            
            {/* Pointillism Project */}
            <ProjectListItem link="https://github.com/Gurman-M/Pointillism-Project" imgSrc={pointillism} alt="pointillism project" 
                caption="This program attempts to recreate images using the pointillism drawing technique."/>

            {/* Budgeting Calculator Project */}
            <ProjectListItem link="https://github.com/Gurman-M/SmartFinancialBudgeting/blob/main/application/Main.java" imgSrc={calculator} 
                alt="budgeting calculator" caption="Users can calculate an estimate of where their annual earnings can be spent wisely."/>

            {/* Wolf Hacks Project */}
            <ProjectListItem link="https://github.com/Gurman-M/Wolf-Hacks" imgSrc={wolfHacks} alt="wolf hacks project" 
                caption="Interactive games using Augmented Reality. A submission for Wolf Hacks 2020."/>
        </ul>
    );
}

export default ProjectList