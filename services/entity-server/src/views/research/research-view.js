import React from "react";
import propTypes from "prop-types";
import style from "./research-view.module.css";
import TwoColumnContent from "../../components/common/two-column-content";
import PageTitle from "../../components/common/page-title";
import ideaModelingImg from "../../assets/img/idea-vision-visualization.png";
import ideaLifecycleImg from "../../assets/img/idea-lifecycle.png";
import ideaSpaceVisualizationImg from "../../assets/img/vision-idea-map.png";
import ideaVisualizationImg from "../../assets/img/spark-viz.png";

import ImgWithCaption from "../../components/common/img-with-caption";
import sessionVizImg1 from "../../assets/img/session-view.png";
import sessionVizImg2 from "../../assets/img/session-tree.png";
import augmentingIdeationImg from "../../assets/img/augmenting-ideation.png";
import adaptiveIdeationSystemsImg from "../../assets/img/adaptive-ideation-systems.png";
import interactiveConceptValImg from "../../assets/img/interactive-concept-validation.png";
import inspirationRecommenderImg from "../../assets/img/idea-recommender.png";

export const ResearchView = () => {
  return (
    <div className={style.researchViewWrapper}>
      <PageTitle title={"Research"} />
      <div className={style.researchViewContent}>
        <TwoColumnContent
          titleSize={30}
          right={<div />}
          left={<AnalyzingIdeationText />}
          title={"Analyzing Ideation"}
        />
        <TwoColumnContent
          right={
            <ImgWithCaption
              src={ideaModelingImg}
              altText={"idea-visualization-img"}
              caption={"Vision of a multi-facetted Idea model."}
              figureNo={1}
            />
          }
          left={<IdeaModelingText />}
          title={"Idea Modeling"}
        />
        <TwoColumnContent
          left={
            <ImgWithCaption
              src={ideaLifecycleImg}
              altText={"idea-lifecycle-img"}
              caption={"Vision of an interconnected idea lifecycle"}
              figureNo={2}
            />
          }
          right={<IdeaLifecycleText />}
          title={"Idea Lifecycle"}
        />
        <h1 className={style.largeTitle}>Understanding Ideation</h1>
        <TwoColumnContent
          left={<IdeaSpaceVisualizationText />}
          right={
            <ImgWithCaption
              src={ideaSpaceVisualizationImg}
              altText={"idea-space-visualization-img"}
              caption={"Vision of an interactive idea space"}
              figureNo={3}
            />
          }
          title={"Idea Space Visualization"}
        />
        <TwoColumnContent
          left={
            <ImgWithCaption
              src={ideaVisualizationImg}
              altText="idea-visualization-img"
            />
          }
          right={<div />}
          title={"IdeaVisualization"}
        />
        <TwoColumnContent
          left={<SessionVisualizationText />}
          right={
            <>
              <img src={sessionVizImg1} alt={"session-view-img"} />
              <img src={sessionVizImg2} alt={"session-tree-img"} />
            </>
          }
          title={"SessionVisualization"}
        />
        <TwoColumnContent
          titleSize={30}
          left={
            <img src={augmentingIdeationImg} alt={"augmenting-ideation-img"} />
          }
          right={<AugmentingIdeationText />}
          title={"Augmenting Ideation"}
        />
        <TwoColumnContent
          right={
            <img
              src={adaptiveIdeationSystemsImg}
              alt={"adaptive-ideation-systems-img"}
            />
          }
          left={<AdaptiveIdeationSystemsText />}
          title={"Adaptive Ideation Systems"}
        />
        <h1 className={style.largeTitle}>Current Projects</h1>
        <TwoColumnContent
          left={
            <img
              src={interactiveConceptValImg}
              alt={"interactive-concept-validation-img"}
            />
          }
          right={<InteractiveConceptValidationText />}
          title={"Interactive Concept Validation"}
        />
        <TwoColumnContent
          right={
            <img src={ideaVisualizationImg} alt={"idea-visualization-img"} />
          }
          left={<IdeaVisualizationText />}
          title={"Idea Visualization"}
        />
        <TwoColumnContent
          left={
            <img
              src={inspirationRecommenderImg}
              alt={"idea-visualization-img"}
            />
          }
          right={<InspirationRecommenderText />}
          title={"Inspiration Recommender"}
        />
        <h1 className={style.largeTitle}>Publications</h1>
        <PublicationList
          publications={[
            {
              authors:
                "Mackeprang, M., Müller-Birn, C., & Stauss, M. T. (2019).",
              title:
                "Discovering the Sweet Spot of Human-Computer Configurations: A Case Study in Information Extraction.",
              link: "arXiv preprint arXiv:1909.07065."
            },
            {
              authors:
                "Mackeprang, M., Khiat, A., Müller-Birn, C., & Computing, H. C. (2019).",
              title:
                "Leveraging General Knowledge Graphs in Crowd-powered Innovation."
            }
          ]}
        />
      </div>
    </div>
  );
};

const PublicationList = props => (
  <div className={style.publicationListWrapper}>
    {props.publications.map(publication => (
      <Publication
        title={publication.title}
        authors={publication.authors}
        place={publication.link}
      />
    ))}
  </div>
);
PublicationList.propTypes = {
  publications: propTypes.arrayOf(
    propTypes.shape({
      authors: propTypes.string.isRequired,
      title: propTypes.string.isRequired,
      place: propTypes.string
    })
  ).isRequired
};

const Publication = props => {
  const { title, authors, place } = props;
  return (
    <div key={title} className={style.publicationWrapper}>
      <b>{authors}</b> <i>{title}</i>
      {place && (
        <>
          <br />
          <p>{place}</p>
        </>
      )}
    </div>
  );
};

const AnalyzingIdeationText = () => (
  <p>
    In order to understand and augment ideation, our first step is to model the
    entity under investigation: Ideas. In their excellent paper "Designing Idea
    Management Tools: Three Challenges", Inie et al. describe that this approach
    falls short because ideas have to be considered in context. This led us to
    our current model, consisting of two topics: The idea itself, as a
    multi-facetted, interconnected entity, and the idea lifecycle, that captures
    the dynamic nature of ideas and their embedding in an ideation process. The
    current state of our model can be viewed on the [model page](/model)..
  </p>
);

const IdeaModelingText = () => (
  <>
    <p>
      What is an idea? When we started this project, we faced this question as
      well, and its probably the most fundamental distinction between different
      modes of [[Idea Management System]]s, ideation processes or research on
      ideation. Within our research, we adopted the following viewpoint:
    </p>
    <i>
      An idea is an RDF Entity defined by a unique identifier. The only required
      property of this entity is its "content": A short full-text description of
      the idea in natural language.
    </i>
    <p>
      This minimalistic approach to ideas is based on the findings of Inie et
      al, that highlight the rigidity of idea representations in existing
      systems, the insights of Westerski et al. who defined a generalized model
      of ideas and lastly, on our own research in large-scale ideation, where
      ideas are commonly described as short English natural language text
      snippets. [Show me an example!](TODO) Furthermore, by defining ideas as
      RDF-Entities, we take into account the dynamic nature of them. RDF as a
      data model allows for the dynamic nature of ideas: Properties and links
      can be added and removed dynamically. In order to reason about ideas, use
      them in an algorithmic system and to link them to their context, more
      properties than just the content are needed. To start out we base our idea
      model on the [Generic Idea and Innovation Management
      Ontology](http://www.gi2mo.org/ontology/), a data schema to describe ideas
      within an [[Idea Management System]]. However, the different aspects of
      ideas seem to be subjective, dynamic and domain-dependent. For example,
      while collecting ideas about products, the target group is an important
      distinction, while when collecting ideas about a birthday present for a
      specific person, it is not. This means, that ideas are categorized
      differently, depending on the domain and usage-context. The question now
      is: Can we somehow create idea categorizations for the changing
      requirements and domain-specificity? Furthermore, properties of the idea
      are probably described within the "content" of an idea. However, the idea
      is full-text. Can we leverage state-of-the-art NLP approaches to construct
      semi-structured representation of ideas, that are useful for downstream
      processes?
    </p>
  </>
);

const IdeaLifecycleText = () => (
  <p>
    Er hörte leise Schritte hinter sich. Das bedeutete nichts Gutes. Wer würde
    ihm schon folgen, spät in der Nacht und dazu noch in dieser engen Gasse
    mitten im übel beleumundeten Hafenviertel? Gerade jetzt, wo er das Ding
    seines Lebens gedreht hatte und mit der Beute verschwinden wollte! Hatte
    einer seiner zahllosen Kollegen dieselbe Idee gehabt, ihn beobachtet und
    abgewartet, um ihn nun um die Früchte seiner Arbeit zu erleichtern? Oder
    gehörten die Schritte hinter ihm zu einem der unzähligen Gesetzeshüter
    dieser Stadt, und die stählerne Acht um seine Handgelenke würde gleich
    zuschnappen? Er konnte die Auff orderung stehen zu bleiben schon hören.
    Gehetzt sah er sich um. Plötzlich erblickte er den schmalen Durchgang.
  </p>
);

const IdeaSpaceVisualizationText = () => (
  <p>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
    diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
    diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet.
  </p>
);

const SessionVisualizationText = () => (
  <p>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
    diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
    diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet.
  </p>
);

const AugmentingIdeationText = () => (
  <p>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
    diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
    diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet.
  </p>
);

const AdaptiveIdeationSystemsText = () => (
  <p>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
    diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
    diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet.
  </p>
);

const InteractiveConceptValidationText = () => (
  <p>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
    diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
    diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet.
  </p>
);

const IdeaVisualizationText = () => (
  <p>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
    diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
    diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet.
  </p>
);

const InspirationRecommenderText = () => (
  <p>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
    diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
    diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet.
  </p>
);
