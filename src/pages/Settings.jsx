"use client"

import { useState, useEffect } from "react"
import { User, Bell, Save, Check } from "lucide-react"
import { toast } from "react-toastify"

export default function Settings() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    notifications: true,
  })

  const [originalData, setOriginalData] = useState({
    username: "",
    email: "",
    notifications: true,
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("userSettings")
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings)
        setFormData(parsedSettings)
        setOriginalData(parsedSettings) // Store original data for comparison
      } catch (error) {
        console.error("Error parsing saved settings:", error)
      }
    }
  }, [])

  // Check if form has changes (with trimming for comparison)
  const hasChanges = () => {
    const trimmedFormData = {
      username: formData.username.trim(),
      email: formData.email.trim(),
      notifications: formData.notifications,
    }

    const trimmedOriginalData = {
      username: originalData.username.trim(),
      email: originalData.email.trim(),
      notifications: originalData.notifications,
    }

    return (
      trimmedFormData.username !== trimmedOriginalData.username ||
      trimmedFormData.email !== trimmedOriginalData.email ||
      trimmedFormData.notifications !== trimmedOriginalData.notifications
    )
  }

  // Check if form has valid data (after trimming)
  const hasValidData = () => {
    const trimmedUsername = formData.username.trim()
    const trimmedEmail = formData.email.trim()
    return trimmedUsername.length > 0 || trimmedEmail.length > 0
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSaveChanges = async () => {
    setIsSaving(true)
    setSaveSuccess(false)

    try {
      // Trim whitespace from text inputs before saving
      const trimmedData = {
        ...formData,
        username: formData.username.trim(),
        email: formData.email.trim(),
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Save to localStorage
      localStorage.setItem("userSettings", JSON.stringify(trimmedData))

      // Update both form data and original data with trimmed values
      setFormData(trimmedData)
      setOriginalData(trimmedData)

      setSaveSuccess(true)
      toast.success("Settings updated successfully!")
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error) {
      toast.error("Error saving settings, please try again!")
      console.error("Error saving settings:", error)
    } finally {
      setIsSaving(false)
    }
  }

  // Auto-save notifications setting when changed (but not username/email)
  useEffect(() => {
    // Only auto-save if notifications changed, not username/email
    if (formData.notifications !== originalData.notifications) {
      const timeoutId = setTimeout(() => {
        const updatedData = { ...originalData, notifications: formData.notifications }
        localStorage.setItem("userSettings", JSON.stringify(updatedData))
        setOriginalData(updatedData)
      }, 500)

      return () => clearTimeout(timeoutId)
    }
  }, [formData.notifications, originalData])

  return (
    <div className="px-4 md:px-12 lg:px-24 py-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Settings</h1>
            <p className="text-slate-500 text-sm">Manage your account preferences</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Profile Section */}
          <section className="bg-white rounded-2xl border border-slate-200/60 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-slate-600" />
              </div>
              <h2 className="text-lg font-semibold text-slate-700">Profile Information</h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-slate-600 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
              <div className="text-sm text-slate-500">
                Changes will be saved to your browser's local storage
                {hasChanges() && (
                  <span className="block text-amber-600 font-medium mt-1">• You have unsaved changes</span>
                )}
              </div>
              <button
                onClick={handleSaveChanges}
                disabled={isSaving || !hasValidData() || !hasChanges()}
                className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : saveSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="bg-white rounded-2xl border border-slate-200/60 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                <Bell className="w-4 h-4 text-slate-600" />
              </div>
              <h2 className="text-lg font-semibold text-slate-700">Notification Preferences</h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    name="notifications"
                    type="checkbox"
                    checked={formData.notifications}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-teal-600 border-2 border-slate-300 rounded focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                    Email Renewal Reminders
                  </div>
                  <div className="text-sm text-slate-500 mt-1">
                    Get notified via email before your subscriptions renew to avoid unexpected charges
                  </div>
                </div>
              </label>

              <div className="pl-9 text-xs text-slate-400">
                {formData.notifications ? "✓ Notifications enabled" : "✗ Notifications disabled"} • Auto-saved
              </div>
            </div>
          </section>

          {/* Current Settings Preview */}
          <section className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl border border-slate-200/60 p-8">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Current Settings</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-lg p-4 border border-slate-200/60">
                <div className="text-sm font-medium text-slate-500">Username</div>
                <div className="text-slate-800 font-medium mt-1">{formData.username.trim() || "Not set"}</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-slate-200/60">
                <div className="text-sm font-medium text-slate-500">Email</div>
                <div className="text-slate-800 font-medium mt-1">{formData.email.trim() || "Not set"}</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-slate-200/60">
                <div className="text-sm font-medium text-slate-500">Notifications</div>
                <div className="text-slate-800 font-medium mt-1">{formData.notifications ? "Enabled" : "Disabled"}</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
