import bibtexParse from "bibtex-parse-js";

const referencesBib =
  "@inproceedings{breitenfeld_enabling_2018,\n" +
  "    author = {Breitenfeld, André and Mackeprang, Maximilian and Hong, Ming-Tung and Müller-Birn, Claudia},\n" +
  "    title = {Enabling Structured Data Generation by Nontechnical Experts},\n" +
  "    booktitle = {Mensch und Computer 2017 - Tagungsband: Spielend einfach interagieren},\n" +
  "    year = {2018},\n" +
  "    editor = {Burghardt, Manuel and Wimmer, Raphael and Wolff, Christian and Womser-Hacker, Christa},\n" +
  "    volume = {17},\n" +
  "    series = {Digitale Bibliothek der Gesellschaft für Informatik},\n" +
  "    pages = {181--192},\n" +
  "    address = {Regensburg},\n" +
  "    publisher = {Gesellschaft für Informatik e.V.},\n" +
  "    doi = {10.18420/muc2017-mci-0231},\n" +
  "    url = {https://dl.gi.de/handle/20.500.12116/3264},\n" +
  "    language = {Englisch},\n" +
  "    keywords = {I2M}\n" +
  "}\n" +
  "\n" +
  "@inproceedings{khiat_i-match_2017,\n" +
  "    author = {Khiat, Abderrahmane and Mackeprang, Maximilian},\n" +
  "    title = {I-Match and OntoIdea results for OAEI 2017},\n" +
  "    booktitle = {Proceedings of the 12th International Workshop on Ontology Matching co-located with the 16th International Semantic Web Conference (ISWC 2017)},\n" +
  "    year = {2017},\n" +
  "    editor = {Shvaiko, Pavel and Euzenat, J{\\'{e}}r{\\^{o}}me and Jim{\\'{e}}nez{-}Ruiz, Ernesto and Cheatham, Michelle and Hassanzadeh, Oktie},\n" +
  "    volume = {2032},\n" +
  "    series = {CEUR Workshop Proceedings},\n" +
  "    pages = {135--137},\n" +
  "    address = {Wien},\n" +
  "    publisher = {CEUR-WS.org},\n" +
  "    url = {http://ceur-ws.org/Vol-2032/oaei17_paper4.pdf},\n" +
  "    language = {Englisch},\n" +
  "    keywords = {I2M}\n" +
  "}\n" +
  "\n" +
  "@inproceedings{khiat_semantic_2017,\n" +
  "    author = {Khiat, Abderrahmane and Mackeprang, Maximilian and Müller-Birn, Claudia},\n" +
  "    title = {Semantic Annotation for Enhancing Collaborative Ideation},\n" +
  "\turl = {https://dl.acm.org/doi/abs/10.1145/3132218.3132235},\n" +
  "    booktitle = {Proceedings of the 13th International Conference on Semantic Systems},\n" +
  "    year = {2017},\n" +
  "    series = {Semantics2017},\n" +
  "    pages = {173--176},\n" +
  "    address = {New York, NY},\n" +
  "    publisher = {ACM},\n" +
  "    doi = {10.1145/3132218.3132235},\n" +
  "    language = {Englisch},\n" +
  "    keywords = {I2M}\n" +
  "}\n" +
  "\n" +
  "@inproceedings{mackeprang_concept_2018,\n" +
  "    author = {Mackeprang, Maximilian and Khiat, Abderrahmane and Müller-Birn, Claudia},\n" +
  "    title = {Concept Validation during Collaborative Ideation and Its Effect on Ideation Outcome},\n" +
  "\turl = {https://dl.acm.org/doi/abs/10.1145/3170427.3188485},\n" +
  "    booktitle = {Extended Abstracts of the 2018 CHI Conference on Human Factors in Computing Systems},\n" +
  "    year = {2018},\n" +
  "    series = {CHI EA '18},\n" +
  "    pages = {LBW033:1--LBW033:6},\n" +
  "    publisher = {ACM},\n" +
  "    doi = {10.1145/3170427.3188485},\n" +
  "    language = {Englisch},\n" +
  "    keywords = {I2M}\n" +
  "}\n" +
  "\n" +
  "@techreport{khiat_innovonto_2018,\n" +
  "\tauthor = {Khiat, Abderrahmane and Mackeprang, Maximilian and Müller-Birn, Claudia}," +
  "\ttitle = {Innovonto: An Enhanced Crowd Ideation Platform with Semantic Annotation (Hallway Test)},\n" +
  "\tinstitution = {Freie Universität Berlin},\n" +
  "\ttype = {Technical {Report}},\n" +
  "\tnumber = {TR-B-18-02},\n" +
  "\taddress = {Berlin},\n" +
  "\tdoi = {http://dx.doi.org/10.17169/refubium-25213},\n" +
  "\turl = {https://refubium.fu-berlin.de/handle/fub188/21996},\n" +
  "\tyear = {2018},\n" +
  "\tkeywords = {I2M}\n" +
  "}\n" +
  "\n" +
  "@inproceedings{mackeprang_kaleidoscope_2018,\n" +
  "  title={Kaleidoscope: An RDF-based Exploratory Data Analysis Tool for Ideation Outcomes},\n" +
  "url = {https://dl.acm.org/doi/abs/10.1145/3266037.3266106},\n" +
  "  author={Mackeprang, Maximilian and Strama, Johann and Schneider, Gerold and Kuhnz, Philipp and Benjamin, Jesse Josua and Müller-Birn, Claudia},\n" +
  "  booktitle={The 31st Annual ACM Symposium on User Interface Software and Technology Adjunct Proceedings},\n" +
  "  pages={75--77},\n" +
  "  year={2018}\n" +
  "}\n" +
  "\n" +
  "%% 2019\n" +
  "@techreport{mackeprang_impact_2019,\n" +
  " address = {Berlin},\n" +
  " type = {Technical {Report}},\n" +
  " title = {The Impact of Concept Representation in Interactive Concept Validation (ICV)},\n" +
  " url = {http://dx.doi.org/10.17169/refubium-3971},\n" +
  " number = {TR-B-19-03},\n" +
  " institution = {Freie Universität Berlin},\n" +
  " author = {Mackeprang, Maximilian and Khiat, Abderrahmane and Stauss, Maximilian and Müller, Tjark Sascha and Müller-Birn, Claudia},\n" +
  " year = {2019},\n" +
  " keywords = {I2M}\n" +
  "}\n" +
  "\n" +
  "@inproceedings{mackeprang_understanding_2019,\n" +
  "\tauthor = {Mackeprang, Maximilian},\n" +
  "\ttitle = {Understanding and Augmenting Ideation Processes},\n" +
  "url = {https://dl.acm.org/doi/abs/10.1145/3325480.3326563},\n" +
  "\tbooktitle = {Proceedings of the 2019 ACM Conference on Creativity and Cognition},\n" +
  "\tyear = {2019},\n" +
  "\tpages = {640--645},\n" +
  "\taddress = {New York, NY, USA},\n" +
  "\tpublisher = {Association for Computing Machinery},\n" +
  "\tdoi = {10.1145/3325480.3326563},\n" +
  "\tlanguage = {English},\n" +
  "\tkeywords = {I2M}\n" +
  "}\n" +
  "\n" +
  "\n" +
  "@article{mackeprang_sweetspot_2019,\n" +
  "author = {Mackeprang, Maximilian and Müller-Birn, Claudia and Stauss, Maximilian},\n" +
  "year = {2019},\n" +
  "month = {11},\n" +
  "pages = {1-30},\n" +
  "title = {Discovering the Sweet Spot of Human-Computer Configurations: A Case Study in Information Extraction},\n" +
  "volume = {3},\n" +
  "journal = {Proceedings of the ACM on Human-Computer Interaction},\n" +
  "url = {https://dl.acm.org/doi/abs/10.1145/3359297},\n" +
  "doi = {10.1145/3359297}\n" +
  "}";

export const bibliography = bibtexParse.toJSON(referencesBib);
