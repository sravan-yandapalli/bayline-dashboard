'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

const team = [
  {
    name: 'Vijaya Gowthami Sunkaranam',
    role: 'CEO',
    image: '/gowthami-sunkaranam.png',
  },
  {
    name: 'Saran Sunkaranam',
    role: 'Director - Marketing & Sales',
    image: '/saran-sunkaranam.png',
  },
  {
    name: 'Satya Iswarya Vyshnavi Sunkaranam',
    role: 'Executive Director',
    image: '/vyshnavi-sunkaranam.png',
  },
  {
    name: 'Dinesh Venkat Vendra',
    role: 'IoT - Developer',
    image: '/dinesh-vendra.png',
  },
  {
    name: 'Saranya Sunkaranam',
    role: 'UI/UX Designer',
    image: '/saranya-sunkaranam.png',
  },
  {
    name: 'Sravan Yendapalli',
    role: 'Frontend Developer',
    image: '/sravan-yendapalli.png',
  },
];

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0096FF] via-blue-400 to-blue-700 px-4 py-10 text-white">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Welcome to Bayline</h1>
        <p className="text-lg md:text-xl mb-8">
          Powered by Shree Harinarayana Shrimp Technologies Pvt Ltd
        </p>
        <button
          onClick={handleRedirect}
          className="bg-yellow-400 text-black px-6 py-3 text-lg font-semibold rounded-full hover:bg-yellow-300 transition"
        >
          Enter Dashboard
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4 text-center hover:scale-105 transition-transform shadow-lg"
            >
              <div className="w-28 h-38 mx-auto mb-4 rounded-20 overflow-hidden border-4 border-white">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={112}
                  height={112}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl text-black font-bold">{member.name}</h3>
              <p className="text-sm text-black opacity-90">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
