import React, { useState } from 'react';
import studyBuddyLogo from '../assets/images/study_buddy_logo_1790332834397.jpg';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Clock,
  GraduationCap,
  Sparkles,
  RotateCcw
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Email format validator
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const validateField = (field: 'name' | 'email' | 'message', value: string) => {
    let err = '';
    const trimmed = value.trim();

    if (field === 'name') {
      if (!trimmed) {
        err = 'Please enter your name.';
      } else if (trimmed.length < 2) {
        err = 'Name must be at least 2 characters.';
      }
    } else if (field === 'email') {
      if (!trimmed) {
        err = 'Please enter your email address.';
      } else if (!isValidEmail(trimmed)) {
        err = 'Please enter a valid email address (e.g., student@example.com).';
      }
    } else if (field === 'message') {
      if (!trimmed) {
        err = 'Please write your message.';
      } else if (trimmed.length < 10) {
        err = 'Please provide at least 10 characters so we can understand your query.';
      }
    }

    setErrors((prev) => ({ ...prev, [field]: err }));
    return err === '';
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name as keyof typeof touched]) {
      validateField(name as 'name' | 'email' | 'message', value);
    }
  };

  const handleBlur = (field: 'name' | 'email' | 'message') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      message: true,
    });

    const isNameValid = validateField('name', formData.name);
    const isEmailValid = validateField('email', formData.email);
    const isMessageValid = validateField('message', formData.message);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable educational server submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset the form fields as requested
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      setTouched({
        name: false,
        email: false,
        message: false,
      });
      setErrors({
        name: '',
        email: '',
        message: '',
      });
    }, 600);
  };

  const handleSendAnother = () => {
    setIsSubmitted(false);
  };

  return (
    <div id="contact-view" className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-5 sm:p-7 shadow-xs transition-colors">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-[#3F72AF] dark:text-[#DBE2EF] text-xs font-bold uppercase tracking-wider mb-1">
            <Mail className="w-4 h-4" />
            <span>Student & Academy Support</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#112D4E] dark:text-white tracking-tight">
            Contact Us
          </h2>
          <p className="text-xs sm:text-sm text-[#112D4E]/75 dark:text-[#DBE2EF]/80 mt-1 leading-relaxed">
            Have questions about Study Buddy Academy courses, study tools, or need academic assistance? Reach out to us below.
          </p>
        </div>
      </div>

      {/* Main Grid: Contact Form & Academy Information */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Container (7 cols on lg) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-5 sm:p-8 shadow-xs transition-colors">
          {isSubmitted ? (
            /* Success Card State */
            <div
              id="contact-success-message"
              className="py-6 sm:py-10 text-center space-y-5 animate-in zoom-in-95 duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-xl sm:text-2xl font-bold text-[#112D4E] dark:text-white tracking-tight">
                  Thank you! Your message has been sent successfully.
                </h3>
                <p className="text-xs sm:text-sm text-[#112D4E]/75 dark:text-[#DBE2EF]/80 leading-relaxed">
                  Our academic support team has received your inquiry. We typically reply to student emails within 24 hours.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSendAnother}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3F72AF] hover:bg-[#315d91] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer min-h-[44px]"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Send Another Message</span>
                </button>
              </div>
            </div>
          ) : (
            /* Contact Form */
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-[#112D4E] dark:text-white">
                  Send a Message
                </h3>
                <p className="text-xs sm:text-sm text-[#112D4E]/70 dark:text-[#DBE2EF]/80">
                  Fill out the form below and we will get back to you promptly.
                </p>
              </div>

              {/* Name Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="contact-name"
                    className="text-xs sm:text-sm font-semibold text-[#112D4E] dark:text-[#DBE2EF]"
                  >
                    Name <span className="text-rose-600 dark:text-rose-400">*</span>
                  </label>
                  {touched.name && errors.name && (
                    <span className="text-[11px] font-medium text-rose-600 dark:text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur('name')}
                  placeholder="Enter your name"
                  required
                  className={`w-full px-4 py-3 rounded-xl text-xs sm:text-sm border bg-[#F9F7F7] dark:bg-[#0e243e] text-[#112D4E] dark:text-white placeholder-[#112D4E]/40 dark:placeholder-[#DBE2EF]/40 transition-all duration-150 focus:outline-none focus:ring-2 ${
                    touched.name && errors.name
                      ? 'border-rose-400 dark:border-rose-600 focus:ring-rose-500/20'
                      : 'border-[#DBE2EF] dark:border-[#1c3e66] focus:border-[#3F72AF] focus:ring-[#3F72AF]/20'
                  }`}
                />
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="contact-email"
                    className="text-xs sm:text-sm font-semibold text-[#112D4E] dark:text-[#DBE2EF]"
                  >
                    Email <span className="text-rose-600 dark:text-rose-400">*</span>
                  </label>
                  {touched.email && errors.email && (
                    <span className="text-[11px] font-medium text-rose-600 dark:text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </span>
                  )}
                </div>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  placeholder="Enter your email"
                  required
                  className={`w-full px-4 py-3 rounded-xl text-xs sm:text-sm border bg-[#F9F7F7] dark:bg-[#0e243e] text-[#112D4E] dark:text-white placeholder-[#112D4E]/40 dark:placeholder-[#DBE2EF]/40 transition-all duration-150 focus:outline-none focus:ring-2 ${
                    touched.email && errors.email
                      ? 'border-rose-400 dark:border-rose-600 focus:ring-rose-500/20'
                      : 'border-[#DBE2EF] dark:border-[#1c3e66] focus:border-[#3F72AF] focus:ring-[#3F72AF]/20'
                  }`}
                />
              </div>

              {/* Message Field (Larger textarea) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="contact-message"
                    className="text-xs sm:text-sm font-semibold text-[#112D4E] dark:text-[#DBE2EF]"
                  >
                    Message <span className="text-rose-600 dark:text-rose-400">*</span>
                  </label>
                  {touched.message && errors.message && (
                    <span className="text-[11px] font-medium text-rose-600 dark:text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </span>
                  )}
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={() => handleBlur('message')}
                  placeholder="Write your message here..."
                  required
                  className={`w-full px-4 py-3 rounded-xl text-xs sm:text-sm border bg-[#F9F7F7] dark:bg-[#0e243e] text-[#112D4E] dark:text-white placeholder-[#112D4E]/40 dark:placeholder-[#DBE2EF]/40 transition-all duration-150 focus:outline-none focus:ring-2 resize-y min-h-[120px] ${
                    touched.message && errors.message
                      ? 'border-rose-400 dark:border-rose-600 focus:ring-rose-500/20'
                      : 'border-[#DBE2EF] dark:border-[#1c3e66] focus:border-[#3F72AF] focus:ring-[#3F72AF]/20'
                  }`}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#3F72AF] hover:bg-[#315d91] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm transition-all shadow-xs hover:shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed min-h-[44px]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Informational Cards (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Academy Contact Info Card */}
          <div className="bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-5 sm:p-6 shadow-xs space-y-4 transition-colors">
            <div className="flex items-center gap-3">
              <img
                src={studyBuddyLogo}
                alt="Study Buddy Academy Logo"
                width="40"
                height="40"
                className="w-10 h-10 rounded-xl object-contain aspect-square border border-[#3F72AF]/30 dark:border-[#244b7a] shadow-2xs shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="font-bold text-sm sm:text-base text-[#112D4E] dark:text-white">
                  Study Buddy Academy
                </h4>
                <p className="text-xs text-[#112D4E]/70 dark:text-[#DBE2EF]/75">
                  Academic Support & Student Inquiries
                </p>
              </div>
            </div>

            <div className="pt-2 space-y-3.5 text-xs sm:text-sm text-[#112D4E]/80 dark:text-[#DBE2EF]/85">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#3F72AF] dark:text-[#DBE2EF] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#112D4E] dark:text-white font-semibold">
                    Campus Affiliation
                  </strong>
                  <span>BS Computer Science, Dawood University of Engineering & Technology</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#3F72AF] dark:text-[#DBE2EF] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#112D4E] dark:text-white font-semibold">
                    Direct Email
                  </strong>
                  <a
                    href="mailto:libra.tanveer16@gmail.com"
                    className="text-[#3F72AF] dark:text-[#DBE2EF] hover:underline break-all font-medium"
                  >
                    libra.tanveer16@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#3F72AF] dark:text-[#DBE2EF] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#112D4E] dark:text-white font-semibold">
                    Response Hours
                  </strong>
                  <span>Monday – Saturday (9:00 AM – 6:00 PM PKT)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ / Assistance Card */}
          <div className="bg-[#DBE2EF]/40 dark:bg-[#112D4E]/60 rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-5 sm:p-6 space-y-3 transition-colors">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3F72AF] dark:text-[#DBE2EF]">
              <Sparkles className="w-4 h-4" />
              <span>Quick Help Tips</span>
            </div>
            <ul className="space-y-2 text-xs text-[#112D4E]/80 dark:text-[#DBE2EF]/80 leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-[#3F72AF] font-bold">•</span>
                <span><strong>Quizzes & Scores:</strong> Practice quizzes are automatically recorded in the Progress dashboard.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#3F72AF] font-bold">•</span>
                <span><strong>Flashcards:</strong> Tap or press Space/Enter to flip any card, or use the Known/Review status markers.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#3F72AF] font-bold">•</span>
                <span><strong>Focus Timer:</strong> Built-in 25-minute Pomodoro sessions track directly into your weekly study statistics.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
