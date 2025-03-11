import { create } from 'zustand';
import type { CVStore, CVData } from '../types/cv';

const initialData: CVData = {
  personalInfo: {
    title: "Hassan Mohamed Dahir",
    currentRole: "Projekterende fagprojektleder, jord og afvanding",
    fullName: "Hassan Mohamed Dahir",
    email: "kontakt@example.com",
    nationality: "Dansk",
    seniority: "11,5",
    profileImage: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    competencies: [
      "Diplomingeniør i byggeteknik",
      "Uddannet kloakmester",
      "PRINCE2® certificeret",
      "DTU-uddannet i Baneprojektering og vedligeholdelse",
      "9 års erfaring i afløbs- og anlægsprojektering",
      "Erfaring med projekt-, projekterings- og fagledelse",
      "Ekspertise i QA-dokumentation og opfølgning",
      "Stærke samarbejdsevner på tværs af teams og faggrupper",
      "Erfaring med 3D-modellering og teknisk tegning",
      "Specialist i afvandingsprojekter",
      "Erfaren i myndighedsbehandling",
      "Kompetent i CSM-processer"
    ],
    professionalSummary: "Hassan er uddannet diplomingeniør i byggeteknik, er uddannet kloakmester og har derigennem en praktisk forståelse for at projekterne også skal være bygbare. Desuden har Hassan Projektleder-uddannelsen ™ PRINCE2® certificeringskursus i Foundation og er desuden opdateret med nyeste viden fra DTU indenfor 'Baneprojektering og vedligeholdelse / 11404 Railway Design and Maintenance'. Erfaring med projekt-, projekterings- og fagledelse af både mindre og komplekse projekter i forbindelse med sporarbejde og forskellige anlægsarbejde siden 2014. Hassan er endvidere garant for et tæt og godt samarbejde mellem bygherrer, rådgivere, entreprenører, myndigheder og lødsejere, hvor der løbende optimeres på løsninger og muligheder for projektet. Dybdgående viden og erfaring med opfølgning og vurdering af entreprenørernes QA-dokumentation. Ydermere har Hassan 9 års erfaring i afløbs- og anlægsprojektering og tilhørende håndtering af de relevante normer, standarder og regler. Udarbejdelse af udbudsmateriale, faglig granskning samt fagtilsyn i forbindelse med større anlægs- og jernbaneprojekter er ligeledes Hassans styrker. Hassan besidder en god evne til at indgå i samarbejde med forskellige teams og faggrupper, og hans personlige profil afspejler en naturlig interesse i at forstå og agere på kundens mangeartede behov indenfor byggeri, anlæg, geoteknik og afløbsteknik."
  },
  career: [
    {
      id: "career-1",
      startDate: "2024-05",
      endDate: null,
      role: "Projekterende fagprojektleder jord og afvanding",
      company: "Sweco",
      location: "København S",
      description: "Bane Øst (Infrastruktur, Vand og Miljø)",
      department: "Infrastruktur, Vand og Miljø",
      responsibilities: [
        "Fagledelse og styring af tid, økonomi og ressourcer",
        "Detailprojektering af bane- og vejafvanding",
        "Koordinering med interessenter",
        "Fagtilsyn og kvalitetssikring",
        "Udarbejdelse af 2D- og 3D-modeller",
        "Håndtering af dispensationsansøgninger",
        "Bygbarhedsvurdering og risikoanalyse",
        "CSM-proces og sikkerhedsvurdering"
      ]
    },
    {
      id: "career-2",
      startDate: "2023-02",
      endDate: "2024-04",
      role: "Projekterende fagprojektleder jord og afvanding",
      company: "Rambøll",
      location: "København S",
      description: "Railway Planning and Infrastructure",
      department: "Railway Planning and Infrastructure",
      responsibilities: [
        "Fagprojektledelse af afvandingsprojekter",
        "Koordinering med myndigheder og interessenter",
        "Udarbejdelse af tekniske løsninger",
        "Kvalitetssikring af projektmateriale",
        "Budgettering og ressourcestyring",
        "Design af nye drænsystemer",
        "Ledningsomlægninger og -koordinering",
        "Tværfaglig koordinering"
      ]
    },
    {
      id: "career-3",
      startDate: "2020-08",
      endDate: "2023-01",
      role: "Projekterings- og fagbyggeleder",
      company: "COWI",
      location: "København",
      description: "Anlæg og Infrastruktur",
      department: "Anlæg og Infrastruktur",
      responsibilities: [
        "Projektering af afvandingsanlæg",
        "Byggeledelse og fagtilsyn",
        "Koordinering med entreprenører",
        "Kvalitetssikring og dokumentation",
        "Økonomistyring og afrapportering",
        "Udarbejdelse af udbudsmateriale",
        "Interessenthåndtering",
        "Myndighedsbehandling"
      ]
    }
  ],
  projects: [
    {
      id: "project-1",
      title: "M3/IM3 Infrastruktur – NNE/Novo Nordisk Udvidelse",
      role: "Fagprojektleder for ledningsarbejder",
      startDate: "2024-05",
      endDate: null,
      description: "Byggemodning af Kalundborg-grunden som forberedelse til etablering af et større fabriksområde. Projektet omfatter omfattende ledningsarbejder, herunder omlægning af eksisterende ledninger og etablering af nye forsyningsledninger.",
      client: "NNE A/S",
      responsibilities: [
        "Koordinering med NNE, Kalundborg Kommune og Vejdirektoratet",
        "Grænsefladekoordinering med naboprojekter",
        "Overordnet fagtilsyn samt daglig dialog med entreprenøren",
        "Opfølgning og kvalitetssikring via Dalux",
        "Materiale- og mængdekontrol",
        "Kontrol af entreprenørens kvalitetsdokumentation",
        "Udarbejdelse af tekniske løsninger",
        "Håndtering af projektændringer"
      ]
    },
    {
      id: "project-2",
      title: "Sporfornyelse Roskilde-Ringsted",
      role: "Projekterende fagprojektleder",
      startDate: "2023-03",
      endDate: "2024-04",
      description: "Totaludskiftning af spor og sporskifter samt fornyelse af afvandingssystem. Projektet omfattede kompleks koordinering med andre fagdiscipliner og sikring af minimal påvirkning af togdriften.",
      client: "Banedanmark",
      responsibilities: [
        "Projektering af afvandingsanlæg",
        "Koordinering med andre fagdiscipliner",
        "Udarbejdelse af udbudsmateriale",
        "Kvalitetssikring af projektmateriale",
        "Tilsyn under udførelse",
        "CSM-proces og sikkerhedsvurdering",
        "Bygbarhedsvurdering",
        "Interessenthåndtering"
      ]
    },
    {
      id: "project-3",
      title: "Letbane Ring 3",
      role: "Afvandingsingeniør",
      startDate: "2022-01",
      endDate: "2023-01",
      description: "Projektering af afvandingsløsninger for den nye letbane mellem Lyngby og Ishøj. Fokus på bæredygtige løsninger og optimal vandhåndtering.",
      client: "Hovedstadens Letbane",
      responsibilities: [
        "Design af afvandingssystemer",
        "Hydrauliske beregninger",
        "Koordinering med kommuner",
        "Miljøvurderinger",
        "Udarbejdelse af tekniske tegninger",
        "Kvalitetssikring",
        "Myndighedsbehandling"
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "Diplomingeniør",
      institution: "DTU",
      location: "Lyngby",
      startDate: "2018",
      endDate: "2021",
      description: "Byggeteknik med specialisering i anlægskonstruktion",
      specialization: [
        "Afgangsprojekt - Dynamisk modellering af afløbssystemer",
        "Ingeniørpraktik hos COWI - Anlæg og Infrastruktur",
        "Afløbsteknik og hydraulik",
        "Vejbygning og trafikanlæg",
        "Planlægning og Kalkulation",
        "Entrepriseret",
        "Vidensteori og projektmetodik",
        "Statistik og sandsynlighedsregning",
        "Plasticitetsteori og brudmekanik",
        "Geoteknik og fundering",
        "Stålkonstruktioner - dimensionering",
        "Betonkonstruktioner - videregående",
        "Varme- og indeklimainstallationer",
        "Byggeriets planlægning og økonomi",
        "Installationer - vand, afløb og hydraulik",
        "Materialelære - træ, beton og metaller",
        "Byggeledelse og projektstyring",
        "Betonelementer og lastberegning",
        "Brandsikkerhed i byggeri",
        "Trækonstruktioner og design",
        "Bebyggelsesplanlægning",
        "Lokalplaner og byggelovgivning",
        "Energi og indeklima",
        "Byggematerialer og egenskaber",
        "Vej- og anlægsteknik",
        "Økonomistyring i byggeprojekter",
        "Matematik og fysik",
        "Teknisk tegning og CAD",
        "Statik og styrkelære",
        "Bygningskonstruktion",
        "Projektarbejde og metode",
        "IT-værktøjer for ingeniører"
      ]
    }
  ],
  courses: [
    {
      id: "course-1",
      title: "PRINCE2® Foundation",
      provider: "AXELOS Global Best Practice",
      year: "2023",
      location: "København",
      description: "Certificering i projektledelsesmetoden PRINCE2"
    },
    {
      id: "course-2",
      title: "Baneprojektering og vedligeholdelse",
      provider: "DTU",
      year: "2022",
      location: "Lyngby",
      description: "Kursus i moderne baneprojektering og vedligeholdelsesmetoder"
    },
    {
      id: "course-3",
      title: "CSM Assessor",
      provider: "Banedanmark",
      year: "2022",
      location: "København",
      description: "Certificering i sikkerhedsvurdering af jernbaneprojekter"
    },
    {
      id: "course-4",
      title: "3D Projektering i Civil 3D",
      provider: "Autodesk",
      year: "2021",
      location: "Online",
      description: "Avanceret kursus i 3D-projektering af infrastruktur"
    }
  ],
  certificates: [
    {
      id: "cert-1",
      title: "Kloakmester",
      provider: "Teknologisk Institut",
      issueDate: "2022-06",
      certificateNumber: "KM2022-123",
      description: "Autorisation som kloakmester"
    },
    {
      id: "cert-2",
      title: "PRINCE2® Foundation",
      provider: "AXELOS",
      issueDate: "2023-03",
      certificateNumber: "GR656742",
      description: "Certificering i PRINCE2 projektledelsesmetode"
    },
    {
      id: "cert-3",
      title: "CSM Assessor",
      provider: "Banedanmark",
      issueDate: "2022-09",
      certificateNumber: "CSM2022-456",
      description: "Certificering i sikkerhedsvurdering af jernbaneprojekter"
    }
  ],
  sections: [
    { id: "personal", type: "personal", title: "Personlige Oplysninger", visible: true, order: 0 },
    { id: "career", type: "career", title: "Karriereforløb", visible: true, order: 1 },
    { id: "projects", type: "projects", title: "Projekter", visible: true, order: 2 },
    { id: "education", type: "education", title: "Uddannelse", visible: true, order: 3 },
    { id: "courses", type: "courses", title: "Kurser", visible: true, order: 4 },
    { id: "certificates", type: "certificates", title: "Certifikater", visible: true, order: 5 }
  ]
};

export const useCVStore = create<CVStore>((set) => ({
  data: initialData,
  updatePersonalInfo: (info) => 
    set((state) => ({
      data: {
        ...state.data,
        personalInfo: { ...state.data.personalInfo, ...info }
      }
    })),
  addCareerEntry: (entry) =>
    set((state) => ({
      data: {
        ...state.data,
        career: [...state.data.career, { ...entry, id: `career-${Date.now()}` }]
      }
    })),
  updateCareerEntry: (id, entry) =>
    set((state) => ({
      data: {
        ...state.data,
        career: state.data.career.map((item) =>
          item.id === id ? { ...item, ...entry } : item
        )
      }
    })),
  addProjectEntry: (entry) =>
    set((state) => ({
      data: {
        ...state.data,
        projects: [...state.data.projects, { ...entry, id: `project-${Date.now()}` }]
      }
    })),
  updateProjectEntry: (id, entry) =>
    set((state) => ({
      data: {
        ...state.data,
        projects: state.data.projects.map((item) =>
          item.id === id ? { ...item, ...entry } : item
        )
      }
    })),
  addEducation: (entry) =>
    set((state) => ({
      data: {
        ...state.data,
        education: [...state.data.education, { ...entry, id: `edu-${Date.now()}` }]
      }
    })),
  updateEducation: (id, entry) =>
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.map((item) =>
          item.id === id ? { ...item, ...entry } : item
        )
      }
    })),
  addCourse: (course) =>
    set((state) => ({
      data: {
        ...state.data,
        courses: [...state.data.courses, { ...course, id: `course-${Date.now()}` }]
      }
    })),
  updateCourse: (id, course) =>
    set((state) => ({
      data: {
        ...state.data,
        courses: state.data.courses.map((item) =>
          item.id === id ? { ...item, ...course } : item
        )
      }
    })),
  addCertificate: (certificate) =>
    set((state) => ({
      data: {
        ...state.data,
        certificates: [...state.data.certificates, { ...certificate, id: `cert-${Date.now()}` }]
      }
    })),
  updateCertificate: (id, certificate) =>
    set((state) => ({
      data: {
        ...state.data,
        certificates: state.data.certificates.map((item) =>
          item.id === id ? { ...item, ...certificate } : item
        )
      }
    })),
  reorderSections: (sections) =>
    set((state) => ({
      data: {
        ...state.data,
        sections
      }
    })),
  toggleSectionVisibility: (sectionId) =>
    set((state) => ({
      data: {
        ...state.data,
        sections: state.data.sections.map((section) =>
          section.id === sectionId
            ? { ...section, visible: !section.visible }
            : section
        )
      }
    }))
}));