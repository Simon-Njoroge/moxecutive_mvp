import { useState } from "react"
import { Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Menu } from "lucide-react"

export function TopBar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-foreground text-background py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-sm gap-2">
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div className="flex items-center gap-6">
            {/* On small screens hide the full text and only show icons; on sm+ show full contact lines */}
            <a href="tel:+254700123456" className="hidden sm:flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+254 700 123 456</span>
            </a>

            <a href="mailto:info@moxecutive.com" className="hidden sm:flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>info@moxecutive.com</span>
            </a>
          </div>

          {/* Mobile toggle to reveal contact details */}
          <button
            type="button"
            className="sm:hidden p-1 text-muted-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle contact info"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Social block: always visible (icons), label only on sm+ */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
          <span className="text-muted-foreground hidden sm:inline">Follow Us:</span>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="facebook" className="hover:text-primary transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="twitter" className="hover:text-primary transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" aria-label="instagram" className="hover:text-primary transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="linkedin" className="hover:text-primary transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile expandable area with contact details (visible when toggled) */}
      {open && (
        <div className="sm:hidden max-w-7xl mx-auto mt-2 px-2">
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <a href="tel:+254700123456" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+254 700 123 456</span>
            </a>
            <a href="mailto:info@moxecutive.com" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>info@moxecutive.com</span>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
