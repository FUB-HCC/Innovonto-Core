import React from "react";
import style from "./home-view.module.css";
import background from "../../assets/img/home-background-banner.jpg";
import { Button, Intent } from "@blueprintjs/core";
import { ReactComponent as AnalyzingIdeationIcon } from "../../assets/img/Analyzing-Ideation.svg";
import { ReactComponent as UnderstandingIdeationIcon } from "../../assets/img/Understanding-ideation.svg";
import { ReactComponent as AugmentingIdeationIcon } from "../../assets/img/Augmenting-Ideation.svg";
import { useWindowSize } from "../../components/utils";
import InfoCard from "../../components/home/info-card";

const infoCardWidth = windowWidth =>
  Math.max((Math.min(windowWidth, 1000) - 12) / 3, 300);

const backgroundImgHeight = (windowWidth, windowHeight) =>
  windowWidth > 1260 ? (windowWidth / windowHeight) * 1100 : "100%";

export const HomeView = () => {
  const [windowWidth, windowHeight] = useWindowSize();
  return (
    <>
      <div className={style.homeBackground}>
        <img
          src={background}
          height={backgroundImgHeight(windowWidth, windowHeight)}
          alt={"home-background"}
        />
      </div>
      <div className={style.homeViewWrapper}>
        <div className={style.homeJumbotron}>
          <div className={style.jumbotronText}>
            <div className={style.innovonto}>
              <div>Innovonto</div>
            </div>
            <div className={style.jumboSubtitle}>An open Tool suite</div>
            <div className={style.jumboSubtitle}>for Innovation</div>
          </div>
          <div className={style.jumbotronSpace} />
        </div>
        <div className={style.contentWrapper}>
          <div className={style.headLineCards}>
            <InfoCard
              title={"Analyzing Ideation"}
              width={infoCardWidth(windowWidth)}
              icon={<AnalyzingIdeationIcon height={60} />}
              takeAction={<Button intent={Intent.SUCCESS}>Learn More</Button>}
            >
              <p>
                By building computational models for the entities involved in
                ideation processes, we enable algorithmic processing of both
                ideas and ideation processes.
              </p>
            </InfoCard>
            <InfoCard
              title={"Understanding Ideation"}
              width={infoCardWidth(windowWidth)}
              icon={<UnderstandingIdeationIcon height={60} />}
              takeAction={<Button intent={Intent.SUCCESS}>Learn More</Button>}
            >
              <p>
                By visualizating the data obtained in large scale ideation, we
                provide insight into the underlying mechanisms of creativity and
                link our findings to research in cognitive science.
              </p>
            </InfoCard>
            <InfoCard
              title={"Augmenting Ideation"}
              width={infoCardWidth(windowWidth)}
              icon={<AugmentingIdeationIcon height={60} />}
              takeAction={<Button intent={Intent.SUCCESS}>Learn More</Button>}
            >
              <p>
                Combining our computational models of ideation with dynamic
                algorithmic systems, we build adaptive inspiration recommender
                systems in the context of hybrid human-machine systems.
              </p>
            </InfoCard>
          </div>
          <div className={style.homeViewText}>{<HomeViewText />}</div>
        </div>
      </div>
    </>
  );
};

const HomeViewText = () => (
  <>
    <h2>What is Innovonto?</h2>
    <p>
      {"Innovonto is a research project investigating how to analyze, understand and augment idea generation processes with the help of algorithmic systems. We especially focus on these three topics in the context of large-scale ideation.\n" +
        "Within our research, we developed prototypes for various ideation support tools and furthermore conducted idea generation challenges for different topics. These tools and the collected data are published openly and to be used by everybody. To get an example of the data we provide, have a look at [this ideation session](TODO). The prototypes we developed so far can be found [here](TODO).\n" +
        "To ensure the interoperability between developed tools, we also publish a common data scheme in the form of an [idea knowledge graph](/research#idea-knowledge-graph)."}
    </p>
    <h3>What is Ideation?</h3>
    <p>
      {'Wikipedia defines Ideation as "the creative process of generating, developing, and communicating new ideas, where an idea is understood as a basic element of thought that can be either visual, concrete, or abstract. "[(Source)](https://en.wikipedia.org/wiki/Ideation_(creative_process))\n' +
        'So far this is a pretty broad topic, ranging from [generating a text for a birthday card](https://dash.harvard.edu/bitstream/handle/1/30859746/siangliulue16ideahound-uist.pdf?sequence=1) to [tackling "the world\'s biggest challenges"](https://openideo.com/). In order to get a context that enables to formulate actual research questions, we have to further limit the scope:\n' +
        "The requirements for the processes of *generating*, *developing* and *communicating* ideas are very different. So we start by limiting ourselves to the process of *generating* new ideas, which means the process of actually getting ideas out of your head and, in our context, into some form of digital data.\n" +
        'One of the challenges to define "ideation" in a useful way, is that ideas can look vastly different in terms of data, depending on their field. For example, ideas for a new type of car could be in the form of images or 3d models, while ideas for a theme song of a tv-series could be in the form of audio files or sheet music. So our first compromise is to limit our scope to one very general mode of an idea: **text**.\n' +
        "Often embedded in larger innovation processes: Innovation describes Problem Formulation, Idea Generation, Idea Iteration, Ranking, and finally idea selection and implementation.\n"}
    </p>
    <h3>What is Large-Scale Ideation?</h3>
    <p>
      {"Over the last decade \\textit{crowdsourcing} has been identified as a novel and promising approach for a variety of tasks \\cite{howe2006rise}. Crowdsourcing describes a way to execute tasks by handing them over to a large group of people (the crowd) via the internet \\cite{estelles2012towards}. One specific application of crowdsourcing is the collection of large numbers ideas for a given problem, topic or challenge \\cite{kittur2010crowdsourcing}.\n" +
        "This approach has great potential: By bringing hundreds of people from diverse backgrounds and context together, crowd-sourcing enables the collection of large numbers of ideas on complex problems, increasing the potential for creative and potentially groundbreaking out of the box contributions. Crowd-sourced ideation led to new developments both in industry and in research. In industry, it gave rise to large scale ideation platforms, for example [InnoCentive](), [Quirky]() or [OpenIDEO](). In research, it helped establish the fields of \\textit{Open Innovation} in the context of economics as well as \\textit{large scale collaborative ideation} in HCI.\n" +
        "The large-scale ideation reserach in HCI especially focusses on the following challenges:\n" +
        "    - Analysis of large scale ideation showed that ideas submitted tend to be trivial, repetitive and of low quality. How can we improve the outcome of each individual participant?\n" +
        "    - When many people generate ideas, people will come up with the same idea multiple times. In group settings, people are aware of all others' ideas and can react accordingly. However, the scale of large-scale ideation makes it impossible for each participant to read every idea of the others. How can we  asdfasdf\n" +
        "    - Another challenge introduced by the scale is the efficient analysis and synthesis of the ideas generated. When people contribute thousands of ideas for a topic, simply going through them one by one may not be an option. How can we build systems that help \n"}
    </p>
  </>
);
