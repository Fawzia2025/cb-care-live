import React, { useState } from "react";
import { Loader2 } from "lucide-react"; // Icon for loading state

const ContactView = ({ primaryColor, accentColor, textColor }) => {
  const [careNeedsInput, setCareNeedsInput] = useState("");
  const [recommendationOutput, setRecommendationOutput] = useState("");
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(false);
  const lightTextColor = "text-gray-600"; // Define lightTextColor here as it's used in this component

  // Dummy service data (should ideally be passed as props or fetched)
  const services = [
    {
      name: "Personal Care",
      description:
        "Assistance with daily tasks like washing, dressing, and grooming.",
    },
    {
      name: "Respite Care",
      description:
        "Temporary relief for primary caregivers, from a few hours to weeks.",
    },
    {
      name: "Emergency Care",
      description:
        "Rapid response care for unexpected situations or urgent needs.",
    },
    {
      name: "Live-in Care",
      description:
        "Full-time, round-the-clock support in the comfort of your home.",
    },
    {
      name: "Overnight Care",
      description: "Support and reassurance throughout the night.",
    },
    {
      name: "Companionship",
      description:
        "Friendly visits and social engagement to reduce loneliness.",
    },
    {
      name: "Dementia Care",
      description:
        "Specialized support for individuals living with dementia, focusing on dignity.",
    },
    {
      name: "Cancer Support",
      description:
        "Compassionate care tailored to the needs of individuals undergoing cancer treatment.",
    },
    {
      name: "Stroke Recovery Support",
      description:
        "Assistance with rehabilitation and daily living after a stroke.",
    },
    {
      name: "Parkinson's Care",
      description:
        "Specialized support managing symptoms and promoting independence.",
    },
    {
      name: "Disability Care",
      description:
        "Tailored care plans to support individuals with various disabilities.",
    },
    {
      name: "Palliative Care",
      description:
        "Comfort and support for individuals with life-limiting illnesses, and their families.",
    },
  ];

  // Function to get AI recommendation
  const getCareRecommendation = async () => {
    setIsLoadingRecommendation(true);
    setRecommendationOutput(""); // Clear previous output

    const serviceListForLLM = services
      .map((s) => `- ${s.name}: ${s.description}`)
      .join("\n");

    const prompt = `You are a helpful assistant for Central Bridge Care, a domiciliary care provider in Birmingham.
    Based on the user's described needs, recommend one or more of our services. Explain why the recommended service(s) are a good fit.
    If no services are a perfect fit, suggest contacting us for a custom solution.
    
    Our available services are:
    ${serviceListForLLM}
    
    User's needs: "${careNeedsInput}"
    
    Please provide your recommendation in a clear, friendly, and concise manner, directly addressing the user's needs.`;

    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });

    const payload = { contents: chatHistory };
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY; // Use environment variable
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        const text = result.candidates[0].content.parts[0].text;
        setRecommendationOutput(text);
      } else {
        setRecommendationOutput(
          "Sorry, I could not generate a recommendation at this time. Please try again or contact us directly."
        );
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setRecommendationOutput(
        "There was an error getting a recommendation. Please try again later."
      );
    } finally {
      setIsLoadingRecommendation(false);
    }
  };

  return (
    <section id="contact" className={`${primaryColor} py-16`}>
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h2 className={`text-4xl font-bold text-white mb-8`}>Contact Us</h2>
        <p className={`text-white text-lg mb-8`}>
          Ready to discuss your care needs or learn more about our services? Get
          in touch with us today.
        </p>
        <div className="bg-white p-8 rounded-xl shadow-lg text-left">
          {/* AI-Powered Care Recommendation Feature */}
          <div className="mb-8 p-6 bg-blue-50 rounded-lg shadow-inner">
            <h3 className="text-2xl font-bold text-blue-800 mb-4 text-center">
              Care Recommendation Assistant ✨
            </h3>
            <p className="text-gray-700 mb-4 text-center">
              Describe your care needs below, and our AI will suggest relevant
              services from Central Bridge Care.
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
                onClick={getCareRecommendation}
                className={`${accentColor} text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-700 flex items-center`}
                disabled={isLoadingRecommendation}
              >
                {isLoadingRecommendation ? (
                  <>
                    <Loader2 className="animate-spin mr-2" /> Generating...
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
          <form>
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
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className={`${accentColor} text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-700`}
              >
                Send Message
              </button>
            </div>
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
  );
};

export default ContactView;
