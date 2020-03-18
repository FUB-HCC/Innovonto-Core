import React from "react";
import style from "./software-view.module.css";
import TwoColumnContent from "../../components/common/two-column-content";
import PageTitle from "../../components/common/page-title";
import greenhouseImg from "../../assets/img/greenhouse.png";
import orchardImg from "../../assets/img/orchard.png";
import orchard2Img from "../../assets/img/orchard-2.png";
import kaleidoscopeImg from "../../assets/img/kaleidocsope.png";
import icvImg from "../../assets/img/annotator-example.png";
import innovontoCoreImg from "../../assets/img/innovonto-core.png";

export const SoftwareView = () => {
  return (
    <div className={style.softwareViewWrapper}>
      <PageTitle title={"Software"} />
      <div className={style.softwareViewContent}>
        <TwoColumnContent
          left={<img src={greenhouseImg} alt={"greenhouse-img"} />}
          right={<GreenhouseText />}
          title={"Greenhouse"}
        />
        <TwoColumnContent
          right={
            <>
              <img src={orchardImg} alt={"orchard-img"} />
              <img src={orchard2Img} alt={"orchard2-img"} />
            </>
          }
          left={<OrchardText />}
          title={"Orchard"}
        />
        <TwoColumnContent
          left={<img src={kaleidoscopeImg} alt={"kaleidoscope-img"} />}
          right={<KaleidoscopeText />}
          title={"Kaleidoscope"}
        />
        <TwoColumnContent
          right={<img src={icvImg} alt={"icv-img"} />}
          left={<ICVText />}
          title={"ICV-Annotator"}
        />
        <TwoColumnContent
          right={<InnovontoCoreText />}
          left={<img src={innovontoCoreImg} alt={"Innovonto-Core"} />}
          title={"Innovonto-Core"}
        />
      </div>
    </div>
  );
};

const GreenhouseText = () => (
  <>
    <p>
      Greenhouse is a software to crowd-source ideas. It is based on challenges,
      that can be defined by an organizer. Challenges consist of a title,
      description for the participants and configurable inspirations available
      to the participants during brainstorming. After configuring a challenge,
      the organizer can publish it under a link and post that link to a
      crowdsourcing portal of their choice. All ideas submitted within a
      challenge can be then reviewed by the organizer. We have used Greenhouse
      to configure the <em>Bionic Radar</em>
      and collect the ideas shown in the data tab.
    </p>
    <p>
      Visit the{" "}
      <a
        href="https://github.com/FUB-HCC/Innovonto-Greenhouse"
        target="_blank"
        rel="noopener noreferrer"
      >
        Greenhouse Github Page
      </a>{" "}
      for more information.
    </p>
  </>
);

const OrchardText = () => (
  <>
    <p>
      Orchard is designed to be a software to manage existing idea-sparks,
      cluster them and synthesize new ideas from the results. Orchard provides
      the user with an idea whiteboard, inspired by the{" "}
      <a
        href="https://www.eecs.harvard.edu/~kgajos/papers/2016/siangliulue16ideahound-uist.shtml"
        target="_blank"
        rel="noopener noreferrer"
      >
        Idea Hound
      </a>{" "}
      software. Users can use import ideas into orchard using RDF and the{" "}
      <a href={"/model"}>data model</a> provided. In our use case, Ideas
      exported in Greenhouse can be imported into Orchard. Users can then place
      the ideas on a digital whiteboard, create clusters based on similar ideas,
      name these clusters and get an overview over existing clusters.
      Furthermore, users can create elaborated ideas from the clustering result
      (also called <em>idea synthesis</em>), categorize them and provide more
      information about them. These result ideas can then be exported into RDF
      again.
    </p>
    <p>
      Visit the{" "}
      <a
        href="https://github.com/FUB-HCC/Innovonto-Orchard"
        target="_blank"
        rel="noopener noreferrer"
      >
        Orchard Github Page
      </a>{" "}
      for more information.
    </p>
  </>
);

const KaleidoscopeText = () => (
  <>
    <p>
      Another way of analyzing ideation outcomes was conceptualized in the
      Kaleidoscope software. Kaleidoscope is an exploratory data analytics tool
      based on semantic technologies. It supports users in exploring and
      annotating existing ideas interactively. The main interface of
      Kaleidoscope is a grid-pane. To construct this grid, similarities between
      all idea-pairs are calculated. As opposed to other graph visualizations,
      we keep the placement of ideas in the interface fixed, i.e. ideas cannot
      be (re)moved. Msers are initially provided with an unmarked grid-pane,
      where each cell represents one idea. To explore patterns and
      commonalities, we introduce the concept of markers, which summarizes
      mechanisms for automatic and manual annotation of ideas. Users can define
      their markers in a list on the right which are then applied to the
      grid-pane. The ideas are marked on the grid-pane with a small customizable
      icon. A user can select both the icon and its color. Based on the used
      markers, patterns can emerge in the idea space that allow for, amongst
      other things, identifying clusters, detecting duplicates or finding often
      used concepts.
    </p>
    <p>
      Visit the{" "}
      <a
        href="https://github.com/FUB-HCC/Innovonto-Kaleidoscope"
        target="_blank"
        rel="noopener noreferrer"
      >
        Kaleidoscope Github Page
      </a>{" "}
      for more technical information.
    </p>
    <p>
      Read the{" "}
      <a
        href="https://dl.acm.org/doi/abs/10.1145/3266037.3266106"
        target="_blank"
        rel="noopener noreferrer"
      >
        UIST 2018 Poster Publication
      </a>{" "}
      for more information about the design ideas of Kaleidoscope.
    </p>
  </>
);

const ICVText = () => (
  <>
    <p>
      One way of <a href={"/research/analyzing-ideation"}>analyzing ideation</a>{" "}
      is to link words within an idea texts to concepts within a general
      knowledge graph. We build a software called ICV-Annotator, to enable the
      interactive disambiugation, annotation and linking of concepts within
      texts. This software consists of a frontend, that enables the annotation,
      and multiple backends, that find annotation candidates for terms within a
      text. At the moment, a dbpedia/wikipedia backend, and a wordnet backend
      exist.
    </p>
    <p>
      Visit the{" "}
      <a
        href="https://github.com/FUB-HCC/Innovonto-ICV"
        target="_blank"
        rel="noopener noreferrer"
      >
        ICV-Annotator Page
      </a>{" "}
      for more information.
    </p>
  </>
);

const InnovontoCoreText = () => (
  <>
    <p>
      The main focus of the Innovonto research project was the creation of an{" "}
      <a href={"/research/analyzing-ideation"}>Idea Knowledge Graph</a>. The
      Innovonto-Core Website combines a triplestore and a react-based frontend,
      to provide the Idea Knowledge Graph both as a SPARQL endpoint and a
      website that enables interactive exploration of the data. The source code
      of this website is publicly available.
    </p>
    <p>
      Visit the{" "}
      <a
        href="https://github.com/FUB-HCC/Innovonto-Core"
        target="_blank"
        rel="noopener noreferrer"
      >
        Innovonto-Core Github Page
      </a>{" "}
      for more information.
    </p>
  </>
);
