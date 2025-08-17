import { Card, CardContent } from "@/components/ui/card"
import { Film, Palette, Calendar, ShoppingCart, GraduationCap, Camera } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: Film,
      title: "Film & TV Production",
      description: "High-quality video content that amplifies your audience",
    },
    {
      icon: Palette,
      title: "Graphic Design & Branding",
      description: "Creative visual identity solutions that make your brand memorable",
    },
    {
      icon: Calendar,
      title: "Event Management",
      description: "Seamless event planning and execution for memorable gatherings",
    },
    {
      icon: ShoppingCart,
      title: "Media Buying",
      description: "Strategic media placement to maximize advertising ROI",
    },
    {
      icon: GraduationCap,
      title: "Training & Mentorship",
      description: "Professional development programs to enhance your skills",
    },
    {
      icon: Camera,
      title: "Photography",
      description: "Professional photography services for corporate and commercial needs",
    },
  ]

  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive media solutions for your brand
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-border">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
