import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "Google",
    image: "/placeholder.svg?height=40&width=40",
    content:
      "ResumeAI helped me land my dream job at Google. The AI suggestions were spot-on and the templates are beautiful.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    company: "Microsoft",
    image: "/placeholder.svg?height=40&width=40",
    content:
      "The resume scoring feature is incredible. It helped me optimize my resume for each application and increased my response rate by 300%.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "Spotify",
    image: "/placeholder.svg?height=40&width=40",
    content: "I love how easy it is to create multiple resume versions. The MDX editor is powerful yet intuitive.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Data Scientist",
    company: "Netflix",
    image: "/placeholder.svg?height=40&width=40",
    content:
      "The AI writing assistance is like having a career coach. It helped me quantify my achievements and use better action verbs.",
    rating: 5,
  },
  {
    name: "Lisa Thompson",
    role: "UX Designer",
    company: "Adobe",
    image: "/placeholder.svg?height=40&width=40",
    content:
      "Beautiful templates and seamless export options. My resume looks professional and stands out from the crowd.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Sales Manager",
    company: "Salesforce",
    image: "/placeholder.svg?height=40&width=40",
    content:
      "ResumeAI made the job search process so much easier. The platform is intuitive and the results speak for themselves.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Loved by Professionals Worldwide</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of professionals who have successfully landed their dream jobs using our AI-powered resume
            platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>

                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
