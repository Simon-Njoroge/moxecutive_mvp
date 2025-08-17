import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* CTA Section */}
      <div className="bg-primary py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to take your brand to the next level? Let's talk.
          </h2>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-4 text-lg bg-transparent"
          >
            Book Consultation
          </Button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="text-2xl font-bold text-primary mb-4">Moxecutive Media</div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Transforming visions into media excellence through professional film production, branding, and
                comprehensive media solutions.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-gray-300">Nairobi, Kenya</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-gray-300">+254 700 123 456</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-gray-300">info@moxecutive.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-background mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-gray-300 hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-300 hover:text-primary transition-colors">
                    Our Services
                  </a>
                </li>
                <li>
                  <a href="#portfolio" className="text-gray-300 hover:text-primary transition-colors">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-300 hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="text-lg font-semibold text-background mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <Facebook className="h-6 w-6 text-gray-300 hover:text-primary cursor-pointer transition-colors" />
                <Twitter className="h-6 w-6 text-gray-300 hover:text-primary cursor-pointer transition-colors" />
                <Instagram className="h-6 w-6 text-gray-300 hover:text-primary cursor-pointer transition-colors" />
                <Linkedin className="h-6 w-6 text-gray-300 hover:text-primary cursor-colors" />
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">© 2024 Moxecutive Media. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
