import { AdminAccessGuide } from "@/components/admin-access-guide"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AdminGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="py-8">
        <AdminAccessGuide />
      </div>
      <Footer />
    </div>
  )
}
