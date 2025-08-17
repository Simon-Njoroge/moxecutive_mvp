import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export function PortfolioSection() {
  const portfolioItems = [
    {
      title: "Corporate Brand Film",
      category: "Film Production",
      image: "/placeholder-oybix.png",
    },
    {
      title: "Event Coverage",
      category: "Photography",
      image: "/conference-setup.png",
    },
    {
      title: "Brand Identity Design",
      category: "Branding",
      image: "/placeholder-j2fjh.png",
    },
    {
      title: "Product Launch Event",
      category: "Event Management",
      image: "/elegant-product-launch.png",
    },
    {
      title: "Commercial Photography",
      category: "Photography",
      image: "/product-photography-studio.png",
    },
    {
      title: "Training Workshop",
      category: "Training",
      image: "/training-workshop.png",
    },
  ]

  return (
    <section id="portfolio" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our <span className="text-primary">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Showcasing our finest work</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg bg-background shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-sm text-primary font-medium">{item.category}</span>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-foreground bg-transparent"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Project
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
            View Full Portfolio
          </Button>
        </div>
      </div>
    </section>
  )
}
