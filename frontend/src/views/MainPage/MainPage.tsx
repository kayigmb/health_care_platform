import { Header } from "../../components/Header.tsx";
import { Box } from "@mui/material";
import { HeroPage } from "./Heropage.tsx";
import { AboutSection } from "./AboutSection.tsx";
import { ContactSection } from "./ContactSection.tsx";
import { Footer } from "./Footer.tsx";

export function MainPage() {
  return (
    <Box>
      <Header />
      <HeroPage />
      <AboutSection />
      <ContactSection />
      <Footer />
    </Box>
  );
}
