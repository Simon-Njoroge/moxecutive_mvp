import { Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function TopBar() {
  return (
    <div className="bg-foreground text-background py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>+254 700 123 456</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>info@moxecutive.com</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">Follow Us:</span>
          <div className="flex items-center gap-3">
            <Facebook className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />
            <Twitter className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />
            <Instagram className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />
            <Linkedin className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </div>
  )
}
