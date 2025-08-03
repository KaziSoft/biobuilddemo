// app/director/page.tsx
import { FaLinkedin, FaTwitter, FaEnvelope, FaBriefcase } from 'react-icons/fa';
import { IoMdPhonePortrait } from 'react-icons/io';
import { MdLocationOn } from 'react-icons/md';

export default function ManagingDirectorPage() {
    const director = {
        name: "Architect Md. Mamunur Rahman (Munim)",
        title: "Managing Director",
        company: "Biobuild Development Ltd.",
        bio: `Our managing director Architect Md Mamunur Rahman (Munim) plays a pivotal role as an organizer at BIOBUILD Development Ltd, leveraging his vast experience in steering the company towards greater heights. His dynamic approach and unwavering efficiency have been instrumental in shining a spotlight on our projects and operations.

His sharp intelligence and commitment to timely delivery set him apart as the cornerstone of our management team. He consistently brings new dimensions to our strategies and execution, ensuring that we stay ahead in the competitive Real Estate Development Industry.

His leadership at BIOBUILD Development Ltd continues to thrive and innovate, always pushing the boundaries of what is possible in real estate development.`,
        imageUrl: "/img/bod/bod-01.png", // Replace with your image path
        email: "managing-director@biobuild.com",
        phone: "+800 555-0199",
        location: "Dhaka, Bangladesh",
        linkedin: "https://www.linkedin.com/in/alexandrachen",
        twitter: "https://twitter.com/alexchen_md",
        achievements: [
            "Named 'Tech Leader of the Year' 2023",
            "Led company to 300% revenue growth in 5 years",
            "Established industry-leading sustainability program"
        ]
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-[#7AA859] to-[#7AA819] py-20 px-4 sm:px-6 lg:px-8 text-white">
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Leadership</h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                            Visionary leadership driving innovation and excellence in real estate development
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{director.title}</h2>
                        <p className="mt-3 text-xl text-gray-600">Leading {director.company} to new heights</p>
                    </div>

                    {/* Profile Card */}
                    <div className="bg-white shadow-xl rounded-xl overflow-hidden">
                        <div className="md:flex">
                            {/* Image Section */}
                            <div className="md:w-2/5 bg-gradient-to-b from-indigo-100 to-blue-100 flex flex-col items-center p-8">
                                <img
                                    className="w-64 h-64 rounded-full object-cover border-4 border-white shadow-lg"
                                    src={director.imageUrl}
                                    alt={`Portrait of ${director.name}`}
                                />
                                <h2 className="mt-6 text-2xl font-bold text-gray-900">{director.name}</h2>
                                <p className="text-[#7AA859] font-medium">{director.title}</p>
                                <p className="text-gray-600 mt-1">{director.company}</p>
                            </div>

                            {/* Content Section */}
                            <div className="md:w-3/5 p-8 md:p-10">
                                {/* Bio */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Professional Profile</h3>
                                    <p className="mt-4 text-gray-700 leading-relaxed whitespace-pre-line">
                                        {director.bio}
                                    </p>
                                </div>

                                {/* Achievements */}
                                {director.achievements && (
                                    <div className="mt-8">
                                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Key Achievements</h3>
                                        <ul className="mt-4 space-y-2">
                                            {director.achievements.map((achievement, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-indigo-500 mr-2 mt-1">•</span>
                                                    <span className="text-gray-700">{achievement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Contact Information */}
                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                                    <div className="mt-4 space-y-3">
                                        <div className="flex items-center">
                                            <FaEnvelope className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                            <a
                                                href={`mailto:${director.email}`}
                                                className="ml-3 text-gray-700 hover:text-indigo-600 transition-colors"
                                            >
                                                {director.email}
                                            </a>
                                        </div>
                                        <div className="flex items-center">
                                            <IoMdPhonePortrait className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                            <a
                                                href={`tel:${director.phone.replace(/\s+/g, '')}`}
                                                className="ml-3 text-gray-700 hover:text-indigo-600 transition-colors"
                                            >
                                                {director.phone}
                                            </a>
                                        </div>
                                        <div className="flex items-center">
                                            <MdLocationOn className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                            <span className="ml-3 text-gray-700">{director.location}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FaBriefcase className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                            <span className="ml-3 text-gray-700">{director.company}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}