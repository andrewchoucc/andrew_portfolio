import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, 
  GraduationCap, 
  Award, 
  BookOpen, 
  Microscope, 
  Linkedin, 
  ExternalLink, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronUp,
  User,
  Activity,
  Cpu,
  Hospital
} from 'lucide-react';

// --- Data Constants ---

const SPECIALTIES = [
  { title: "Paediatric Orthopaedics", icon: <User className="w-6 h-6" />, desc: "Comprehensive care for musculoskeletal conditions in children." },
  { title: "Hip Preservation", icon: <Activity className="w-6 h-6" />, desc: "Developmental Dysplasia of the Hip (DDH) and adolescent hip conditions." },
  { title: "Limb Deformities", icon: <Hospital className="w-6 h-6" />, desc: "Limb Length Discrepancy (LLD) and complex limb reconstruction." },
  { title: "Sports Injuries", icon: <Activity className="w-6 h-6" />, desc: "Paediatric sports surgery and trauma management." }
];

const EDUCATION = [
  { year: "2023", title: "FRCS (Trauma & Orthopaedics)", org: "The Royal College of Surgeons of Edinburgh" },
  { year: "2022", title: "MMed (Orthopaedic Surgery)", org: "National University of Singapore" },
  { year: "2020", title: "MFST", org: "The Royal College of Surgeons of Edinburgh" },
  { year: "2018", title: "Singapore-Stanford Biodesign Fellowship", org: "Stanford University" },
  { year: "2017", title: "MRCS", org: "The Royal College of Surgeons of Edinburgh" },
  { year: "MD", title: "Doctor of Medicine", org: "Duke-NUS Medical School" },
  { year: "BS", title: "Biochemical Engineering", org: "Stanford University" }
];

const APPOINTMENTS = [
  { role: "Consultant", org: "KK Women's and Children's Hospital", period: "Current" },
  { role: "Clinical Assistant Professor", org: "Duke-NUS Medical School", period: "Current" },
  { role: "Clinical Senior Lecturer", org: "NUS Yong Loo Lin School of Medicine", period: "Current" },
  { role: "Adjunct Lecturer", org: "NTU Lee Kong Chian School of Medicine", period: "Current" },
  { role: "Director", org: "Duke Innovate, Duke-NUS Medical School", period: "2018 - Present" },
  { role: "Member", org: "Asia Pacific Paediatric Orthopaedic Society", period: "2024 - Present" }
];

const AWARDS = [
  "Asia Pacific Paediatric Orthopaedic Society Travelling Fellowship, 2025",
  "Singapore Health Quality Improvement Award - Seamless Ward Initiative, 2024",
  "N Balachandran Memorial Lectureship, Singapore Orthopaedic Association, 2022",
  "Outstanding Resident, SingHealth RiSE Awards 2020",
  "Best Education Research Poster, SingHealth Duke-NUS Education Conference 2019"
];

const TRIALS = [
  "Randomized controlled trial: 4D printed casts vs fiberglass casts for fracture healing",
  "Automated, AI-powered clinical outcomes registry for paediatric orthopaedics",
  "Generative AI chatbots for parental questions on paediatric orthopaedic conditions",
  "Computer algorithm for automatic measurement of Cobb angle from Scoliosis x-rays"
];

const PUBLICATIONS = [
  { title: "Chou, A. C. C., Wong, T. H., Pek, J. H., Lau, C. L., Tang, C. W., & Low, C. O. (2018). Charlson comorbidity index predicts 5-year survivorship of surgically treated hip fracture patients. Injury, 49(9), 1513-1516.", link: "https://pubmed.ncbi.nlm.nih.gov/30479849/" },
  { title: "Chou, A. C. C., & Mahadev, A. (2015). The use of C-reactive protein as a guide for transitioning to oral antibiotics in pediatric osteoarticular infections. Journal of Pediatric Orthopaedics, 35(2), 173-178.", link: "https://pubmed.ncbi.nlm.nih.gov/25929777/" },
  { title: "Chou, A. C. C., Wong, T. H., Pek, J. H., & Lau, C. L. (2015). Comparison of patient quality of life scores and satisfaction after common orthopedic surgical interventions. Journal of Orthopaedic Surgery, 23(2), 155-159.", link: "https://pubmed.ncbi.nlm.nih.gov/25893611/" },
  { title: "Chou, A. C. C., & Lie, D. T. T. (2015). Endoscopic plantar fasciotomy improves early postoperative results: A retrospective comparison of outcomes after endoscopic versus open plantar fasciotomy. The Journal of Foot and Ankle Surgery, 54(4), 571-576.", link: "https://pubmed.ncbi.nlm.nih.gov/26007627/" },
  { title: "Chou, A. C. C., Loh, L. L., Chen, Q., Wong, L., & Lee, H. K. (2011). Overexpression of κ-actin alters growth properties of hepatoma cells and predicts poor postoperative prognosis. Cancer Letters, 305(2), 190-199.", link: "https://pubmed.ncbi.nlm.nih.gov/21737620/" },
  { title: "Dmytriw, A. A., Chou, A. C. C., et al. (2021). Outcomes of acute respiratory distress syndrome in COVID-19 patients compared to the general population: A systematic review and meta-analysis. Expert Review of Respiratory Medicine, 15(9), 1143-1151." },
  { title: "Chou, A. C. C., & Lie, D. T. T. (2016). Radiofrequency microtenotomy is as effective as plantar fasciotomy in the treatment of recalcitrant plantar fasciitis. Foot & Ankle Specialist, 9(6), 519-525.", link: "https://pubmed.ncbi.nlm.nih.gov/27810027/" },
  { title: "Chou, A. C. C., & Lie, D. T. T. (2017). Endoscopic plantar fasciotomy vs open radiofrequency microtenotomy for recalcitrant plantar fasciitis. Foot & Ankle International, 38(12), 1316-1322.", link: "https://pubmed.ncbi.nlm.nih.gov/29182482/" },
  { title: "Chou, A. C. C., & Mahadev, A. (2016). Acute bacterial osteomyelitis in children. Journal of Orthopaedic Surgery, 24(3), 336-341." },
  { title: "Chou, A. C. C., Yeo, N. E. M., Mahadev, A., & Koh, J. S. B. (2015). Bone cross-sectional geometry is not associated with atypical femoral fractures in Asian female chronic bisphosphonate users. Osteoporosis International, 26(7), 2041-2046.", link: "https://pubmed.ncbi.nlm.nih.gov/26067179/" },
  { title: "Foo, W. Y. X., Chou, A. C. C., et al. (2022). Computer-assisted navigation in ACL reconstruction improves anatomic tunnel placement with similar clinical outcomes. The Knee, 29, 123-131." },
  { title: "Chou, A. C. C., Wong, T. H., & Pek, J. H. (2019). Predictors for rehabilitation outcome in Asian geriatric hip fracture patients. Annals of the Academy of Medicine, Singapore, 48(5), 156-162." },
  { title: "Chen, P. P. Y., & Chou, A. C. C. (2021). Teaching health care innovation to medical students. The Clinical Teacher, 18(2), 123-127.", link: "https://pubmed.ncbi.nlm.nih.gov/33494118/" },
  { title: "Chou, A. C. C., & Lie, D. T. T. (2020). Clinical outcomes of an all-arthroscopic technique for single-stage autologous matrix-induced chondrogenesis in the treatment of articular cartilage lesions of the knee. Arthroscopy, Sports Medicine, and Rehabilitation, 2(5), e597-e603.", link: "https://pubmed.ncbi.nlm.nih.gov/32875300/" },
  { title: "Chou, A. C. C., Wong, T. H., Pek, J. H., & Lau, C. L. (2018). Are patients more satisfied and have better functional outcome after bilateral total knee arthroplasty as compared to total hip arthroplasty and unilateral total knee arthroplasty? Journal of Arthroplasty, 33(8), 2549-2554." },
  { title: "Lie, D. T. T., & Chou, A. C. C. (2020). How to handle minor and major bone loss in the shoulder? Current concepts. Shoulder & Elbow, 12(1), 45-54." },
  { title: "Chou, A. C. C., Wong, T. H., Pek, J. H., Tang, C. W., & Low, C. O. (2018). End-stage renal failure is an independent risk factor for 1-year mortality after hip fracture surgery. Injury, 49(6), 1161-1165.", link: "https://pubmed.ncbi.nlm.nih.gov/29707413/" },
  { title: "Chou, A. C. C., Mahadev, A., & Lim, K. B. L. (2019). Using the medial and lateral humeral lines as an adjunct to intraoperative elbow arthrography to guide intraoperative reduction and fixation of distal humerus physeal injuries. Journal of Pediatric Orthopaedics, 39(4), e289-e293." },
  { title: "Huang, D. M., Chou, A. C., et al. (2018). Radiofrequency microtenotomy with concurrent gastrocnemius recession improves postoperative vitality scores in the treatment of recalcitrant plantar fasciitis. Annals of the Academy of Medicine, Singapore, 47(10), 381-387." },
  { title: "Chou, A. C. C., Tan, H. C., & Mahadev, A. (2020). The impact of coronavirus disease 2019 (COVID-19) on orthopaedic practice: Perspectives from Asia-Pacific. British Orthopaedic Association Journal.", link: "https://www.boa.ac.uk/resource/the-impact-of-coronavirus-disease-2019-covid-19-on-orthopaedic-practice-perspectives-from-asia-pacific.html" },
  { title: "Lim, D. G., Chou, A. C., et al. (2022). Delayed surgery, low presurgery activity, and poor preoperative IKDC scores are correlated with lower rates of return to sports after ACL reconstruction in an Asian population. The Journal of Knee Surgery, 35(10), 1089-1096." },
  { title: "Chou, A. C. C., et al. (2021). Arthroscopic repair is sufficient for treating recurrent shoulder instability in patients with bipolar bone defects and minor glenoid bone loss. Journal of Orthopaedics, 25, 123-129." },
  { title: "Chou, A., et al. (2022). Displaced paediatric distal radius fractures with volar skin tenting following manipulation and reduction: A report of two cases and literature review. Journal of Orthopaedic Experience & Innovation, 3(2), 45-51." },
  { title: "Chou, A., & Lie, D. (2020). A technique using a low-cost, accessible cannula to aid scaffold passage in dry arthroscopic cartilage repair in the knee. Arthroscopy Techniques, 9(4), e483-e487.", link: "https://pubmed.ncbi.nlm.nih.gov/32251595/" },
  { title: "Chen, P. P. Y., Chou, A. C. C., et al. (2021). Introducing healthcare innovation concepts during medical education improves graduate medical student self-awareness regarding design thinking concepts. BMC Medical Education, 21(1), 234." },
  { title: "Ng, F. D. J., Chou, A. C. C., et al. (2023). Assessing the training effect of knee arthroscopy cognitive-task surgical simulations on the theoretical and technical knowledge acquisition in novices. Journal of Orthopaedic Experience & Innovation, 4(1), 12-19." },
  { title: "Lie, D. T. T., Foo, W. Y. X, & Chou, A. C. C. (2023). Shoulder arthroplasty and instability. In K. Masrouha (Ed.), Pediatric Engineering: Pediatric Orthopedics. Springer." },
  { title: "Lie, D. T., & Chou, A. C. (2022). Approach to glenoid bone loss arthroscopic remplissage procedure using TransTend anchor system. In Shoulder Arthroscopy Techniques (pp. 145-152). Springer." },
  { title: "Lie, D. T., Lim, C. Y., Chou, A. C., & Puah, K. L. (2021). Special techniques in evaluation of the failed rotator cuff. In Current Concepts in Rotator Cuff Surgery (pp. 89-98). Springer." },
  { title: "Chou, A. C. C., & Masrouha, K. (2023). Surgery & surgical procedures. In K. Masrouha (Ed.), Pediatric Engineering: Pediatric Orthopedics. Springer." },
  { title: "Chen, P. P. Y., Chou, A. C. C., et al. (2020). Evaluating student-led medical foreign language courses: A preliminary study. Medical Education Online, 25(1), 1756342." },
  { title: "Chou, A. C. C., Yeo, N. E. M., Mahadev, A., & Koh, J. S. B. (2016). Hip structural analysis of atypical femoral fractures in bisphosphonate treated women. Osteoporosis International, 27(3), 1245-1251.", link: "https://www.researchgate.net/publication/296053079_HIP_STRUCTURAL_ANALYSIS_OF_ATYPICAL_FEMORAL_FRACTURES_IN_BISPHOSPHONATE_TREATED_WOMEN" }
];

// --- Components ---

const NavLink = ({ href, label, active, onClick }) => (
  <a 
    href={href}
    onClick={(e) => {
      e.preventDefault();
      onClick(href);
    }}
    className={`px-4 py-2 text-sm font-medium transition-colors ${
      active 
      ? 'text-blue-700 bg-blue-50 rounded-md' 
      : 'text-slate-600 hover:text-blue-600'
    }`}
  >
    {label}
  </a>
);

const SectionTitle = ({ children, icon }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
      {icon}
    </div>
    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{children}</h2>
  </div>
);

const Card = ({ title, children, className = "" }) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow ${className}`}>
    {title && <h3 className="text-lg font-semibold text-slate-800 mb-3">{title}</h3>}
    {children}
  </div>
);

const TimelineItem = ({ year, title, org }) => (
  <div className="relative pl-8 pb-8 last:pb-0 border-l-2 border-blue-100 last:border-0">
    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm"></div>
    <span className="text-sm font-bold text-blue-600">{year}</span>
    <h4 className="text-lg font-semibold text-slate-900 mt-1">{title}</h4>
    <p className="text-slate-600 text-sm">{org}</p>
  </div>
);

const PubList = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const displayedItems = isOpen ? items : items.slice(0, 5);

  return (
    <div className="mb-6">
      <ul className="space-y-3">
        {displayedItems.map((pub, idx) => (
          <li key={idx} className="text-sm text-slate-600 pl-4 border-l-2 border-slate-200 hover:border-blue-400 transition-colors">
            {pub.link ? (
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors flex items-start gap-2 group"
              >
                <span className="flex-1">{pub.title}</span>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600 flex-shrink-0 mt-0.5" />
              </a>
            ) : (
              <span>{pub.title}</span>
            )}
          </li>
        ))}
      </ul>
      {items.length > 5 && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          {isOpen ? <>Show Less <ChevronUp className="w-3 h-3" /></> : <>Show All ({items.length}) <ChevronDown className="w-3 h-3" /></>}
        </button>
      )}
    </div>
  );
};

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('#home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex flex-col justify-center" onClick={() => scrollTo('#home')}>
              <span className="text-xl font-bold text-slate-900 cursor-pointer">Clin Asst Prof Andrew Chou</span>
              <span className="text-xs text-blue-600 font-medium hidden sm:block">Consultant Orthopaedic Surgeon</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-2">
              <NavLink href="#about" label="About" active={activeSection === '#about'} onClick={scrollTo} />
              <NavLink href="#clinical" label="Clinical" active={activeSection === '#clinical'} onClick={scrollTo} />
              <NavLink href="#research" label="Research & Innovation" active={activeSection === '#research'} onClick={scrollTo} />
              <NavLink href="#credentials" label="Credentials" active={activeSection === '#credentials'} onClick={scrollTo} />
              <NavLink href="#publications" label="Publications" active={activeSection === '#publications'} onClick={scrollTo} />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600">
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-2 space-y-1 shadow-lg">
             <a href="#about" onClick={() => scrollTo('#about')} className="block py-2 text-slate-600">About</a>
             <a href="#clinical" onClick={() => scrollTo('#clinical')} className="block py-2 text-slate-600">Clinical</a>
             <a href="#research" onClick={() => scrollTo('#research')} className="block py-2 text-slate-600">Research</a>
             <a href="#credentials" onClick={() => scrollTo('#credentials')} className="block py-2 text-slate-600">Credentials</a>
             <a href="#publications" onClick={() => scrollTo('#publications')} className="block py-2 text-slate-600">Publications</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-slate-100 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
              <Stethoscope className="w-4 h-4 mr-2" /> Orthopaedics & Innovation
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
              Surgeon. <br />
              <span className="text-blue-600">Innovator.</span> <br />
              Educator.
            </h1>
            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
              Specializing in paediatric orthopaedics, hip preservation, and limb reconstruction. 
              Dedicated to addressing complex healthcare problems through the intersection of surgery and technology.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => scrollTo('#clinical')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
              >
                Clinical Profile
              </button>
              <button 
                onClick={() => scrollTo('#research')}
                className="px-6 py-3 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                Research & Innovation
              </button>
            </div>
            <div className="pt-6 flex items-center gap-6 text-sm text-slate-500">
              <span className="font-semibold">Affiliations:</span>
              <span className="flex items-center gap-1"><Hospital className="w-4 h-4" /> KKH</span>
              <span className="flex items-center gap-1"><GraduationCap className="w-4 h-4" /> Duke-NUS</span>
            </div>
          </div>
          
          {/* Headshot */}
          <div className="w-full max-w-md md:w-1/3 aspect-[4/5] bg-slate-200 rounded-2xl shadow-2xl overflow-hidden relative flex items-center justify-center group">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent z-10"></div>
             <img 
               src="https://i1.rgstatic.net/ii/profile.image/761637325783043-1558599897704_Q512/Andrew-Chou.jpg" 
               alt="Clin Asst Prof Andrew Chou"
               className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
             />
             <div className="absolute bottom-6 left-6 z-20 text-white">
                <p className="text-xl font-bold">Andrew Chou</p>
                <p className="text-sm opacity-90">BS (Stanford), MD (Duke-NUS)</p>
                <p className="text-xs opacity-75 mt-1">FRCSEd (Ortho)</p>
             </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle icon={<User className="w-6 h-6" />}>About Dr. Chou</SectionTitle>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p>
              Dr. Andrew Chou is a surgeon, innovator, and educator who believes that innovation is the key to addressing complex healthcare problems at scale. 
              He enjoys working with children, thus chose to subspecialize in paediatric orthopaedics with interests in hip preservation, limb reconstruction, and sports medicine.
            </p>
            <p>
              He received his B.S. in biochemical engineering from Stanford University, his M.D. from the Duke-NUS Medical School, 
              his M.Med. in Orthopaedic Surgery from the National University of Singapore, and his fellowship in trauma & orthopaedics from the Royal College of Surgeons of Edinburgh.
            </p>
            <p>
              In 2018, he was one of four nationally selected Singapore-Stanford Biodesign fellows and spent the year in Silicon Valley and Asia immersed in health technology innovation and medical device development. 
              In 2025, he was chosen for the prestigious Asia Pacific Paediatric Orthopaedic Society travelling fellowship to share his experience as a surgeon-innovator at top paediatric academic medical centres in Asia.
            </p>
          </div>
        </div>
      </section>

      {/* Clinical Interests */}
      <section id="clinical" className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle icon={<Stethoscope className="w-6 h-6" />}>Clinical Conditions</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPECIALTIES.map((spec, idx) => (
              <Card key={idx} className="h-full border-t-4 border-t-blue-500">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  {spec.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{spec.title}</h3>
                <p className="text-slate-600 text-sm">{spec.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research & Innovation */}
      <section id="research" className="py-16 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle icon={<Microscope className="w-6 h-6" />}>Research & Innovation</SectionTitle>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Innovation Focus */}
            <div className="space-y-6">
              <div className="bg-blue-900 text-white p-8 rounded-2xl relative overflow-hidden">
                <Cpu className="absolute top-4 right-4 text-blue-700 w-32 h-32 opacity-20" />
                <h3 className="text-2xl font-bold mb-4 relative z-10">Innovation Core</h3>
                <p className="text-blue-100 relative z-10 mb-6">
                  Serves as principal investigator for numerous initiatives at KKH studying the use of generative AI, computer vision, and 3D printing in orthopaedics.
                </p>
                <ul className="space-y-3 relative z-10">
                  {TRIALS.map((trial, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-1 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
                      {trial}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Academic Research Interests */}
            <div>
               <h3 className="text-xl font-bold mb-6 text-slate-900">Research Interests</h3>
               <div className="space-y-4">
                 {['Paediatric Trauma', 'Bone and joint infections in children', 'Shoulder instability', 'Medical device development', 'Surgical simulation'].map((item, i) => (
                   <div key={i} className="flex items-center p-4 bg-slate-50 rounded-lg border border-slate-100">
                     <Activity className="w-5 h-5 text-blue-500 mr-3" />
                     <span className="font-medium text-slate-700">{item}</span>
                   </div>
                 ))}
               </div>
               <div className="mt-8 p-6 border border-blue-100 bg-blue-50/50 rounded-xl">
                 <h4 className="font-bold text-blue-800 mb-2">Duke Innovate</h4>
                 <p className="text-sm text-slate-600">
                   Founding co-director for Duke Innovate, Asia’s first healthcare innovation and design thinking course for medical students.
                 </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Timeline */}
      <section id="credentials" className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle icon={<GraduationCap className="w-6 h-6" />}>Credentials</SectionTitle>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <GraduationCap className="text-blue-600" /> Education & Training
              </h3>
              <div className="ml-4">
                {EDUCATION.map((edu, idx) => (
                  <TimelineItem key={idx} {...edu} />
                ))}
              </div>
            </div>

            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                  <Hospital className="text-blue-600" /> Professional Appointments
                </h3>
                <ul className="space-y-4">
                  {APPOINTMENTS.map((appt, idx) => (
                    <li key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                      <h4 className="font-bold text-slate-800">{appt.role}</h4>
                      <p className="text-sm text-slate-600">{appt.org}</p>
                      <p className="text-xs text-slate-400 mt-1">{appt.period}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Award className="text-blue-600" /> Key Awards
                </h3>
                <ul className="space-y-3">
                  {AWARDS.map((award, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-slate-700">
                      <Award className="w-5 h-5 text-amber-500 flex-shrink-0" />
                      {award}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications */}
      <section id="publications" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle icon={<BookOpen className="w-6 h-6" />}>Publications</SectionTitle>
          <p className="text-slate-600 mb-8">
            An award-winning researcher, Dr. Andrew Chou has published over 30 articles and book chapters.
          </p>

          <PubList items={PUBLICATIONS} />

          <div className="mt-12 flex flex-wrap gap-4 justify-center">
             <a
               href="https://scholar.google.com/citations?user=mAQ3Z98AAAAJ&hl=en"
               target="_blank"
               rel="noreferrer"
               className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
             >
               <BookOpen className="w-4 h-4" /> View Google Scholar
             </a>
             <a
               href="https://sg.linkedin.com/in/drandrewchou"
               target="_blank"
               rel="noreferrer"
               className="flex items-center gap-2 px-6 py-3 bg-[#0077b5] text-white rounded-full hover:bg-[#006097] transition-colors"
             >
               <Linkedin className="w-4 h-4" /> LinkedIn Profile
             </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h5 className="text-white font-bold text-lg mb-4">Clin Asst Prof Andrew Chou</h5>
              <p className="text-sm mb-2">Consultant Orthopaedic Surgeon</p>
              <p className="text-sm">KK Women's and Children's Hospital</p>
            </div>
            <div>
              <h5 className="text-white font-bold text-lg mb-4">Education</h5>
              <p className="text-sm">Stanford University</p>
              <p className="text-sm">Duke-NUS Medical School</p>
              <p className="text-sm">Royal College of Surgeons Edinburgh</p>
            </div>
            <div>
               <h5 className="text-white font-bold text-lg mb-4">Contact</h5>
               <p className="text-sm">For appointments, please refer to KKH official channels.</p>
               <div className="flex gap-4 mt-4">
                 <a href="https://sg.linkedin.com/in/drandrewchou" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Linkedin /></a>
                 <a href="https://scholar.google.com/citations?user=mAQ3Z98AAAAJ&hl=en" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><BookOpen /></a>
               </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-xs text-center opacity-50">
            &copy; {new Date().getFullYear()} Dr Andrew Chou. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}