import style from "./about-view.module.css";
import React, { useRef } from "react";
import { useScrollToParagraph } from "../../components/utils";

export const AboutView = () => {
  const imprintRef = useRef();
  const privacyPolicyRef = useRef();
  useScrollToParagraph([
    ["imprint", imprintRef],
    ["privacy-policy", privacyPolicyRef]
  ]);
  return (
    <div className={style.aboutViewWrapper}>
      <div className={style.aboutViewContent}>
        <h1 className={style.largeTitle}>Acknowledgements</h1>
        <AcknowledgementsText />
        <AcknowledgementsText />
        <AcknowledgementsText />
        <AcknowledgementsText />
        <h1 ref={imprintRef} className={style.largeTitle}>
          Imprint
        </h1>
        <ImprintText />
        <ImprintText />
        <ImprintText />
        <ImprintText />
        <ImprintText />
        <h1 ref={privacyPolicyRef} className={style.largeTitle}>
          Privacy Policy
        </h1>
        <PrivacyPolicyText />
        <PrivacyPolicyText />
        <PrivacyPolicyText />
        <PrivacyPolicyText />
        <PrivacyPolicyText />
        <PrivacyPolicyText />
        <PrivacyPolicyText />
        <PrivacyPolicyText />
        <PrivacyPolicyText />
        <PrivacyPolicyText />
      </div>
    </div>
  );
};

const AcknowledgementsText = () => (
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
    amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
    molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros
    et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril
    delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit
    amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
    ut laoreet dolore magna aliquam erat volutpat.
  </p>
);

const ImprintText = () => (
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
    amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
    molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros
    et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril
    delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit
    amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
    ut laoreet dolore magna aliquam erat volutpat.
  </p>
);

const PrivacyPolicyText = () => (
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
    amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
    molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros
    et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril
    delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit
    amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
    ut laoreet dolore magna aliquam erat volutpat.
  </p>
);
