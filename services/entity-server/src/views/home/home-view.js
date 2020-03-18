import React from "react";
import style from "./home-view.module.css";
import background from "../../assets/img/home-background-banner.jpg";
import {Link} from "react-router-dom";
import {Button, Intent} from "@blueprintjs/core";
import {ReactComponent as AnalyzingIdeationIcon} from "../../assets/img/Analyzing-Ideation.svg";
import {ReactComponent as UnderstandingIdeationIcon} from "../../assets/img/Understanding-ideation.svg";
import {ReactComponent as AugmentingIdeationIcon} from "../../assets/img/Augmenting-Ideation.svg";
import {useWindowSize} from "../../components/utils";
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
          <div className={style.jumbotronSpace}/>
        </div>
        <div className={style.contentWrapper}>
          <div className={style.headLineCards}>
            <InfoCard
              title={"Analyzing Ideation"}
              width={infoCardWidth(windowWidth)}
              icon={<AnalyzingIdeationIcon height={60}/>}
              takeAction={
                <Link to={"/research/analyzing-ideation"}>
                  <Button intent={Intent.SUCCESS}>Learn More</Button>
                </Link>
              }
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
              icon={<UnderstandingIdeationIcon height={60}/>}
              takeAction={
                <Link to={"/research/understanding-ideation"}>
                  <Button intent={Intent.SUCCESS}>Learn More</Button>
                </Link>
              }
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
              icon={<AugmentingIdeationIcon height={60}/>}
              takeAction={
                <Link to={"/research/augmenting-ideation"}>
                  <Button intent={Intent.SUCCESS}>Learn More</Button>
                </Link>
              }
            >
              <p>
                Combining our computational models of ideation with dynamic
                algorithmic systems, we build adaptive inspiration recommender
                systems in the context of hybrid human-machine systems.
              </p>
            </InfoCard>
          </div>
          <div className={style.homeViewText}>{<HomeViewText/>}</div>
        </div>
      </div>
    </>
  );
};

const HomeViewText = () => (
  <>
    <h2>What is Innovonto?</h2>
    <p>
      Innovonto is a research project investigating how to analyze, understand and augment idea generation processes
      with the help of algorithmic systems. We especially focus on these three topics in the context of large-scale
      ideation.</p>
    <p>
      Within our research, we developed prototypes for various ideation support tools and furthermore conducted idea
      generation challenges for different topics. These tools and the collected data are published openly and to be used
      by everybody. To get an example of the data we provide, have a look at <a href={"/entities/sessions/bcbd1835-70bd-4a24-bbc3-a9368ddb4a53"}>this
      ideation session</a>. The
      prototypes we developed so far can be found <a href={"/software"}>here</a>.
    </p>
    <p>
      To ensure the interoperability between developed tools, we also publish a common data scheme in the form of an <a
      href={"/research/idea-knowledge-graph"}>idea knowledge graph</a>.
    </p>
    <h3>What is Ideation?</h3>
    <p>Wikipedia defines Ideation as "the creative process of generating, developing, and communicating new ideas, where
      an idea is understood as a basic element of thought that can be either visual, concrete, or abstract."<a
        href="https://en.wikipedia.org/wiki/Ideation_(creative_process)" target="_blank" rel="noopener noreferrer">[Source]</a>.</p>
    <p>
      So far this is a pretty broad topic, ranging from <a
      href="https://dash.harvard.edu/bitstream/handle/1/30859746/siangliulue16ideahound-uist.pdf?sequence=1"
      target="_blank" rel="noopener noreferrer">generating a text for a birthday
      card</a> to <a href="https://openideo.com/" target="_blank" rel="noopener noreferrer">tackling "the world's biggest challenges"</a>. In
      order to get a context that enables to
      formulate actual research questions, we have to further limit the scope:
    </p>
    <p>
      The requirements for the processes of <em>generating</em>, <em>developing</em> and <em>communicating</em> ideas
      are very different. So we start by limiting ourselves to the process of <em>generating</em> new ideas, which means
      the process of
      actually getting ideas out of your head and, in our context, into some form of digital data.
    </p>
    <p>
      One of the challenges to define "ideation" in a useful way, is that ideas can look vastly different in terms of
      data, depending on their field. For example, ideas for a new type of car could be in the form of images or 3d
      models, while ideas for a theme song of a tv-series could be in the form of audio files or sheet music. So our
      first compromise is to limit our scope to one very general mode of an idea: <strong>text</strong>.
    </p>

    <h3>What is Large-Scale Ideation?</h3>
    <p>Over the last decade <em>crowdsourcing</em> has been identified as a novel and promising approach for a variety
      of tasks. Crowdsourcing describes a way to execute tasks by handing them over to a large group
      of people (the crowd) via the internet. One specific application of crowdsourcing is
      the collection of large numbers ideas for a given problem, topic or challenge.</p>
    <p>
      This approach has great potential: By bringing hundreds of people from diverse backgrounds and context together,
      crowd-sourcing enables the collection of large numbers of ideas on complex problems, increasing the potential for
      creative and potentially groundbreaking out of the box contributions. Crowd-sourced ideation led to new
      developments both in industry and in research. In industry, it gave rise to large scale ideation platforms, for
      example <a href="https://www.innocentive.com/" target="_blank" rel="noopener noreferrer">InnoCentive</a>,  <a href="https://quirky.com/" target="_blank" rel="noopener noreferrer">Quirky</a> or  <a href="https://www.openideo.com/" target="_blank" rel="noopener noreferrer">OpenIDEO</a>. In research, it helped establish the fields of
      <em>Open Innovation</em> in the context of economics as well as <em>large scale collaborative ideation</em> in
      HCI.
    </p>
    <p>The large-scale ideation reserach in HCI especially focusses on the following challenges:
    </p>
    <ul>
      <li>Analysis of large scale ideation showed that ideas submitted tend to be trivial, repetitive and of low
        quality. <a href={"/research/analyzing-ideation"}>How can we improve the outcome of each individual participant?</a>
      </li>
      <li>When many people generate ideas, people will come up with the same idea multiple times. In group settings,
        people are aware of all others' ideas and can react accordingly. However, the scale of large-scale ideation
        makes it impossible for each participant to read every idea of the others. <a href={"/research/analyzing-ideation"}>How can we select ideas for
          participants to read?</a>
      </li>
      <li>Another challenge introduced by the scale is the efficient analysis and synthesis of the ideas generated. When
        people contribute thousands of ideas for a topic, simply going through them one by one may not be an option.  <a href={"/research/analyzing-ideation"}>How
          can we build systems that help organizers understand the outcome ideas of large-scale ideation?</a>
      </li>
    </ul>
    <h3>What can I do on this website?</h3>
    <ul>
      <li>Read about our <a href={"/research/-"}>research vision and active projects</a>. If you are interested, contact us!</li>
      <li>Explore the <a href={"/model"}>data model</a> that we developed so far, to understand how to use our SPARQL-Endpoint.</li>
      <li>Interactively explore <a href={"/data"}>the ideas</a> we obtained over the last three year.</li>
      <li>Learn about <a href={"/software"}>software</a> we developed, and how you can use it.</li>
    </ul>
  </>
);
