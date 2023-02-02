import { motion } from "framer-motion";
import { ReactNode } from "react";
import { page } from "../../constants/variants";

interface PropsType {
  children: ReactNode;
  [prop: string]: unknown;
}

const Page = (props: PropsType) => (
  <motion.div
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
    {...props}
  >
    {props.children}
  </motion.div>
);

export default Page;
