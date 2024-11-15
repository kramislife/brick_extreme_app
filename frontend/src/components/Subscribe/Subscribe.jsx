import React from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Truck, Headphones, ShieldCheck } from "lucide-react";
import lightsaber from "../../assets/lightsaber.png";
import { motion, useInView } from "framer-motion";

const Subscribe = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.2,
    margin: "0px 0px -100px 0px"
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const featureVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div ref={ref} className="w-full py-16">
      <div className="max-w-8xl mx-auto px-12">
        <motion.div 
          className="relative rounded-lg p-8 md:p-12 h-[70vh] lg:h-[90vh]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.img
            src={lightsaber}
            alt="Lightsaber"
            className="absolute top-0 inset-0 right-0 bg-cover transform translate-x-8 -translate-y-8 opacity-50 rounded-lg"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={isInView ? { opacity: 0.5, scale: 1 } : { opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          <motion.div 
            className="relative top-36 z-10 text-center"
            variants={containerVariants}
          >
            <motion.h2 
              className="text-4xl text-gray-200 font-bold mb-4"
              variants={itemVariants}
            >
              Subscribe and Save
            </motion.h2>

            <motion.p 
              className="text-gray-300 mb-8 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Unlock exclusive deals and never miss out! Subscribe now and save
              on your next LEGO adventure. Get the latest updates, special
              offers, and more—straight to your inbox!
            </motion.p>

            <motion.div 
              className="relative max-w-md mx-auto"
              variants={itemVariants}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800/60 border-gray-700 text-gray-200 placeholder:text-gray-400 pr-28"
              />
              <Button className="absolute right-0 top-0 h-full bg-red-600 hover:bg-red-700 text-white whitespace-nowrap rounded-l-none">
                Subscribe
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {[
            {
              icon: <Truck className="w-8 h-8 text-white" />,
              title: "FREE AND FAST DELIVERY",
              description: "Free delivery for all orders over $140"
            },
            {
              icon: <Headphones className="w-8 h-8 text-white" />,
              title: "24/7 CUSTOMER SERVICE",
              description: "Friendly 24/7 customer support"
            },
            {
              icon: <ShieldCheck className="w-8 h-8 text-white" />,
              title: "MONEY BACK GUARANTEE",
              description: "We return money within 30 days"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={featureVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div 
                className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {feature.icon}
              </motion.div>
              <motion.h3 
                className="text-gray-200 text-xl font-bold mb-2"
                variants={itemVariants}
              >
                {feature.title}
              </motion.h3>
              <motion.p 
                className="text-gray-400"
                variants={itemVariants}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Subscribe;