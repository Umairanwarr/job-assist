import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import BubbleBackground from './BubbleBackground';

const Contact = () => {
  useEffect(() => {
    emailjs.init('Io5pWKeMShxgPysuD');
  }, []);
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    hiringNeeds: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        'service_o99k98f',
        'template_e6cxz7r',
        {
          from_email: formData.email,
          company: formData.company,
          message: formData.hiringNeeds,
          to_name: "Your Name",  // Add recipient name placeholder
          from_name: formData.company  // Add company as sender name
        },
        'Io5pWKeMShxgPysuD'
      );
      
      setFormData({
        email: '',
        company: '',
        hiringNeeds: ''
      });
      
      setSubmitStatus({
        type: 'success',
        message: 'Your message has been sent successfully!'
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 bg-white relative overflow-hidden"> {/* Add id="contact" here */}
      <BubbleBackground variant="light" bubbleCount={6} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-[#708cfc] rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to find your next great hire?
              </h2>
              <p className="text-[#f8fafccc] text-lg">
                Let us handle the screening process so you can focus on what matters most - building your team with qualified talent.
              </p>
            </div>
            
            {/* Right Form Card */}
            <div className="relative">
              <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 border border-white/30">
                <h3 className="text-xl font-bold text-white mb-6">Contact Us</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/70 focus:ring-2 focus:ring-white/50"
                    required
                  />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your Company"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/70 focus:ring-2 focus:ring-white/50"
                    required
                  />
                  <textarea
                    name="hiringNeeds"
                    value={formData.hiringNeeds}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="What positions are you hiring for?"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/70 focus:ring-2 focus:ring-white/50"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-[#6f8aff] text-white rounded-md font-medium hover:bg-[#5b6dc4] transition-colors"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </button>
                  
                  {/* Status Messages */}
                  {submitStatus && (
                    <div className={`p-4 rounded-md ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {submitStatus.message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;