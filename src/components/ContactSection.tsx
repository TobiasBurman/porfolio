import React, { useState } from "react";
import { MessageCircle, Linkedin, Instagram, CheckCircle, XCircle } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  submit?: string;
}

const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Email validation regex
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear specific field error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous submit status
    setSubmitStatus('idle');
    setErrors({});

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setErrors({ submit: result.message || 'Failed to send message' });
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrors({ submit: 'Network error. Please check if the server is running.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const syntheticEvent = {
        preventDefault: () => {},
        currentTarget: e.currentTarget,
        target: e.target,
      } as React.FormEvent;
      handleSubmit(syntheticEvent);
    }
  };

  return (
    <div id="contact" className="w-full h-[750px] text-white px-8 py-16 mb-40">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold gradient-text tracking-tight mt-20 mb-40">
            Contact Me
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Side */}
          <div className="space-y-12">
            {/* Main Heading */}
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                <span className="gradient-text bg-clip-text text-transparent">
                  DO YOU HAVE A PROJECT TO DISCUSS?
                </span>
              </h2>

              <div className="flex items-center gap-3 text-xl lg:text-2xl font-semibold text-gray-300">
                <MessageCircle className="w-6 h-6" />
                <span>GET IN TOUCH</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="inline-flex items-center gap-16">
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-3">
                  CONTACT
                </h3>
                <a
                  href="mailto:web.smm.zty@gmail.com"
                  className="text-blue-400 hover:text-blue-300 transition-colors text-lg"
                >
                  tobias.burman99@gmail.com
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-4">
                  SOCIAL MEDIA
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/tobiasburman/"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-gray-300" />
                  </a>
                  <a
                    href="https://open.spotify.com/artist/2UzEl9inDvisSmAAUcfULc?si=vA3OzQIXRryMKksFNv5P3A"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                    aria-label="Spotify"
                  >
                    <FontAwesomeIcon
                      icon={faSpotify}
                      className="w-5 h-5 text-gray-300"
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/tobbecageman/"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 text-gray-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-300 mb-8">
              CONTACT FORM
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6" onKeyPress={handleKeyPress}>
              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="flex items-center gap-2 p-4 bg-green-800/20 border border-green-600 rounded-lg text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}

              {submitStatus === 'error' && errors.submit && (
                <div className="flex items-center gap-2 p-4 bg-red-800/20 border border-red-600 rounded-lg text-red-400">
                  <XCircle className="w-5 h-5" />
                  <span>{errors.submit}</span>
                </div>
              )}

              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-300 mb-2 text-sm font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
                    errors.name 
                      ? 'border-red-500 focus:border-red-400 focus:ring-red-400' 
                      : 'border-gray-600 focus:border-purple-400 focus:ring-purple-400'
                  }`}
                  placeholder="Your full name"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-300 mb-2 text-sm font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-400 focus:ring-red-400' 
                      : 'border-gray-600 focus:border-purple-400 focus:ring-purple-400'
                  }`}
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-300 mb-2 text-sm font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors resize-none ${
                    errors.message 
                      ? 'border-red-500 focus:border-red-400 focus:ring-red-400' 
                      : 'border-gray-600 focus:border-purple-400 focus:ring-purple-400'
                  }`}
                  placeholder="Tell me about your project or just say hello..."
                  disabled={isSubmitting}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-lg text-gray-300 gradient-border font-semibold transition-all duration-300 transform shadow-lg ${
                  isSubmitting 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:scale-105'
                }`}
              >
                {isSubmitting ? 'SENDING...' : 'SEND'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
