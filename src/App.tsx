import "./App.css";
import { lazy, Suspense } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate
} from "react-router-dom";
import NotFound from "./components/NotFound";
import { roles, managementTypes } from "./services/types";
import SecureAuthRoutes from "./services/authCheck";
import { Toaster } from "react-hot-toast";
import MuLoader from "./components/MuComponents/MuLoader/MuLoader";
import In50Hours from "./modules/Public/In50Hours/In50Hours";
import LaunchPad from "./modules/Public/Launchpad/Launchpad";
import Calendar from "./modules/Public/Calendar/Calendar";
import EventsHome from "./modules/Public/Events/Events";
import EnablersPage from "./modules/Public/EnablersPage/EnablersPage";
import TermsAndCondition from "./modules/Public/Home/components/TermsandConditions/TermsandConditions";
import PrivacyPolicy from "./modules/Public/Home/components/PrivacyPolicy/PrivacyPolicy";
import { updateRefreshToken } from "./modules/utils/cdr";

// Lazy-loaded components
const ArtofTeaching = lazy(() => import("./modules/Public/ArtOfTeaching/ArtOfTeaching"));
const LandingPage = lazy(() => import("./modules/Public/LearningCircles/pages/LandingPage"));
const KKEMEventBeyondUs = lazy(() => import("./modules/Public/KKEM/modules/KKEMEventTemplate/KKEMEventBeyondUs"));
const LearningCircles = lazy(() => import("./modules/Public/KKEM/modules/Dashboard/LearningCircles/LearningCircles"));

// const Foundation = lazy(() => import("./modules/Public/Foundation/Foundation"));
const Donation = lazy(() => import("./modules/Public/Donation/Donation"));
const Refund = lazy(() => import("./modules/Public/Donation/pages/Refund"));
const DonationSuccess = lazy(() => import("./modules/Public/Donation/pages/DonationSuccess"));
const CommunityPartners = lazy(() => import("./modules/Public/CommPartners/CommPartners"));
const CompanyPartners = lazy(() => import("./modules/Public/CompanyPartners/CompanyParnters"));
const MuLearnLanding = lazy(() => import("./modules/Public/Home/pages/LandingPage"));
const Profile = lazy(() => import("./modules/Public/Profile/Profile"));
const Manifesto = lazy(() => import("./modules/Public/Manifesto/Manifesto"));
const TeamsPage = lazy(() => import("./modules/Public/Team/pages/Team"));
const KKEMLanding = lazy(() => import("./modules/Public/KKEM/modules/KKEMLanding"));
const KKEMAuth = lazy(() => import("./modules/Public/KKEM/modules/KKEMAuth"));
const Trivial = lazy(() => import("./modules/Public/TrivialIdeas/modules/trivial"));
const YIP = lazy(() => import("./modules/Public/yip/YIP2023"));
const NominateHR = lazy(() => import("./modules/Public/HRNomination/NominateHR"));
const Careers = lazy(() => import("./modules/Public/Career/Career"));
const CampusLogoGen = lazy(() => import("./modules/Public/CampusLogoGen/CampusLogoGen"));

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <MuLearnLanding /> },
    { path: "/manifesto", element: <Manifesto /> },
    {path: "/enablers", element: <EnablersPage/>},
    { path: "/community-partners", element: <CommunityPartners /> },
    { path: "/company-partners", element: <CompanyPartners /> },
    { path: "/yip", element: <YIP /> },
    { path: "/artofteaching", element: <ArtofTeaching /> },
    { path: "/in50hours", element: <In50Hours /> },
    { path: "/launchpad", element: <LaunchPad /> },
    {path: "/events/calendar", element: <Calendar/>},
    {path: "/events/weekly", element: <EventsHome/>},
    { path: "/campuschapters/#logo-generator", element: <CampusLogoGen /> },
    { path: "*", element: <NotFound /> },
    { path: "404", element: <NotFound /> },
    { path: "kkem", element: <KKEMLanding /> },
    { path: "kkem/authorization/:token", element: <KKEMAuth /> },
    { path: "donation", element: <Donation /> },
    { path: "donation/success", element: <DonationSuccess /> },
    { path: "donation/refund", element: <Refund /> },
    { path: "trivial-ideas", element: <Trivial /> },
    { path: "team", element: <TeamsPage /> },
    {path: "termsandconditions", element: <TermsAndCondition/>},
    {path: "privacypolicy", element: <PrivacyPolicy/>},
    { path: "/careers", element: <Careers /> },
    { path: "/profile/:id", element: <Profile />},
    { path: "/learning-circle", element: <LandingPage /> },
    { path: "/kkem/events/beyondus", element: <KKEMEventBeyondUs /> },
    { path: "/kkem/learningcircles/dashboard", element: <LearningCircles /> },
    { path: "/cdr", element: <>{updateRefreshToken()}</> },
    { path: "/hr", element: <NominateHR /> },
    // { path: "/foundation", element: <Foundation /> }
  ]);

  return (
    <>
      <Suspense fallback={<div className="flex items-center justify-center w-screen h-screen"><MuLoader /></div>}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster position="bottom-center" reverseOrder={true} />
    </>
  );
}


export default App;
