"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export function AuthButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className=" bg-muted/40 rounded-xl p-4 border shadow-sm flex-1"
    >
      <div className="flex items-center">
        <div className="flex gap-2">
          <Button asChild size="sm" variant={"outline"}>
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button asChild size="sm" variant={"default"}>
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
