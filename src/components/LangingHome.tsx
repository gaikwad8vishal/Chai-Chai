import { motion } from "framer-motion";

export function LandingPageHome() {
  const teas = [
    { name: "Masala Chai", image: "/images/tea3.jpeg" },
    { name: "Green Tea", image: "/images/img5.avif" },
    { name: "Darjeeling Tea", image: "/images/tea4.webp" }
  ];

  const testimonials = [
    { name: "Mahesh Patil", text: "Best chai I've ever had! Pure magic in a cup." },
    { name: "Saad Shaikh", text: "Absolutely refreshing! The aroma is heavenly." },
    { name: "Kartik  Jagdale", text: "Authentic flavors, crafted with love, brewed for your perfect chai break!" }
  ];

  const brewingSteps = [
    { title: "Boil Water", icon: "/images/1st.jpeg" },
    { title: "Add Tea Leaves", icon: "/images/2nd.jpeg" },
    { title: "Simmer with Milk", icon: "/images/3rd.jpeg" },
    { title: "Enjoy Your Chai", icon: "/images/6th.jpeg" }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-10">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mt-20"
      >
        <h1 className="text-5xl font-bold text-[#4B382A]">☕ Experience the Aroma of Chai</h1>
        <p className="text-lg text-gray-700 mt-3">Authentic flavors crafted for tea lovers</p>
        <a href="/all-product"> 
          <button className="mt-5 button1 ">Order Now</button>
        </a>
      </motion.div>

      {/* Featured Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
        {teas.map((tea, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white/10 backdrop-blur-md p-5 rounded-xl shadow-lg w-full max-w-xs text-center"
          >
            <div className="w-full h-40">
              <img src={tea.image} alt={tea.name} className="w-full h-full object-cover rounded-lg" />
            </div>
            <h2 className="text-xl font-semibold text-[#4B382A] mt-3">{tea.name}</h2>
            <p className="text-gray-600 mt-2">Aromatic & refreshing taste</p>
          </motion.div>
        ))}
      </div>

      {/* Brewing Guide for whoever*/}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-semibold text-[#4B382A]">How to Brew the Perfect Chai?</h2>
        <div className="  grid grid-cols-1  md:grid-cols-4  gap-6 mt-6">
          {brewingSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className="w-full h-full object-cover"
            >
              <img src={step.icon} alt={step.title} className="w-full aspect-[2/3] rounded-lg mb-3 transition-transform duration-300 hover:scale-105 " />
              <h3 className="font-semibold text-[#4B382A]">{step.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-semibold text-[#4B382A]">What Our Customers Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {testimonials.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-5 bg-white backdrop-blur-lg rounded-lg shadow-lg w-full max-w-xs"
            >
              <p className="text-gray-600">"{review.text}"</p>
              <h3 className="mt-2 font-semibold text-[#4B382A]">{review.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subscription Box */}
      <div className="mt-16 text-center bg-white/10 backdrop-blur-md p-10 rounded-lg w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-[#4B382A]">Join Our Chai Club ☕</h2>
        <p className="text-gray-700 mt-3">Get fresh chai delivered to your doorstep every month.</p>
        <a href="/subscription">          
          <button className="button1 mt-5">Subscribe Now</button>
        </a>
      </div>

      {/* Special Offer */}
      <div className="mt-16 text-center bg-white/10 backdrop-blur-md p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-[#4B382A]">Limited-Time Offer! 🎉</h2>
        <p className="text-lg text-[#4B382A] mt-3">Get 20% off on your monthly chai premium!</p>
        <button className="button1 mt-5">Claim Now</button>
      </div>

      {/* Our Story */}
      <div className="mt-16 text-center max-w-3xl">
        <h2 className="text-3xl font-semibold text-[#4B382A]">Our Story 🍃</h2>
        <p className="text-gray-700 mt-3">
          Chai-Chai was born from a love of authentic Indian flavors. We bring you the freshest, hand-picked tea blends that capture the true spirit of chai.
        </p>
      </div>
    </div>
  );
}