"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to scene breakdown page
    router.push("/scenes");
  }, [router]);

  return null; // Component doesn't render anything since we redirect
}