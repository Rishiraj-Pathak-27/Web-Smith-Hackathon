"use client"

import { useState, useEffect } from "react"
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Plus,
  Trash2,
  Heart,
  History,
  Star,
  LogOut,
  UserCheck,
  Shield,
  Search,
  Filter,
  Moon,
  Sun,
  Bell,
  MoreVertical,
  HelpCircle,
  Settings,
  Download,
  Share2,
  TrendingUp,
  Users,
  Award,
  BookOpen,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

// Dummy data with more events
const initialEvents = [
  {
    id: 1,
    title: "Advanced React Development Workshop",
    description:
      "Learn advanced React patterns, hooks, and performance optimization techniques in this comprehensive workshop.",
    date: "2024-02-15",
    time: "10:00",
    providerName: "Tech Academy",
    providerEmail: "contact@techacademy.com",
    providerPhone: "+1-555-0123",
    approved: true,
    category: "Programming",
    level: "Advanced",
    duration: "4 hours",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Digital Marketing Masterclass",
    description:
      "Master the art of digital marketing with hands-on experience in SEO, social media, and content marketing.",
    date: "2024-02-20",
    time: "14:00",
    providerName: "Marketing Institute",
    providerEmail: "info@marketinginst.com",
    providerPhone: "+1-555-0456",
    approved: true,
    category: "Marketing",
    level: "Intermediate",
    duration: "6 hours",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    description: "Introduction to data science concepts, Python programming, and machine learning basics.",
    date: "2024-01-10",
    time: "09:00",
    providerName: "Data Academy",
    providerEmail: "hello@dataacademy.com",
    providerPhone: "+1-555-0789",
    approved: true,
    category: "Data Science",
    level: "Beginner",
    duration: "8 hours",
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    description: "Master the fundamentals of user interface and user experience design with practical projects.",
    date: "2024-02-25",
    time: "15:30",
    providerName: "Design Institute",
    providerEmail: "info@designinst.com",
    providerPhone: "+1-555-0321",
    approved: true,
    category: "Design",
    level: "Intermediate",
    duration: "5 hours",
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    title: "Blockchain Development Bootcamp",
    description: "Comprehensive bootcamp covering blockchain technology, smart contracts, and DApp development.",
    date: "2024-03-01",
    time: "09:00",
    providerName: "Blockchain Academy",
    providerEmail: "learn@blockchain.edu",
    providerPhone: "+1-555-0987",
    approved: true,
    category: "Blockchain",
    level: "Advanced",
    duration: "12 hours",
    createdAt: new Date().toISOString(),
  },
]

// FAQ Data
const faqData = [
  {
    question: "How do I register for an event?",
    answer:
      "Simply browse the events, click on the event you're interested in, and use the 'Contact Provider' button to get in touch with the event organizer.",
  },
  {
    question: "Can I bookmark events for later?",
    answer:
      "Yes! Students can bookmark events by clicking the heart icon on any event card. You can view all your bookmarked events in the Student Dashboard.",
  },
  {
    question: "How do I rate an event?",
    answer:
      "After an event has ended, you can rate it using the 5-star rating system available on the event card in your Student Dashboard.",
  },
  {
    question: "Can I create events as a student?",
    answer: "No, only Admin users can create and manage events. Students can view, bookmark, and rate events.",
  },
  {
    question: "How do I switch between light and dark mode?",
    answer: "Click on the three dots menu in the header and toggle the dark mode switch.",
  },
]

// Help Content
const helpContent = {
  student: [
    {
      title: "Getting Started",
      content:
        "Welcome to SkillBridge! Browse upcoming events, bookmark your favorites, and track your learning journey.",
    },
    {
      title: "Viewing Events",
      content:
        "Use the search bar to find specific events or filter by category. Click 'Contact Provider' to register.",
    },
    {
      title: "Managing Bookmarks",
      content: "Click the heart icon to bookmark events. View all bookmarked events in your dashboard.",
    },
    {
      title: "Rating Events",
      content: "After attending an event, rate it using the star system to help other students.",
    },
  ],
  admin: [
    {
      title: "Creating Events",
      content:
        "Click 'Create Event' to add new events. Fill in all required details including date, time, and provider information.",
    },
    {
      title: "Managing Events",
      content: "View all events in your dashboard. Use the delete button to remove events when necessary.",
    },
    {
      title: "Analytics",
      content: "Monitor event statistics, student engagement, and overall platform performance.",
    },
    {
      title: "Export Data",
      content: "Export event data and statistics for reporting and analysis purposes.",
    },
  ],
}

// Authentication Component
const AuthForm = ({ onLogin, darkMode }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [userType, setUserType] = useState("student")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isLogin) {
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password && u.type === userType,
      )

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user))
        onLogin(user)
      } else {
        alert("Invalid credentials!")
      }
    } else {
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const existingUser = users.find((u) => u.email === formData.email)

      if (existingUser) {
        alert("User already exists!")
        return
      }

      const newUser = {
        id: Date.now(),
        email: formData.email,
        password: formData.password,
        name: formData.name,
        type: userType,
      }

      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))
      localStorage.setItem("currentUser", JSON.stringify(newUser))
      onLogin(newUser)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 to-indigo-100"} flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <h2 className={`text-3xl font-extrabold ${darkMode ? "text-white" : "text-gray-900"}`}>
            Welcome to SkillBridge
          </h2>
          <p className={`mt-2 text-center text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {isLogin ? "Sign in to your account" : "Create your account"}
          </p>
          <p className={`mt-2 text-center text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-blue-600 hover:text-blue-500">
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-xl shadow-xl p-6`}>
          <div className="mb-4">
            <label className={`block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"} mb-2`}>
              Account Type
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setUserType("student")}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  userType === "student"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                    : `${darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`
                }`}
              >
                <UserCheck size={16} className="inline mr-2" />
                Student
              </button>
              <button
                type="button"
                onClick={() => setUserType("admin")}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  userType === "admin"
                    ? "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg"
                    : `${darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`
                }`}
              >
                <Shield size={16} className="inline mr-2" />
                Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"} mb-1`}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div>
              <label className={`block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"} mb-1`}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"} mb-1`}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <div className={`mt-6 p-4 ${darkMode ? "bg-gray-700" : "bg-gray-50"} rounded-lg`}>
            <p className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-600"} mb-2 font-medium`}>
              Demo Credentials:
            </p>
            <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Student: student@demo.com / password
            </p>
            <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Admin: admin@demo.com / password
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Enhanced Event Card Component
const EventCard = ({
  event,
  onContact,
  isAdmin = false,
  onDelete,
  isStudent = false,
  onBookmark,
  onRate,
  isBookmarked = false,
  userRating = 0,
  darkMode = false,
}) => {
  const eventDateTime = new Date(`${event.date}T${event.time}`)
  const isExpired = eventDateTime < new Date()

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(`${event.title} - ${window.location.href}`)
      alert("Event link copied to clipboard!")
    }
  }

  return (
    <div
      className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-xl shadow-lg p-4 sm:p-6 border-l-4 ${
        isExpired ? "border-gray-400 opacity-60" : "border-blue-500"
      } hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-2 sm:space-y-0">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(event.level)}`}>{event.level}</span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${darkMode ? "bg-gray-700 text-gray-300" : "bg-blue-100 text-blue-800"}`}
            >
              {event.category}
            </span>
          </div>
          <h3
            className={`text-lg sm:text-xl font-semibold ${isExpired ? (darkMode ? "text-gray-400" : "text-gray-500") : darkMode ? "text-white" : "text-gray-800"} pr-2`}
          >
            {event.title}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleShare}
            className={`p-2 rounded-lg ${darkMode ? "text-gray-400 hover:text-blue-400 hover:bg-gray-700" : "text-gray-400 hover:text-blue-500 hover:bg-blue-50"} transition-colors`}
          >
            <Share2 size={16} />
          </button>
          {isStudent && (
            <button
              onClick={() => onBookmark(event.id)}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked
                  ? "text-red-500 hover:text-red-700"
                  : `${darkMode ? "text-gray-400 hover:text-red-400" : "text-gray-400 hover:text-red-500"}`
              }`}
            >
              <Heart size={18} fill={isBookmarked ? "currentColor" : "none"} />
            </button>
          )}
          {isAdmin && (
            <button
              onClick={() => onDelete(event.id)}
              className={`p-2 rounded-lg ${darkMode ? "text-red-400 hover:text-red-300 hover:bg-gray-700" : "text-red-500 hover:text-red-700 hover:bg-red-50"} transition-colors`}
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>

      <p
        className={`${isExpired ? (darkMode ? "text-gray-500" : "text-gray-400") : darkMode ? "text-gray-300" : "text-gray-600"} mb-4 text-sm sm:text-base overflow-hidden`}
      >
        {event.description}
      </p>

      <div className="space-y-2 mb-4">
        <div className={`flex items-center text-xs sm:text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          <Calendar size={14} className="mr-2 flex-shrink-0" />
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className={`flex items-center text-xs sm:text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          <Clock size={14} className="mr-2 flex-shrink-0" />
          <span>
            {event.time} • {event.duration}
          </span>
        </div>
        <div className={`flex items-center text-xs sm:text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          <User size={14} className="mr-2 flex-shrink-0" />
          <span className="truncate">{event.providerName}</span>
        </div>
      </div>

      {isExpired && (
        <div className="text-red-500 text-xs sm:text-sm font-medium mb-2 flex items-center">
          <Clock size={14} className="mr-1" />
          Event Expired
        </div>
      )}

      {isStudent && isExpired && (
        <div className="flex items-center mb-3">
          <span className={`text-xs sm:text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} mr-2`}>
            Rate this event:
          </span>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => onRate(event.id, star)}
                className={`${star <= userRating ? "text-yellow-400" : darkMode ? "text-gray-600" : "text-gray-300"} hover:text-yellow-400 transition-colors`}
              >
                <Star size={16} fill={star <= userRating ? "currentColor" : "none"} />
              </button>
            ))}
          </div>
        </div>
      )}

      {!isAdmin && !isExpired && (
        <button
          onClick={() => onContact(event)}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 w-full sm:w-auto shadow-lg"
        >
          Contact Provider
        </button>
      )}

      {isAdmin && (
        <div className="flex items-center justify-between">
          <span
            className={`text-xs px-3 py-1 rounded-full ${event.approved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
          >
            {event.approved ? "Approved" : "Pending"}
          </span>
        </div>
      )}
    </div>
  )
}

// Enhanced Contact Modal
const ContactModal = ({ event, isOpen, onClose, darkMode }) => {
  if (!isOpen || !event) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Contact Provider</h3>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${darkMode ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"} transition-colors`}
          >
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div className={`p-4 ${darkMode ? "bg-gray-700" : "bg-gray-50"} rounded-lg`}>
            <strong className={`text-sm sm:text-base ${darkMode ? "text-gray-200" : "text-gray-800"}`}>Event:</strong>
            <p className={`text-sm sm:text-base mt-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{event.title}</p>
          </div>
          <div className={`p-4 ${darkMode ? "bg-gray-700" : "bg-gray-50"} rounded-lg`}>
            <strong className={`text-sm sm:text-base ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
              Provider:
            </strong>
            <p className={`text-sm sm:text-base mt-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              {event.providerName}
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Mail size={20} className="mr-3 text-blue-500 flex-shrink-0" />
              <a
                href={`mailto:${event.providerEmail}`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium break-all"
              >
                {event.providerEmail}
              </a>
            </div>
            <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Phone size={20} className="mr-3 text-green-500 flex-shrink-0" />
              <a
                href={`tel:${event.providerPhone}`}
                className="text-green-600 hover:text-green-800 text-sm font-medium"
              >
                {event.providerPhone}
              </a>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className={`mt-6 w-full ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-500 hover:bg-gray-600 text-white"} py-3 px-4 rounded-lg font-medium transition-colors`}
        >
          Close
        </button>
      </div>
    </div>
  )
}

// FAQ Modal Component
const FAQModal = ({ isOpen, onClose, darkMode }) => {
  const [openItems, setOpenItems] = useState({})

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl`}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            Frequently Asked Questions
          </h3>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${darkMode ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"} transition-colors`}
          >
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className={`border ${darkMode ? "border-gray-700" : "border-gray-200"} rounded-lg`}>
              <button
                onClick={() => toggleItem(index)}
                className={`w-full p-4 text-left flex justify-between items-center ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"} transition-colors`}
              >
                <span className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{faq.question}</span>
                {openItems[index] ? (
                  <ChevronDown size={20} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                ) : (
                  <ChevronRight size={20} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                )}
              </button>
              {openItems[index] && (
                <div className={`p-4 pt-0 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Help Modal Component
const HelpModal = ({ isOpen, onClose, userType, darkMode }) => {
  if (!isOpen) return null

  const content = helpContent[userType] || helpContent.student

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl`}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            Help & Guidance - {userType === "admin" ? "Admin" : "Student"}
          </h3>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${darkMode ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"} transition-colors`}
          >
            <X size={24} />
          </button>
        </div>
        <div className="space-y-6">
          {content.map((item, index) => (
            <div key={index} className={`p-4 ${darkMode ? "bg-gray-700" : "bg-gray-50"} rounded-lg`}>
              <h4 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>{item.title}</h4>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Enhanced Event Form Component
const EventForm = ({ onSubmit, onCancel, darkMode }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    providerName: "",
    providerEmail: "",
    providerPhone: "",
    category: "Programming",
    level: "Beginner",
    duration: "",
  })

  const categories = ["Programming", "Marketing", "Design", "Data Science", "Blockchain", "Business", "Other"]
  const levels = ["Beginner", "Intermediate", "Advanced"]

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      providerName: "",
      providerEmail: "",
      providerPhone: "",
      category: "Programming",
      level: "Beginner",
      duration: "",
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-xl shadow-lg p-4 sm:p-6`}>
      <h3 className={`text-lg sm:text-xl font-semibold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
        Create New Event
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"} mb-2`}>
              Event Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              placeholder="Enter event title"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"} mb-2`}>
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              placeholder="e.g., 2 hours, 1 day"
            />
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"} mb-2`}>
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            placeholder="Describe your event in detail"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={`block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"} mb-2`}>
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"} mb-2`}>
              Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"} mb-2`}>
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"} mb-2`}>
              Level
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"} mb-2`}>
              Provider Name
            </label>
            <input
              type="text"
              name="providerName"
              value={formData.providerName}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              placeholder="Organization or instructor name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"} mb-2`}>
              Provider Email
            </label>
            <input
              type="email"
              name="providerEmail"
              value={formData.providerEmail}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              placeholder="contact@example.com"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"} mb-2`}>
              Provider Phone
            </label>
            <input
              type="tel"
              name="providerPhone"
              value={formData.providerPhone}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              placeholder="+1-555-0123"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 w-full sm:w-auto shadow-lg"
          >
            Create Event
          </button>
          <button
            type="button"
            onClick={onCancel}
            className={`${darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-500 hover:bg-gray-600 text-white"} px-8 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto`}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

// Enhanced Student Stats Component
const StudentStats = ({ events, bookmarkedEvents, ratings, darkMode }) => {
  const upcomingEvents = events.filter((event) => {
    const eventDateTime = new Date(`${event.date}T${event.time}`)
    return eventDateTime >= new Date() && event.approved
  }).length

  const attendedEvents = events.filter((event) => {
    const eventDateTime = new Date(`${event.date}T${event.time}`)
    return eventDateTime < new Date() && ratings[event.id]
  }).length

  const averageRating =
    Object.values(ratings).length > 0
      ? (Object.values(ratings).reduce((sum, rating) => sum + rating, 0) / Object.values(ratings).length).toFixed(1)
      : 0

  const stats = [
    {
      title: "Upcoming Events",
      value: upcomingEvents,
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
      bgColor: darkMode ? "bg-blue-900/20" : "bg-blue-50",
    },
    {
      title: "Bookmarked",
      value: bookmarkedEvents.length,
      icon: Heart,
      color: "from-red-500 to-red-600",
      bgColor: darkMode ? "bg-red-900/20" : "bg-red-50",
    },
    {
      title: "Attended",
      value: attendedEvents,
      icon: History,
      color: "from-green-500 to-green-600",
      bgColor: darkMode ? "bg-green-900/20" : "bg-green-50",
    },
    {
      title: "Avg Rating",
      value: averageRating,
      icon: Star,
      color: "from-yellow-500 to-yellow-600",
      bgColor: darkMode ? "bg-yellow-900/20" : "bg-yellow-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-xl shadow-lg p-4 sm:p-6 border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
        >
          <div className="flex items-center">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} ${stat.bgColor}`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-500"}`}>{stat.title}</p>
              <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Search and Filter Component
const SearchFilter = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, darkMode }) => {
  const categories = ["All", "Programming", "Marketing", "Design", "Data Science", "Blockchain", "Business", "Other"]

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search
          size={20}
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        />
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        />
      </div>
      <div className="relative">
        <Filter
          size={20}
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={`pl-10 pr-8 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
            darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
          }`}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

// Main App Component
const App = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [events, setEvents] = useState(initialEvents)
  const [showEventForm, setShowEventForm] = useState(false)
  const [contactModal, setContactModal] = useState({ isOpen: false, event: null })
  const [bookmarkedEvents, setBookmarkedEvents] = useState([1, 2])
  const [ratings, setRatings] = useState({ 3: 4 })
  const [studentView, setStudentView] = useState("upcoming")
  const [darkMode, setDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showDropdown, setShowDropdown] = useState(false)
  const [showFAQ, setShowFAQ] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New event: Advanced React Workshop", read: false },
    { id: 2, message: "Event reminder: Digital Marketing starts in 2 days", read: false },
  ])

  // Check for existing user session and dark mode preference
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser")
    const savedDarkMode = localStorage.getItem("darkMode")

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    }

    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode))
    }

    // Initialize demo users if not exists
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    if (users.length === 0) {
      const demoUsers = [
        { id: 1, email: "student@demo.com", password: "password", name: "Demo Student", type: "student" },
        { id: 2, email: "admin@demo.com", password: "password", name: "Demo Admin", type: "admin" },
      ]
      localStorage.setItem("users", JSON.stringify(demoUsers))
    }
  }, [])

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
  }, [darkMode])

  const handleLogin = (user) => {
    setCurrentUser(user)
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    setCurrentUser(null)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Filter events based on search and category
  const filterEvents = (eventsList) => {
    return eventsList.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.providerName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || event.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }

  // Filter events based on user type and view
  const upcomingEvents = filterEvents(
    events.filter((event) => {
      const eventDateTime = new Date(`${event.date}T${event.time}`)
      return eventDateTime >= new Date() && event.approved
    }),
  )

  const pastEvents = filterEvents(
    events.filter((event) => {
      const eventDateTime = new Date(`${event.date}T${event.time}`)
      return eventDateTime < new Date()
    }),
  )

  const bookmarkedEventsList = filterEvents(events.filter((event) => bookmarkedEvents.includes(event.id)))

  const handleCreateEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: Date.now(),
      approved: true,
      createdAt: new Date().toISOString(),
    }
    setEvents([...events, newEvent])
    setShowEventForm(false)
  }

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId))
  }

  const handleContact = (event) => {
    setContactModal({ isOpen: true, event })
  }

  const closeContactModal = () => {
    setContactModal({ isOpen: false, event: null })
  }

  const handleBookmark = (eventId) => {
    setBookmarkedEvents((prev) => (prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]))
  }

  const handleRate = (eventId, rating) => {
    setRatings((prev) => ({
      ...prev,
      [eventId]: rating,
    }))
  }

  const getStudentViewEvents = () => {
    switch (studentView) {
      case "upcoming":
        return upcomingEvents
      case "past":
        return pastEvents
      case "bookmarked":
        return bookmarkedEventsList
      default:
        return upcomingEvents
    }
  }

  const exportData = () => {
    const dataToExport = {
      events,
      bookmarkedEvents,
      ratings,
      exportDate: new Date().toISOString(),
    }
    const dataStr = JSON.stringify(dataToExport, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `skillbridge-data-${new Date().toISOString().split("T")[0]}.json`
    link.click()
  }

  // Show login form if no user is logged in
  if (!currentUser) {
    return <AuthForm onLogin={handleLogin} darkMode={darkMode} />
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Header */}
      <header
        className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-lg border-b transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 sm:py-0 sm:h-16">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <h1 className={`text-xl sm:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                SkillBridge
              </h1>
              <span
                className={`ml-3 px-3 py-1 text-xs rounded-full font-medium ${
                  currentUser.type === "admin"
                    ? "bg-gradient-to-r from-red-500 to-pink-600 text-white"
                    : "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                }`}
              >
                {currentUser.type === "admin" ? "Admin" : "Student"}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  className={`p-2 rounded-lg ${darkMode ? "text-gray-300 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"} transition-colors relative`}
                >
                  <Bell size={20} />
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.filter((n) => !n.read).length}
                    </span>
                  )}
                </button>
              </div>
              <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"} hidden sm:block`}>
                Welcome, {currentUser.name}
              </span>
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className={`p-2 rounded-lg ${darkMode ? "text-gray-300 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"} transition-colors`}
                >
                  <MoreVertical size={20} />
                </button>
                {showDropdown && (
                  <div
                    className={`absolute right-0 mt-2 w-48 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-lg shadow-xl border z-50`}
                  >
                    <button
                      onClick={() => {
                        setShowFAQ(true)
                        setShowDropdown(false)
                      }}
                      className={`w-full px-4 py-3 text-left flex items-center ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-50"} transition-colors`}
                    >
                      <HelpCircle size={16} className="mr-3" />
                      FAQ
                    </button>
                    <button
                      onClick={() => {
                        setShowHelp(true)
                        setShowDropdown(false)
                      }}
                      className={`w-full px-4 py-3 text-left flex items-center ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-50"} transition-colors`}
                    >
                      <Settings size={16} className="mr-3" />
                      Help & Guide
                    </button>
                    <button
                      onClick={() => {
                        exportData()
                        setShowDropdown(false)
                      }}
                      className={`w-full px-4 py-3 text-left flex items-center ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-50"} transition-colors`}
                    >
                      <Download size={16} className="mr-3" />
                      Export Data
                    </button>
                    <button
                      onClick={() => {
                        toggleDarkMode()
                        setShowDropdown(false)
                      }}
                      className={`w-full px-4 py-3 text-left flex items-center ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-50"} transition-colors`}
                    >
                      {darkMode ? <Sun size={16} className="mr-3" /> : <Moon size={16} className="mr-3" />}
                      {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                    <div className={`border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                      <button
                        onClick={handleLogout}
                        className={`w-full px-4 py-3 text-left flex items-center ${darkMode ? "text-red-400 hover:bg-gray-700" : "text-red-600 hover:bg-red-50"} transition-colors`}
                      >
                        <LogOut size={16} className="mr-3" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {currentUser.type === "student" ? (
          <div>
            <div className="mb-6 sm:mb-8 text-center sm:text-left">
              <h2 className={`text-2xl sm:text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"} mb-2`}>
                Student Dashboard
              </h2>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} text-sm sm:text-base`}>
                Track your learning journey and discover amazing events
              </p>
            </div>

            <StudentStats events={events} bookmarkedEvents={bookmarkedEvents} ratings={ratings} darkMode={darkMode} />

            <SearchFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              darkMode={darkMode}
            />

            <div
              className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-xl shadow-lg mb-6 border`}
            >
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                  <h3 className={`text-base sm:text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                    My Events
                  </h3>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                      onClick={() => setStudentView("upcoming")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        studentView === "upcoming"
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                          : `${darkMode ? "text-gray-300 hover:text-white hover:bg-gray-700" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`
                      }`}
                    >
                      Upcoming ({upcomingEvents.length})
                    </button>
                    <button
                      onClick={() => setStudentView("past")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        studentView === "past"
                          ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                          : `${darkMode ? "text-gray-300 hover:text-white hover:bg-gray-700" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`
                      }`}
                    >
                      Past Events ({pastEvents.length})
                    </button>
                    <button
                      onClick={() => setStudentView("bookmarked")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        studentView === "bookmarked"
                          ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                          : `${darkMode ? "text-gray-300 hover:text-white hover:bg-gray-700" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`
                      }`}
                    >
                      Bookmarked ({bookmarkedEvents.length})
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                {getStudentViewEvents().length === 0 ? (
                  <div className="text-center py-12">
                    <div
                      className={`mx-auto h-16 w-16 ${darkMode ? "bg-gray-700" : "bg-gray-100"} rounded-full flex items-center justify-center mb-4`}
                    >
                      <Calendar size={32} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                    </div>
                    <h3 className={`text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"} mb-2`}>
                      No events found
                    </h3>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm sm:text-base px-4`}>
                      {studentView === "upcoming" && "No upcoming events match your search."}
                      {studentView === "past" && "No past events match your search."}
                      {studentView === "bookmarked" && "No bookmarked events match your search."}
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {getStudentViewEvents().map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        onContact={handleContact}
                        isStudent={true}
                        onBookmark={handleBookmark}
                        onRate={handleRate}
                        isBookmarked={bookmarkedEvents.includes(event.id)}
                        userRating={ratings[event.id] || 0}
                        darkMode={darkMode}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
              <div className="text-center sm:text-left">
                <h2 className={`text-2xl sm:text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"} mb-2`}>
                  Admin Dashboard
                </h2>
                <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} text-sm sm:text-base`}>
                  Manage events and monitor platform performance
                </p>
              </div>
              <button
                onClick={() => setShowEventForm(!showEventForm)}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center w-full sm:w-auto shadow-lg"
              >
                <Plus size={20} className="mr-2" />
                Create Event
              </button>
            </div>

            {/* Admin Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div
                className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-xl shadow-lg p-4 sm:p-6 border hover:shadow-xl transition-all duration-300`}
              >
                <div className="flex items-center">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                      Total Events
                    </p>
                    <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{events.length}</p>
                  </div>
                </div>
              </div>
              <div
                className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-xl shadow-lg p-4 sm:p-6 border hover:shadow-xl transition-all duration-300`}
              >
                <div className="flex items-center">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                      Active Events
                    </p>
                    <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {upcomingEvents.length}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-xl shadow-lg p-4 sm:p-6 border hover:shadow-xl transition-all duration-300`}
              >
                <div className="flex items-center">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-500"}`}>Categories</p>
                    <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {[...new Set(events.map((e) => e.category))].length}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-xl shadow-lg p-4 sm:p-6 border hover:shadow-xl transition-all duration-300`}
              >
                <div className="flex items-center">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-500"}`}>Avg Rating</p>
                    <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {Object.values(ratings).length > 0
                        ? (
                            Object.values(ratings).reduce((sum, rating) => sum + rating, 0) /
                            Object.values(ratings).length
                          ).toFixed(1)
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <SearchFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              darkMode={darkMode}
            />

            {showEventForm && (
              <div className="mb-6 sm:mb-8">
                <EventForm onSubmit={handleCreateEvent} onCancel={() => setShowEventForm(false)} darkMode={darkMode} />
              </div>
            )}

            <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-xl shadow-lg border`}>
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className={`text-base sm:text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                  All Events ({filterEvents(events).length})
                </h3>
              </div>
              <div className="p-4 sm:p-6">
                {filterEvents(events).length === 0 ? (
                  <div className="text-center py-12">
                    <div
                      className={`mx-auto h-16 w-16 ${darkMode ? "bg-gray-700" : "bg-gray-100"} rounded-full flex items-center justify-center mb-4`}
                    >
                      <Calendar size={32} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                    </div>
                    <h3 className={`text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"} mb-2`}>
                      No events found
                    </h3>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {events.length === 0 ? "No events created yet." : "No events match your search criteria."}
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {filterEvents(events).map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        isAdmin={true}
                        onDelete={handleDeleteEvent}
                        darkMode={darkMode}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      <ContactModal
        event={contactModal.event}
        isOpen={contactModal.isOpen}
        onClose={closeContactModal}
        darkMode={darkMode}
      />
      <FAQModal isOpen={showFAQ} onClose={() => setShowFAQ(false)} darkMode={darkMode} />
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} userType={currentUser.type} darkMode={darkMode} />

      {/* Click outside to close dropdown */}
      {showDropdown && <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />}
    </div>
  )
}

export default App
