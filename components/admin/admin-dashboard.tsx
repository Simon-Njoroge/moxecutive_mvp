import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, FileText, ImageIcon, TrendingUp, Eye, MessageSquare, Award, Calendar } from "lucide-react"

export function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Portfolio Items",
      value: "89",
      change: "+5%",
      icon: ImageIcon,
      color: "text-green-600",
    },
    {
      title: "Page Views",
      value: "45,678",
      change: "+18%",
      icon: Eye,
      color: "text-purple-600",
    },
    {
      title: "Testimonials",
      value: "156",
      change: "+8%",
      icon: MessageSquare,
      color: "text-orange-600",
    },
  ]

  const recentActivity = [
    {
      action: "New portfolio item added",
      user: "John Doe",
      time: "2 hours ago",
      type: "portfolio",
    },
    {
      action: "Service updated",
      user: "Jane Smith",
      time: "4 hours ago",
      type: "service",
    },
    {
      action: "New testimonial received",
      user: "Client",
      time: "6 hours ago",
      type: "testimonial",
    },
    {
      action: "Media file uploaded",
      user: "Admin",
      time: "1 day ago",
      type: "media",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-primary-foreground">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Admin!</h1>
        <p className="text-primary-foreground/90">Here's what's happening with your Moxecutive Media platform today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      by {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-20 flex flex-col gap-2">
                <FileText className="h-6 w-6" />
                <span>Add Content</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                <ImageIcon className="h-6 w-6" />
                <span>Upload Media</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                <Award className="h-6 w-6" />
                <span>Add Service</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                <Calendar className="h-6 w-6" />
                <span>Schedule Post</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">6</div>
            <p className="text-sm text-muted-foreground">Active services</p>
            <Button variant="link" className="p-0 h-auto mt-2">
              Manage Services →
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">89</div>
            <p className="text-sm text-muted-foreground">Portfolio items</p>
            <Button variant="link" className="p-0 h-auto mt-2">
              View Portfolio →
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Media Library</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">234</div>
            <p className="text-sm text-muted-foreground">Media files</p>
            <Button variant="link" className="p-0 h-auto mt-2">
              Browse Media →
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
