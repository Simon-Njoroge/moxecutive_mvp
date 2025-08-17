import { CheckCircle, Award, Users, Zap } from "lucide-react"

export function WhyUsSection() {
  const reasons = [
    {
      icon: Award,
      title: "Award-Winning Excellence",
      description: "Recognized for outstanding creativity and professional delivery in the media industry.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Seasoned professionals with years of experience in film, branding, and event management.",
    },
    {
      icon: Zap,
      title: "Cutting-Edge Technology",
      description: "State-of-the-art equipment and latest techniques for superior quality results.",
    },
    {
      icon: CheckCircle,
      title: "Proven Track Record",
      description: "Successfully delivered 500+ projects for clients across various industries.",
    },
  ]

  return (
    <section id="about" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Why Choose <span className="text-primary">Moxecutive Media</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We combine creative vision with technical expertise to deliver media solutions that exceed expectations and
            drive real results for your brand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon
            return (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  <IconComponent className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{reason.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
