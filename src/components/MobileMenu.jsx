import { useState, useEffect } from "react"
import { X, Home, Info, LayoutDashboard, CreditCard, Settings } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export default function MobileMenu({ onClose, navLinks }) {
  const [isVisible, setIsVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  const getNavIcon = (name) => {
    const iconMap = {
      Home: Home,
      About: Info,
      Dashboard: LayoutDashboard,
      Subscriptions: CreditCard,
      Settings: Settings,
    }
    const IconComponent = iconMap[name] || Home
    return <IconComponent className="w-5 h-5" />
  }

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-all duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Menu Panel */}
      <div
        className={`fixed inset-0 bg-white z-50 flex flex-col transform transition-transform duration-300 ease-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        } md:inset-y-0 md:right-0 md:left-auto md:w-80 md:shadow-2xl md:translate-y-0 ${
          isVisible ? "md:translate-x-0" : "md:translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-8 -translate-x-8" />

          <div className="relative flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Menu</h1>
              <p className="text-teal-100 text-sm mt-1">Navigate your app</p>
            </div>
            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 py-8 overflow-y-auto">
          <div className="space-y-3">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.href
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={handleClose}
                  className={`flex items-center gap-4 px-4 py-4 rounded-2xl font-medium text-lg transition-all duration-200 ${
                    isActive
                      ? "bg-teal-50 text-teal-700 border-2 border-teal-200 shadow-sm"
                      : "text-slate-700 hover:bg-slate-50 hover:text-teal-600 border-2 border-transparent"
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isVisible ? "fadeInSlide 0.4s ease-out forwards" : "none",
                  }}
                >
                  <div className={`${isActive ? "text-teal-600" : "text-slate-500"}`}>{getNavIcon(link.name)}</div>
                  {link.name}
                  {isActive && <div className="ml-auto w-2 h-2 bg-teal-500 rounded-full" />}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="px-6 py-6 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">ST</span>
            </div>
            <div>
              <p className="font-semibold text-slate-800">SubTrack</p>
              <p className="text-sm text-slate-500">Subscription Manager</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}
