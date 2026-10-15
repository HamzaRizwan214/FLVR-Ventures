import { motion } from "framer-motion";
import HomeScene from "@/components/scene/HomeScene";
import HomePopUp from "@/components/HomePopUp";
import HomeConcepts from "@/components/HomeConcepts";
import HomeFund from "@/components/HomeFund";
import HomeFaq from "@/components/HomeFaq";

// Home runs edge to edge. The opening scene (loader, headline, the four stages) is one pinned
// GSAP timeline; the sections after it sit on the page itself.
export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <HomeScene />
      <HomePopUp />
      <HomeConcepts />
      <HomeFund />
      <HomeFaq />
    </motion.div>
  );
}
