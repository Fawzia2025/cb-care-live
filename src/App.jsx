import React, { useState } from "react";
import {
  Home,
  Users,
  Briefcase,
  Mail,
  CheckCircle,
  Shield,
  HeartHandshake,
  Award,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import emailjs from "emailjs-com";

// Define ServiceDetailPage component outside App for clarity and to resolve potential parsing issues
const ServiceDetailPage = (
  { service, onBack } // Added opening parenthesis here
) => (
  <section className="py-16 bg-gray-100 min-h-screen">
    <div className="container mx-auto px-4 max-w-4xl">
      <button
        onClick={onBack}
        className="flex items-center text-blue-700 hover:text-blue-900 font-semibold mb-8 text-lg transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to All Services
      </button>
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-4xl font-bold text-blue-800 mb-6">
          {service.name}
        </h2>
        <p className="text-lg leading-relaxed mb-4">{service.details}</p>
        <p className="text-base text-gray-700 italic">
          For more detailed information or to discuss a personalized care plan,
          please contact us directly.
        </p>
        {/* Optionally add contact information or a mini-form here */}
      </div>
    </div>
  </section>
); // Added closing parenthesis here

// Add Gemini API call function
async function getGeminiRecommendation(input) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API key is missing. Please set VITE_GEMINI_API_KEY in your .env file.");
  }
  // Example Gemini API endpoint (replace with actual endpoint if different)
  const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey;
  const body = {
    contents: [
      {
        parts: [
          { text: `Suggest the most relevant care services for the following needs: ${input}` }
        ]
      }
    ]
  };
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    throw new Error("Failed to get recommendation from Gemini API");
  }
  const data = await response.json();
  // Parse the response to get the recommendation text
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No recommendation found.";
}

const EMAILJS_SERVICE_ID = "service_mhbdu6x"; // <-- You need to fill in your actual EmailJS service ID
const EMAILJS_TEMPLATE_ID = "template_f76qyqe";
const EMAILJS_USER_ID = "Yy6gyZz5u9MhzViD1";

const App = () => {
  // State to manage which service detail page is currently displayed
  const [selectedService, setSelectedService] = useState(null);
  // State for the AI recommendation input and output
  const [careNeedsInput, setCareNeedsInput] = useState("");
  const [recommendationOutput, setRecommendationOutput] = useState("");
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(false);

  // State for contact form
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Add handler for recommendation button
  const handleGetRecommendation = async () => {
    setIsLoadingRecommendation(true);
    setRecommendationOutput("");
    try {
      const recommendation = await getGeminiRecommendation(careNeedsInput);
      setRecommendationOutput(recommendation);
    } catch (error) {
      setRecommendationOutput(error.message);
    } finally {
      setIsLoadingRecommendation(false);
    }
  };

  // EmailJS handler
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setContactStatus("");
    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: contactName,
          from_email: contactEmail,
          message: contactMessage,
        },
        EMAILJS_USER_ID
      );
      setContactStatus("Message sent successfully!");
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    } catch (error) {
      setContactStatus("Failed to send message. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  // Define a consistent color palette using Tailwind CSS classes
  const primaryColor = "bg-blue-700"; // Darker blue for accents - used for header, footer and contact section
  const secondaryColor = "bg-blue-600"; // Slightly lighter blue - currently unused, but kept for palette
  const accentColor = "bg-green-500"; // Green for highlights (e.g., call to action button)
  const textColor = "text-gray-800"; // Standard text color
  const lightTextColor = "text-gray-600"; // Lighter text color for descriptions
  const whiteText = "text-white"; // White text for dark backgrounds

  // Dummy content for sections and extended service details
  const services = [
    {
      name: "Personal Care",
      description:
        "Assistance with daily tasks like washing, dressing, and grooming.",
      details:
        "Our personal care services are designed to support daily living activities, ensuring comfort, dignity, and independence. This includes help with bathing, dressing, personal hygiene, and mobility support. Our compassionate caregivers respect your privacy and preferences, working to maintain your routine.",
    },
    {
      name: "Respite Care",
      description:
        "Temporary relief for primary caregivers, from a few hours to weeks.",
      details:
        "Respite care provides temporary relief for family caregivers, offering them a much-needed break from their caregiving responsibilities. Whether for a few hours, a day, a weekend, or longer, our professional caregivers can step in to provide seamless support, allowing primary carers to rest and recharge.",
    },
    {
      name: "Emergency Care",
      description:
        "Rapid response care for unexpected situations or urgent needs.",
      details:
        "Our emergency care services offer rapid and reliable support for unexpected situations. We can quickly arrange for a caregiver to provide immediate assistance when urgent care is needed, ensuring safety and peace of mind during challenging times.",
    },
    {
      name: "Live-in Care",
      description:
        "Full-time, round-the-clock support in the comfort of your home.",
      details:
        "Live-in care provides continuous, one-to-one support from a dedicated caregiver who lives in your home. This ensures 24/7 assistance and companionship, offering a true alternative to residential care while maintaining the comfort and familiarity of your own surroundings.",
    },
    {
      name: "Overnight Care",
      description: "Support and reassurance throughout the night.",
      details:
        "Overnight care provides professional support during nighttime hours, offering reassurance and assistance with personal care, medication, or mobility. Our caregivers can be awake or sleeping, depending on your needs, ensuring you or your loved one feel safe and supported through the night.",
    },
    {
      name: "Companionship",
      description:
        "Friendly visits and social engagement to reduce loneliness.",
      details:
        "Our companionship services focus on enriching lives through social interaction and engagement. Caregivers provide friendly visits, accompany service users on outings, engage in hobbies, and offer emotional support to combat loneliness and promote mental well-being.",
    },
    {
      name: "Dementia Care",
      description:
        "Specialized support for individuals living with dementia, focusing on dignity.",
      details:
        "Our specialized dementia care is delivered by trained caregivers who understand the complexities of dementia. We provide compassionate support that focuses on maintaining dignity, promoting cognitive engagement, and creating a safe, familiar, and supportive environment for individuals living with dementia.",
    },
    {
      name: "Cancer Support",
      description:
        "Compassionate care tailored to the needs of individuals undergoing cancer treatment.",
      details:
        "Our cancer support care offers sensitive and tailored assistance for individuals undergoing cancer treatment and during recovery. This includes managing symptoms, providing practical help around the home, assisting with appointments, and offering emotional support with understanding and empathy.",
    },
    {
      name: "Stroke Recovery Support",
      description:
        "Assistance with rehabilitation and daily living after a stroke.",
      details:
        "Stroke recovery support focuses on aiding rehabilitation and managing daily living activities after a stroke. Our caregivers assist with mobility exercises, personal care, medication management, and provide encouragement to regain independence and improve quality of life.",
    },
    {
      name: "Parkinson's Care",
      description:
        "Specialized support managing symptoms and promoting independence.",
      details:
        "Our Parkinson's care is specialized to help manage the unique symptoms and challenges associated with Parkinson's disease. Caregivers assist with medication routines, mobility, personal care, and provide tailored support to promote independence and enhance daily living.",
    },
    {
      name: "Disability Care",
      description:
        "Tailored care plans to support individuals with various disabilities.",
      details:
        "We provide tailored disability care plans designed to empower individuals with various physical or learning disabilities to live as independently as possible. Support can include personal care, mobility assistance, community integration, and help with daily tasks, all focused on individual goals and preferences.",
    },
    {
      name: "Palliative Care",
      description:
        "Comfort and support for individuals with life-limiting illnesses, and their families.",
      details:
        "Our palliative care focuses on providing comfort and support to individuals with life-limiting illnesses and their families. We aim to enhance the quality of life by managing pain and other symptoms, offering emotional support, and respecting individual wishes and dignity during difficult times.",
    },
  ];

  const values = [
    {
      icon: HeartHandshake,
      title: "Compassion",
      description: "Delivering care with genuine kindness and empathy.",
    },
    {
      icon: Award,
      title: "Quality",
      description:
        "Committed to the highest standards of care and continuous improvement.",
    },
    {
      icon: Shield,
      title: "Trust",
      description:
        "Building strong relationships based on reliability and transparency.",
    },
    {
      icon: CheckCircle,
      title: "Respect",
      description: "Upholding dignity and individuality in every interaction.",
    },
  ];

  return (
    <div
      className={`min-h-screen bg-gray-50 font-sans antialiased ${textColor}`}
    >
      {/* Header - Reverted to original blue background and logo/text */}
      <header className={`${primaryColor} py-4 shadow-md`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {/* Original Home icon and text logo */}
            <Home className={`${whiteText} w-8 h-8`} />
            <h1 className={`text-3xl font-bold ${whiteText}`}>
              Central Bridge Care
            </h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              {/* Navigation links reverted to whiteText */}
              <li>
                <a
                  href="#home"
                  className={`hover:text-blue-200 transition-colors ${whiteText}`}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className={`hover:text-blue-200 transition-colors ${whiteText}`}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className={`hover:text-blue-200 transition-colors ${whiteText}`}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={`hover:text-blue-200 transition-colors ${whiteText}`}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Conditionally render ServiceDetailPage or main content */}
      {selectedService ? (
        <ServiceDetailPage
          service={selectedService}
          onBack={() => setSelectedService(null)}
        />
      ) : (
        <>
          {/* Hero Section - Updated background image to a more descriptive placeholder */}
          <section
            id="home"
            className="relative h-screen flex items-center justify-center text-center bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://placehold.co/1920x1080/4A90E2/FFFFFF?text=Compassionate+Home+Care+Clients+and+Caregivers')",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 p-8 rounded-lg bg-white bg-opacity-90 max-w-2xl mx-4 shadow-xl">
              <h2 className="text-5xl font-extrabold text-blue-800 mb-4 leading-tight">
                Compassionate Home Care at the Heart of Birmingham
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                Empowering independence, ensuring dignity, and providing
                tailored support in the comfort of your home.
              </p>
              <a
                href="#contact"
                className={`${accentColor} ${whiteText} font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-green-600 transition-all text-lg`}
              >
                Get Started Today
              </a>
            </div>
          </section>

          {/* About Us Section */}
          <section id="about" className="py-16 bg-gray-100">
            <div className="container mx-auto px-4 text-center max-w-4xl">
              <h2 className="text-4xl font-bold text-blue-800 mb-8">
                About Central Bridge Care
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                Central Bridge Care is a dedicated domiciliary care and living
                support business based in Birmingham, UK. We are committed to
                delivering compassionate, high-quality, and person-centred
                services that enable individuals to maintain their independence,
                dignity, and well-being within the comfort and familiarity of
                their own homes.
              </p>
              <p className="text-lg leading-relaxed">
                Our team is passionate about providing individualized care that
                meets the unique needs, preferences, and aspirations of each
                service user, whether they are elderly or young adults with
                diverse care requirements. We strive to create an inclusive
                environment where everyone is treated with dignity and respect.
              </p>
            </div>
          </section>

          {/* Our Values Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 text-center max-w-5xl">
              <h2 className="text-4xl font-bold text-blue-800 mb-12">
                Our Core Values
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-6 rounded-xl shadow-lg bg-blue-50 hover:shadow-xl transition-shadow duration-300"
                  >
                    <value.icon
                      className={`w-16 h-16 ${primaryColor.replace(
                        "bg-",
                        "text-"
                      )} mb-4 p-3 rounded-full`}
                    />
                    <h3 className="text-2xl font-semibold text-blue-700 mb-3">
                      {value.title}
                    </h3>
                    <p className={`${lightTextColor} text-center text-base`}>
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-16 bg-gray-100">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-4xl font-bold text-blue-800 text-center mb-12">
                Our Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-start cursor-pointer transform hover:scale-105"
                    onClick={() => setSelectedService(service)} // On click, set the selected service
                  >
                    <Briefcase
                      className={`${primaryColor.replace(
                        "bg-",
                        "text-"
                      )} w-10 h-10 mb-4`}
                    />
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">
                      {service.name}
                    </h3>
                    <p className={`${lightTextColor} text-base`}>
                      {service.description}
                    </p>
                    <button className="mt-4 text-blue-600 hover:text-blue-800 font-semibold">
                      Learn More &rarr;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Us Section */}
          <section id="contact" className="py-16 bg-blue-700">
            <div className="container mx-auto px-4 text-center max-w-3xl">
              <h2 className={`text-4xl font-bold ${whiteText} mb-8`}>
                Contact Us
              </h2>
              <p className={`${whiteText} text-lg mb-8`}>
                Ready to discuss your care needs or learn more about our
                services? Get in touch with us today.
              </p>
              <div className="bg-white p-8 rounded-xl shadow-lg text-left">
                {/* AI-Powered Care Recommendation Feature */}
                <div className="mb-8 p-6 bg-blue-50 rounded-lg shadow-inner">
                  <h3 className="text-2xl font-bold text-blue-800 mb-4 text-center">
                    Care Recommendation Assistant ✨
                  </h3>
                  <p className="text-gray-700 mb-4 text-center">
                    Describe your care needs below, and our AI will suggest
                    relevant services from Central Bridge Care.
                  </p>
                  <label
                    htmlFor="careNeeds"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    My Needs:
                  </label>
                  <textarea
                    id="careNeeds"
                    name="careNeeds"
                    rows="4"
                    className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    placeholder="E.g., My mum is elderly, lives alone, sometimes forgets medication, and needs companionship."
                    value={careNeedsInput}
                    onChange={(e) => setCareNeedsInput(e.target.value)}
                  ></textarea>
                  <div className="flex justify-center">
                    <button
                      onClick={handleGetRecommendation}
                      className={`${accentColor} ${whiteText} font-bold py-3 px-6 rounded-full shadow-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-700 flex items-center`}
                      disabled={isLoadingRecommendation}
                    >
                      {isLoadingRecommendation ? (
                        <>
                          <Loader2 className="animate-spin mr-2" />{" "}
                          Generating...
                        </>
                      ) : (
                        "Get Recommendation ✨"
                      )}
                    </button>
                  </div>
                  {recommendationOutput && (
                    <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
                      <p className="text-lg font-semibold text-blue-700 mb-2">
                        Our Recommendation:
                      </p>
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {recommendationOutput}
                      </p>
                    </div>
                  )}
                </div>

                {/* Original Contact Form */}
                <h3 className="text-2xl font-bold text-blue-800 mb-4 text-center">
                  Or Send Us a Message
                </h3>
                <form onSubmit={handleContactSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your Name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Message:
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tell us about your needs..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className={`${accentColor} ${whiteText} font-bold py-3 px-6 rounded-full shadow-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-700`}
                      disabled={isSending}
                    >
                      {isSending ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                  {contactStatus && (
                    <div className="mt-4 text-center text-blue-700 font-semibold">{contactStatus}</div>
                  )}
                </form>
                <div className="mt-8 text-center">
                  <p className={`${lightTextColor} text-lg mb-2`}>
                    Alternatively, call us directly:
                  </p>
                  <p className="text-xl font-semibold text-blue-700">
                    [Your Company Phone Number]
                  </p>
                  <p className="text-xl font-semibold text-blue-700">
                    [Your Company Email Address]
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className={`${primaryColor} py-8`}>
            <div className="container mx-auto px-4 text-center">
              <p className={`${whiteText} text-sm mb-4`}>
                &copy; {new Date().getFullYear()} Central Bridge Care Limited.
                All rights reserved.
              </p>
              <ul className="flex justify-center space-x-6 text-sm">
                <li>
                  <a
                    href="#"
                    className={`hover:text-blue-200 transition-colors ${whiteText}`}
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`hover:text-blue-200 transition-colors ${whiteText}`}
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;
