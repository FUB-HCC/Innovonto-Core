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
        <h1 ref={privacyPolicyRef} className={style.largeTitle}>
          Privacy Policy
        </h1>
        <PrivacyPolicyText />
      </div>
    </div>
  );
};

const AcknowledgementsText = () => (
  <p>
    Lorem ipsum dolor sit amet, consetetur sadsipscing elitr, sed diam nonumy
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
  <div>
    <div className="section">
      <h3>Imprint according to § 5 Telemediengesetz (TMG)</h3>
      <p>
        Institution: Freie Universität Berlin - represented by the{" "}
        <a href="http://www.fu-berlin.de/einrichtungen/praesidium/praesident.html">
          President
        </a>
      </p>
      <p>
        Address: Fachbereich Mathematik und Informatik, Arnimallee 14, 14195
        Berlin
      </p>
      <p>
        Contact:{" "}
        <a href="https://www.mi.fu-berlin.de/en/inf/groups/hcc/contact/index.html">
          Human-Centered Computing Workgroup
        </a>
      </p>
      <p>
        Legal form: Die Freie Universität Berlin ist eine Körperschaft des
        öffentlichen Rechts gem. §§ 1 und 2 Berliner Hochschulgesetz (BerlHG)
      </p>
      <p>UST-Id: DE 811304768</p>
    </div>
    <div className="section">
      <h3 className="title">Haftungshinweis:</h3>
      <div className="content">
        <p>
          Wir übernehmen keine Haftung für die Inhalte externer Links. Für den
          Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber
          verantwortlich.
        </p>
        <p>
          Wir sind bemüht, das Webangebot stets aktuell und inhaltlich richtig
          sowie vollständig anzubieten. Dennoch ist das Auftreten von Fehlern
          nicht völlig auszuschließen. Das Fraunhofer-Institut bzw. die
          Fraunhofer-Gesellschaft übernimmt keine Haftung für die Aktualität,
          die inhaltliche Richtigkeit sowie für die Vollständigkeit der in ihrem
          Webangebot eingestellten Informationen. Dies bezieht sich auf
          eventuelle Schäden materieller oder ideeller Art Dritter, die durch
          die Nutzung dieses Webangebotes verursacht wurden.
        </p>
        <p>
          Geschützte Marken und Namen, Bilder und Texte werden auf unseren
          Seiten in der Regel nicht als solche kenntlich gemacht. Das Fehlen
          einer solchen Kennzeichnung bedeutet jedoch nicht, dass es sich um
          einen freien Namen, ein freies Bild oder einen freien Text im Sinne
          des Markenzeichenrechts handelt.
        </p>
      </div>
    </div>
  </div>
);

const PrivacyPolicyText = () => (
  <div>
    <div className="section">
      <h2 className={"title is-3"}>
        Responsible Body in Terms of the EU General Data Protection Regulation
        (GDPR):
      </h2>
      <div>
        <p>Institute of Computer Science,</p>
        <p>
          <a href="https://www.mi.fu-berlin.de/en/inf/groups/hcc/index.html">
            Workgroup Human-Centered Computing (HCC)
          </a>
        </p>
        <p>Freie Universität Berlin</p>
      </div>
      <div>
        <p>Email: i2m@zedat.fu-berlin.de</p>
        <p>Telefon: +49 (0) 30 838-63171/+49 (0) 30 838-63171</p>
        <p>Fax: +49 (0) 30 838-75220</p>
      </div>
    </div>
    <div className="section">
      <h5 className={"title is-5"}>Contact</h5>
      <p>Chief Data Protection Officer of Freie Universität</p>
      <p>N.N., Email: datenschutz@fu-berlin.de</p>
      <p>Deputy Data Protection Officer of Freie Universität</p>
      <p>Andreas Hübinger, Email: andreas.huebinger@fu-berlin.de</p>
      <h5 className={"title is-5"}>Who collects information?</h5>
      <p>
        The information processed as explained above (see points 1 and 2) is
        electronically collected and used by Freie Universität Berlin. The
        information is not disclosed to third parties or used outside of Freie
        Universität Berlin, unless you have given us your consent to do so or we
        are required or authorized by law to do so (for example, in relation to
        law enforcement, presumed plagiarism, or other copyright infringements).
      </p>

      <h5 className={"title is-5"}>
        Viewing the website innovonto-core.imp.fu-berlin.de
      </h5>
      <p>
        When you view the web pages of the above-named website or one of its
        subdomains, a log file is automatically created and stored on the
        server. Such files contain the web page you visited, the previous
        website you visited just before ours (in case it was a search engine,
        also the terms entered), date, time, the operating system you are using,
        features of the display (resolution in pixels and the so-called
        pixel-ratio for the detection of high-resolution displays), and the
        browser you are using (Internet Explorer, Firefox, Opera, etc.).
        Additionally, the size of the transferred data amount, a so-called HTTP
        status code (for example to identify a successfully transmitted web
        page), and the IP address of your computer (e.g., PC or smartphone) –
        whereby the IP address is immediately anonymized through deletion of the
        last octet of the address – are also stored. The collection and use of
        information stored in the log file is only for anonymous evaluation for
        statistical purposes (for example, an analysis of user behavior, which
        pages of the website or subdomain are accessed, which browsers are used,
        etc.) and thereby to improve our services. A mapping of IP address to
        the user ID does not occur. It is not possible to trace the analysis
        results to a specific IP address.
      </p>

      <h5 className={"title is-5"}>Cookies</h5>
      <p>
        Like other organizations, we use so-called cookies. Cookies are small
        files that are stored in special filed directories on your computer
        (unless you block them). Information about your visit to our website can
        be stored in cookies. Our cookies do not contain personal data (such as
        IP addresses or login data), but rather only anonymous session IDs. Some
        of the cookies we use will remain on your computer so that our web
        server can recognize your computer the next time you visit. Most
        browsers (Internet Explorer, Firefox, Opera, etc.) are set by default to
        accept cookies. You can set your browser to reject cookies or request a
        confirmation from you. However, if you disable or reject cookies, it is
        possible that you will not be able to use certain features of the
        website. The legal basis for the processing of personal data using
        cookies is Article 6 (1) of the General Data Protection Regulation
        (GDPR).
      </p>

      <h5 className={"title is-5"}>Rights of Individuals</h5>
      <p>
        If you provide us with personal information (e.g., via web forms), you
        will as a rule find contact details on the same page where you can at no
        charge request information regarding which of your personal data are
        stored on our system. At your request, the information can also be
        provided electronically. You have the right to ask the person
        responsible for confirmation of whether your personal data have been
        processed. If this is the case, you have a right of access to such
        personal data and to the information specified in Article 15 of the
        General Data Protection Regulation (GDPR). You have the right to demand
        from the person responsible the immediate correction of incorrect and
        personal data concerning you and, if necessary, the completion of
        incomplete personal data (Article 16 of the General Data Protection
        Regulation). You have the right to request the person responsible to
        delete your personal data without delay, provided one of the reasons
        detailed in Article 17 of the General Data Protection Regulation applies
        (right to erasure). The person responsible will then no longer process
        the personal data unless he/she can prove compelling legitimate grounds
        for processing that outweigh the interests, rights, and freedoms of the
        individual concerned. You have the right, at any time, to object to the
        processing of your personal data for reasons arising from your
        particular situation. In such cases, personal data may only be processed
        if there are compelling legitimate reasons for the processing that
        outweigh your interests, rights, and freedoms, or if the processing
        serves the assertion, exercise, or defense of legal claims (Article 21
        of the General Data Protection Regulation, GDPR). You have the right to
        revoke your data protection consent at any time. The revocation of
        consent does not affect the legality of the processing carried out on
        the basis of the consent until the revocation.
      </p>
      <h5 className={"title is-5"}>Changes to this privacy policy</h5>
      <p>
        Given the constantly occurring changes on the Internet, especially with
        regard to technology and also the relevant legislation, we reserve the
        right to amend our privacy policy from time to time, if needed. Such
        adjustments to our privacy policy will be posted on this page with an
        advance notice of two weeks, provided that the circumstances requiring
        the change permit this timeframe.
      </p>
    </div>
  </div>
);
