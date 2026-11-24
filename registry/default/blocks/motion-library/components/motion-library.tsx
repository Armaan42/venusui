import { MotionLibraryAssistant } from "./motion-library-assistant"
import { MotionLibraryFaq } from "./motion-library-faq"
import { MotionLibraryFooter } from "./motion-library-footer"
import { MotionLibraryHero } from "./motion-library-hero"
import { MotionLibraryMotion } from "./motion-library-motion"
import { MotionLibraryNavbar } from "./motion-library-navbar"
import { MotionLibraryPricing } from "./motion-library-pricing"
import { MotionLibraryTrail } from "./motion-library-trail"

/**
 * A dark, motion-first landing page for a component library ("Orrery", made
 * up). Every section is its own `motion-library-*.tsx` file with its copy
 * inside. Render it from `app/page.tsx`.
 */
export function MotionLibrary() {
  return (
    <MotionLibraryMotion>
      <div data-motion-library className="bg-ml-paper font-sans text-ml-ink antialiased">
        {/* The page is a dark sheet over the footer; its rounded bottom lifts away to reveal it. */}
        <div className="relative z-10 overflow-x-clip rounded-b-[2rem] bg-ml-bg shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)]">
          <MotionLibraryNavbar />
          <main>
            <MotionLibraryHero />
            <MotionLibraryTrail />
            <MotionLibraryAssistant />
            <MotionLibraryFaq />
            <MotionLibraryPricing />
          </main>
        </div>
        <MotionLibraryFooter />
      </div>
    </MotionLibraryMotion>
  )
}
