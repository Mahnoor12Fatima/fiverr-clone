import React from "react";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards, projects } from "../../data";
import {
  BadgeCheck,
  Users,
  Clock3,
  Rocket,
  ShieldCheck,
  GraduationCap,
  FileCheck,
  Search,
  Star,
} from "lucide-react";
import {
  PaintBrushIcon,
  MegaphoneIcon,
  PencilSquareIcon,
  FilmIcon,
  MusicalNoteIcon,
  CodeBracketIcon,
  BriefcaseIcon,
  HeartIcon,
  CircleStackIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";
import { Navigate } from "react-router-dom";

function Home() {
  const benefits = [
  {
    icon: BadgeCheck,
    title: "Pro badge",
    desc: "Stand out with a Pro badge on your profile and services, showcasing your professional expertise.",
  },
  {
    icon: Users,
    title: "Access to premium clients",
    desc: "Connect with businesses and clients looking for high-quality, long-term collaborations.",
  },
  {
    icon: Clock3,
    title: "Get paid by the hour",
    desc: "Offer flexible hourly services and build recurring relationships with clients.",
  },
  {
    icon: Rocket,
    title: "Onboarding support",
    desc: "Receive guidance, resources, and support to maximize your success on the platform.",
  },
  {
    icon: GraduationCap,
    title: "Exclusive community",
    desc: "Join a network of top freelancers, gain insights, and unlock growth opportunities.",
  },
  {
    icon: ShieldCheck,
    title: "Customer protection",
    desc: "Benefit from added security and support while working with professional clients.",
  },
];

const applicationSteps = [
  {
    step: "01",
    title: "Submit your application",
    desc: "Tell us about your professional background, expertise, and portfolio.",
  },
  {
    step: "02",
    title: "Portfolio review",
    desc: "Our team carefully reviews your previous work, experience, and achievements.",
  },
  {
    step: "03",
    title: "Professional evaluation",
    desc: "We assess your communication, reliability, and ability to deliver quality results.",
  },
  {
    step: "04",
    title: "Get approved",
    desc: "Successful applicants receive Pro status and access to exclusive opportunities.",
  },
];

const vetting = [
  {
    icon: Search,
    title: "Professional Experience",
    desc: "We review your industry expertise, career achievements, and proven track record.",
  },
  {
    icon: FileCheck,
    title: "Portfolio Quality",
    desc: "Your portfolio is evaluated to ensure exceptional quality and professionalism.",
  },
  {
    icon: Star,
    title: "Service Excellence",
    desc: "We assess communication skills, reliability, and commitment to client success.",
  },
];
  const categories = [
    {
      icon: PaintBrushIcon,
      text: "Graphics & Design",
    },
    {
      icon: MegaphoneIcon,
      text: "Digital Marketing",
    },
    {
      icon: PencilSquareIcon,
      text: "Writing & Translation",
    },
    {
      icon: FilmIcon,
      text: "Video & Animation",
    },
    {
      icon: MusicalNoteIcon,
      text: "Music & Audio",
    },
    {
      icon: CodeBracketIcon,
      text: "Programming & Tech",
    },
    {
      icon: BriefcaseIcon,
      text: "Business",
    },
    {
      icon: HeartIcon,
      text: "Lifestyle",
    },
    {
      icon: CircleStackIcon,
      text: "Data",
    },
    {
      icon: CameraIcon,
      text: "Photography",
    },
  ];
  const currentUser = JSON.parse(
  localStorage.getItem("currentUser")
);

if (currentUser?.isSeller) {
  return <Navigate to="/seller-dashboard" replace />;
}
  return (
    <div className="w-full">
      {/* Featured */}
      <Featured />

      {/* Trusted */}
      <TrustedBy />

      {/* Categories */}
     <Slide slidesToShow={5}>
  {cards.map((card) => (
    <CatCard key={card.id} card={card} />
  ))}
</Slide>

    {/* BUYER DASHBOARD SECTION */}
<div className="bg-white py-24">
  <div className="max-w-[1400px] mx-auto px-4">

    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Everything you need to manage your projects
      </h2>

      <p className="text-gray-500 max-w-2xl mx-auto">
        Work with talented freelancers, track orders, communicate
        seamlessly, and get quality work delivered on time.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

      {/* Orders */}
      <div className="bg-white rounded-2xl border p-8 hover:shadow-xl transition">
        <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center mb-5">
          📦
        </div>

        <h3 className="text-xl font-semibold mb-3">
          Track Orders
        </h3>

        <p className="text-gray-500">
          Monitor all your active and completed projects in
          one place.
        </p>
      </div>

      {/* Messages */}
      <div className="bg-white rounded-2xl border p-8 hover:shadow-xl transition">
        <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
          💬
        </div>

        <h3 className="text-xl font-semibold mb-3">
          Instant Messaging
        </h3>

        <p className="text-gray-500">
          Chat directly with freelancers and receive updates
          in real time.
        </p>
      </div>

      {/* Payments */}
      <div className="bg-white rounded-2xl border p-8 hover:shadow-xl transition">
        <div className="w-14 h-14 rounded-xl bg-yellow-100 flex items-center justify-center mb-5">
          💳
        </div>

        <h3 className="text-xl font-semibold mb-3">
          Secure Payments
        </h3>

        <p className="text-gray-500">
          Protected payments ensure your money is safe until
          work is approved.
        </p>
      </div>

      {/* Reviews */}
      <div className="bg-white rounded-2xl border p-8 hover:shadow-xl transition">
        <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mb-5">
          ⭐
        </div>

        <h3 className="text-xl font-semibold mb-3">
          Verified Reviews
        </h3>

        <p className="text-gray-500">
          Browse trusted reviews and ratings from real
          customers.
        </p>
      </div>

    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">

      <div className="bg-[#f7fdf9] rounded-2xl p-8 text-center">
        <h3 className="text-4xl font-bold text-green-600">
          10K+
        </h3>
        <p className="text-gray-500 mt-2">
          Active Buyers
        </p>
      </div>

      <div className="bg-[#f7fdf9] rounded-2xl p-8 text-center">
        <h3 className="text-4xl font-bold text-green-600">
          25K+
        </h3>
        <p className="text-gray-500 mt-2">
          Orders Completed
        </p>
      </div>

      <div className="bg-[#f7fdf9] rounded-2xl p-8 text-center">
        <h3 className="text-4xl font-bold text-green-600">
          5K+
        </h3>
        <p className="text-gray-500 mt-2">
          Freelancers
        </p>
      </div>

      <div className="bg-[#f7fdf9] rounded-2xl p-8 text-center">
        <h3 className="text-4xl font-bold text-green-600">
          99%
        </h3>
        <p className="text-gray-500 mt-2">
          Satisfaction Rate
        </p>
      </div>

    </div>

  </div>
  <div className="bg-white">
      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-16">
          <h2 className="text-5xl font-bold text-gray-900">
            Bring on the benefits
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12">
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={index} className="flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mb-6">
                  <Icon size={32} className="text-green-600" />
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Application Process */}
      <section className="bg-[#fafafa] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-gray-900 mb-16">
            The application process
          </h2>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {applicationSteps.map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
              >
                <div className="text-green-600 font-bold text-4xl mb-6">
                  {item.step}
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vetting */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-5xl font-bold text-gray-900 mb-16">
          Here's how we vet freelancers
        </h2>

        <div className="grid lg:grid-cols-3 gap-10">
          {vetting.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="border border-gray-200 rounded-3xl p-10 hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center mb-6">
                  <Icon size={28} />
                </div>

                <h3 className="text-2xl font-semibold mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
</div>

    </div>
  );
}

export default Home;