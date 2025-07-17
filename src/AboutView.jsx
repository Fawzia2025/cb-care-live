import React from "react";
import { HeartHandshake, Award, Shield, CheckCircle } from "lucide-react"; // Icons for values

const AboutView = ({ primaryColor, textColor }) => {
  // Ensure primaryColor is destructured here
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
  const lightTextColor = "text-gray-600"; // Define lightTextColor here as it's used in this component

  return (
    <>
      <section id="about" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl font-bold text-blue-800 mb-8">
            About Central Bridge Care
          </h2>
          <p className="text-lg leading-relaxed mb-6">
            Central Bridge Care is a dedicated domiciliary care and living
            support business based in Birmingham, UK. We are committed to
            delivering compassionate, high-quality, and person-centred services
            that enable individuals to maintain their independence, dignity, and
            well-being within the comfort and familiarity of their own homes.
          </p>
          <p className="text-lg leading-relaxed">
            Our team is passionate about providing individualized care that
            meets the unique needs, preferences, and aspirations of each service
            user, whether they are elderly or young adults with diverse care
            requirements. We strive to create an inclusive environment where
            everyone is treated with dignity and respect.
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
                {/* Fixed: Ensure primaryColor is a string before calling replace */}
                <value.icon
                  className={`w-16 h-16 ${
                    primaryColor && primaryColor.replace("bg-", "text-")
                  } mb-4 p-3 rounded-full`}
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
    </>
  );
};

export default AboutView;
