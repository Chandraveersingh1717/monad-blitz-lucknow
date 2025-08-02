

import { useState } from "react";
import { motion } from "framer-motion";
import contactImg from "../assets/contact-img.png";
import backImg from "../assets/back.jpg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Contact = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');

  const onFormUpdate = (category, value) => {
    setFormDetails({ ...formDetails, [category]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");

    try {
      const response = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(formDetails),
      });

      const result = await response.json();
      setFormDetails(formInitialDetails);

      if (result.status === "Message Sent Successfully") {
        toast.success("Message sent successfully!");
        setButtonText("Sent ✔");
      } else throw new Error();
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      setButtonText("Send");
    }
  };

  return (
    <section id="connect" className="relative w-full min-h-screen flex items-center justify-center">
      <ToastContainer />
      {/* Background image */}
      <div className="absolute inset-0 z-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${backImg})` }}></div>

      {/* Contact content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <TrackVisibility>
            {({ isVisible }) =>
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6 }}
                src={contactImg}
                alt="Contact"
                className="w-full rounded-3xl shadow-lg"
              />
            }
          </TrackVisibility>

          <TrackVisibility>
            {({ isVisible }) =>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={isVisible ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8 }}
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl text-white"
              >
                <h2 className="text-3xl font-bold mb-6 text-center">Contact Me</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      value={formDetails.firstName}
                      onChange={(e) => onFormUpdate('firstName', e.target.value)}
                      placeholder="First Name"
                      required
                      className="px-5 py-3 bg-white/10 border border-purple-600 rounded-xl text-white placeholder-white focus:bg-white focus:text-black transition"
                    />
                    <input
                      type="text"
                      value={formDetails.lastName}
                      onChange={(e) => onFormUpdate('lastName', e.target.value)}
                      placeholder="Last Name"
                      required
                      className="px-5 py-3 bg-white/10 border border-purple-600 rounded-xl text-white placeholder-white focus:bg-white focus:text-black transition"
                    />
                    <input
                      type="email"
                      value={formDetails.email}
                      onChange={(e) => onFormUpdate('email', e.target.value)}
                      placeholder="Email Address"
                      required
                      className="px-5 py-3 bg-white/10 border border-purple-600 rounded-xl text-white placeholder-white focus:bg-white focus:text-black transition"
                    />
                    <input
                      type="tel"
                      value={formDetails.phone}
                      onChange={(e) => onFormUpdate('phone', e.target.value)}
                      placeholder="Phone Number"
                      className="px-5 py-3 bg-white/10 border border-purple-600 rounded-xl text-white placeholder-white focus:bg-white focus:text-black transition"
                    />
                  </div>
                  <textarea
                    rows="5"
                    value={formDetails.message}
                    onChange={(e) => onFormUpdate('message', e.target.value)}
                    placeholder="Your Message"
                    required
                    className="w-full px-5 py-4 bg-white/10 border border-purple-600 rounded-xl text-white placeholder-white focus:bg-white focus:text-black transition mb-4"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    id="sendbtn"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full transition"
                  >
                    {buttonText}
                  </motion.button>
                </form>
              </motion.div>
            }
          </TrackVisibility>
        </div>
      </div>
    </section>
  );
};
