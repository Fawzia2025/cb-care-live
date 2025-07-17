import React, { useState } from "react";
import { Briefcase, ArrowLeft } from "lucide-react"; // Icons for services and back button

const ServicesView = ({ primaryColor, textColor }) => {
  const [selectedService, setSelectedService] = useState(null); // State for service detail
  const lightTextColor = "text-gray-600"; // Define lightTextColor here as it's used in this component

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

  // Component to display details of a selected service (nested here as it's specific to ServicesView)
  const ServiceDetailPage = ({ service, onBack }) => (
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
            For more detailed information or to discuss a personalized care
            plan, please contact us directly.
          </p>
        </div>
      </div>
    </section>
  );

  return (
    <>
      {selectedService ? (
        <ServiceDetailPage
          service={selectedService}
          onBack={() => setSelectedService(null)}
        />
      ) : (
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
                  onClick={() => setSelectedService(service)}
                >
                  {/* Fixed: Ensure primaryColor is a string before calling replace */}
                  <Briefcase
                    className={`w-10 h-10 mb-4 ${
                      primaryColor && primaryColor.replace("bg-", "text-")
                    }`}
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
      )}
    </>
  );
};

export default ServicesView;
