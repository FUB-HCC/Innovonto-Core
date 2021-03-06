import React, { useRef } from "react";
import style from "./research-view.module.css";
import TwoColumnContent from "../../components/common/two-column-content";
import { useScrollToParagraph } from "../../components/utils";
import { Link } from "react-router-dom";
import ImgWithCaption from "../../components/common/img-with-caption";
import ideaModelingImg from "../../assets/img/idea-vision-visualization.png";
import ideaLifecycleImg from "../../assets/img/idea-lifecycle.png";
import ideaSpaceVisualizationImg from "../../assets/img/vision-idea-map.png";
import ideaVisualizationImg from "../../assets/img/spark-viz.png";
import sessionVizImg1 from "../../assets/img/session-view.png";
import sessionVizImg2 from "../../assets/img/session-tree.png";
import augmentingIdeationImg from "../../assets/img/augmenting-ideation.png";
import adaptiveIdeationSystemsImg from "../../assets/img/adaptive-ideation-systems.png";
import interactiveConceptValImg from "../../assets/img/interactive-concept-validation.png";
import inspirationRecommenderImg from "../../assets/img/idea-recommender.png";
import { bibliography } from "./publications";
import PropTypes from "prop-types";
import { CenteredLayout } from "../../components/common/page-layouts";

export const ResearchView = () => {
  const analyzingIdeationRef = useRef();
  const understandingIdeationRef = useRef();
  const augmentingIdeationRef = useRef();
  useScrollToParagraph([
    ["analyzing-ideation", analyzingIdeationRef],
    ["understanding-ideation", understandingIdeationRef],
    ["augmenting-ideation", augmentingIdeationRef]
  ]);

  return (
    <CenteredLayout pageTitle={"Research"}>
      <div ref={analyzingIdeationRef} />
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
      <h1 ref={understandingIdeationRef} className={style.largeTitle}>
        Understanding Ideation
      </h1>
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
        right={<IdeaVisualizationText />}
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
      <div ref={augmentingIdeationRef} />
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
        left={<SparkVisualizationText />}
        title={"Spark Visualization"}
      />
      <TwoColumnContent
        left={
          <img src={inspirationRecommenderImg} alt={"idea-visualization-img"} />
        }
        right={<InspirationRecommenderText />}
        title={"Inspiration Recommender"}
      />
      <h1 className={style.largeTitle}>Publications</h1>
      <PublicationList publications={bibliography} />
    </CenteredLayout>
  );
};

const buildVenueFrom = entryTags => {
  var result = ", ";
  if (entryTags.booktitle) {
    result += entryTags.booktitle;
  }
  if (entryTags.journal) {
    result += entryTags.journal;
  }
  if (entryTags.number) {
    result += "Technical Report " + entryTags.number;
  }
  return result + ", " + entryTags.year;
};

const PublicationList = props => (
  <div className={style.publicationListWrapper}>
    {props.publications.map(publication => (
      <Publication
        key={publication.citationKey}
        title={publication.entryTags.title}
        authors={publication.entryTags.author}
        venue={buildVenueFrom(publication.entryTags)}
        link={publication.entryTags.url}
      />
    ))}
  </div>
);

PublicationList.propTypes = {
  publications: PropTypes.arrayOf(PropTypes.object).isRequired
};

const parseAuthors = authors =>
  authors
    .split("and")
    .map(author => {
      const regex = / /gi;
      const [lastName, firstName] = author.replace(regex, "").split(",");
      return firstName.slice(0, 1) + ". " + lastName;
    })
    .reduce((output, author, i, arr) => {
      if (i === arr.length - 1 && i !== 0) return output + " and " + author;
      else if (i === 0) return output + author;
      else return output + ", " + author;
    }, "");

const Publication = props => {
  const { title, authors, venue, link } = props;
  var titleTag;
  if (link) {
    titleTag = (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    );
  } else {
    titleTag = <strong>{title}</strong>;
  }
  return (
    <div className={style.publicationWrapper}>
      <em>{parseAuthors(authors)}</em> <br />
      {titleTag}
      {venue && (
        <>
          <span>{venue}</span>
        </>
      )}
    </div>
  );
};

Publication.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.string.isRequired,
  venue: PropTypes.string,
  link: PropTypes.string
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
    current state of our model can be viewed on the{" "}
    <Link to={"/model"}>model page</Link>.
  </p>
);

const IdeaModelingText = () => (
  <>
    <p>
      What is an idea? When we started this project, we faced this question as
      well, and its probably the most fundamental distinction between different
      modes of Idea Management Systems, ideation processes or research on
      ideation. Within our research, we adopted the following viewpoint:
    </p>
    <i>
      An idea is an RDF Entity defined by a unique identifier. The only required
      property of this entity is its "content": A short full-text description of
      the idea in natural language.
    </i>
    <p>
      This minimalistic approach to ideas is based on the findings of Inie et
      al., that highlight the rigidity of idea representations in existing
      systems, the insights of Westerski et al. who defined a generalized model
      of ideas and lastly, on our own research in large-scale ideation, where
      ideas are commonly described as short English natural language text
      snippets (
      <Link to={"/entities/ideas/cf65b021-620f-43fe-9473-1712be788cde"}>
        Show me an example
      </Link>
      ). Furthermore, by defining ideas as RDF-Entities, we take into account
      the dynamic nature of them. RDF as a data model allows for the dynamic
      nature of ideas: Properties and links can be added and removed
      dynamically. In order to reason about ideas, use them in an algorithmic
      system and link them to their context, more properties than just the
      content are needed. To start out we base our idea model on the{" "}
      <a
        href={"http://www.gi2mo.org/ontology/"}
        target="_blank"
        rel="noopener noreferrer"
      >
        Generic Idea and Innovation Management Ontology
      </a>
      . This data schema describes ideas within an Idea Management System.
      However, the different aspects of ideas seem to be subjective, dynamic and
      domain-dependent. For example, while collecting ideas about products, the
      target group is an important distinction, while when collecting ideas
      about a birthday present for a specific person, it is not. This means,
      that ideas are categorized differently, depending on the domain and
      usage-context. The question now is: Can we somehow create idea
      categorizations for the changing requirements and domain-specificity?
      Furthermore, properties of the idea are probably described within the
      "content" of an idea. However, the idea is full-text. Can we leverage
      state-of-the-art NLP approaches to construct semi-structured
      representation of ideas, that are useful for downstream processes?
    </p>
  </>
);

const IdeaLifecycleText = () => (
  <p>
    The second aspects of ideas is that they are living things. Compared to data
    that lies in tables, an idea can evolve, be further developed, or archived.
    Furthermore ideas can be split, merged or branched. Ideation is a process,
    and this process is at least as important then the idea itself. To capture
    this process, we need to visualize relationships between ideas (both ideas
    with similar content, or ideas created in the same brainstorming session),
    and their state of development. Our vision is to have a data model, that
    enables to track an idea, from its first conception, over its multiple
    iterations towards a refined commercialization option. We envision a system
    that enables iteration, splitting and merging ideas and captures this
    process in an analyzable data model.
  </p>
);

const IdeaSpaceVisualizationText = () => (
  <p>
    To understand the opportunity areas of a technology or the topics handled
    within a challenge, we need to define an
    <em>Idea Space</em>: A conceptual space of all ideas captured for a
    challenge together with a spatial relation between them. This space helps to
    understand the output and the thought process within a challenge. An ideal
    software would enable users to create different lenses to analyze and
    compare different aspects of an idea space.
  </p>
);

const IdeaVisualizationText = () => (
  <p>
    Related to the problem of idea space visualization is the challenge of how
    to visualize a single idea. Here, we explore ways of making the existing
    data of an idea understandable in an intuitive way. See the current spark
    visualization project for more details.
  </p>
);

const SessionVisualizationText = () => (
  <p>
    In order to support people in brainstorming tasks, we first need to
    understand the cognitive processes happening, at least on a heuristic level.
    Understanding different strategies of how people come up with new ideas
    based on their surroundings, perception and experiences could lead to
    detecting and actively encouraging the currently selected problem solving
    strategy or proactively triggering a strategy change when the current one
    fails. When an idea is submitted in a context of a brainstorming session, we
    can track what else happened in this session, on a tracking event level. One
    way to understand these processes is by visualizing the session data
    obtained in challenges: For example, by visualizing idea submits and
    inspiration requests on a <em>Session Timeline</em> we can better understand
    the impact that inspirations have on subsequent ideas. Furthermore,{" "}
    <em>Session Trees</em> have been used to understand the number of categories
    and the within category iteraation of ideas for one session.
  </p>
);

const AugmentingIdeationText = () => (
  <p>
    While analyzing ideation processes is an important step, we don't want to
    stop there. Our research project investigates ways of{" "}
    <em>heuristically improving ideation processes</em> for an individual user.
    Furthermore, we are working towards a model of inspiration recommendation,
    that takes into account different perspectives on ideation to provide the
    best suited inspiration for a given user, user state, available inspiration
    items and context.
  </p>
);

const AdaptiveIdeationSystemsText = () => (
  <p>
    When switching from an individual to a collective perspective, we see that
    when conducting large scale ideation, the goal is often to contain{" "}
    <em>heterogeneous ideas</em> covering a breadth of topics and approaches for
    a given challenge. Our vision is to provide a system, that computationally
    clusters existing efforts of a crowd and takes them into account in
    inspiration recommendation, in order to maximize heterogeneity of an idea
    space.
  </p>
);

const InteractiveConceptValidationText = () => (
  <div>
    <p>
      A key feature in augmenting large scale ideation is in understanding the
      ideas. General Knowledge Graphs describe the meaning of domain-independent
      terms in an computationally understandable way and therefore represent a
      promising solution in obtaining such meaning. We believe knowledge graphs
      offer a promising solution to (1) extract structured information about the
      content of ideas and (2) aid ideation experts during the further
      processing of result ideas by providing multi-faceted visualization of the
      ideation outcome.
    </p>
    <p>
      An idea describing modification of a door and another describing wall
      painting, for example, could be connected by the concept of{" "}
      <em>architecture</em>. Thus, as opposed to statistical methods that are
      based on explicit relationships, knowledge graphs allow for identifying
      implicit, more subtle relationships. This potential of annotating ideas
      motivated the development of our{" "}
      <strong>Interactive Concept Validation (ICV)</strong> technique, which can
      be integrated into traditional ideation processes. After submitting an
      idea, a person is asked to annotate the idea manually based on concepts
      obtained from a knowledge graph. This tool consists of an interactive
      component, since we ask a person for its annotations and an intelligent
      component, because the provision of the annotations uses AI technologies.
    </p>
    <p>
      By linking terms in ideas to knowledge graph concepts, the approach
      enables this meaning to be used as an analysis approach. As a first
      exploration of a potential application in sense-making of ideation
      outcomes, we developed an interactive visualisation prototype. In this
      artifact, users can import ideas and visualize them in a grid. The users
      then can interactively select markers for concepts used in the ideas to
      visualize patterns within the ideation outcome.
    </p>
  </div>
);

const SparkVisualizationText = () => (
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
  <div>
    <p>
      In large scale ideation, the strategic provision of inspiration provides
      an established benefit for ideation challenges. However, there is no
      common framework to relate and categorize inspiration deployment. One
      framing for the problem of inspiration provision could be{" "}
      <em>recommender systems</em>. Formulated as a recommender problem, the
      question of inspiration systems in large scale ideation becomes:
    </p>
    <i>
      We recommend inspiration item tos the user, in order to maximize a set of
      metrics.
    </i>
    <p>
      We are currently researching how to link the current state of mind of a
      participant (state) with more durable characteristics such as personality
      traits (traits) and how to transfer this information into an integrated
      model for inspiration suggestions.
    </p>
  </div>
);
