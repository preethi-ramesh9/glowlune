function Contact() {
    return (
      <div className="p-6">
        <h2 className="text-3xl font-[Playfair_Display] text-center mb-6">Contact Us</h2>
        <div className="max-w-xl mx-auto">
          <div className="mb-8">
            <p className="text-lg text-center mb-4">At Glowlune, we believe in beauty that radiates from within and is rooted in nature.</p>
          </div>
          <form className="space-y-4">
            <input className="w-full p-3 border border-gray-300 rounded-xl" placeholder="Name" />
            <input className="w-full p-3 border border-gray-300 rounded-xl" placeholder="Email" />
            <textarea className="w-full p-3 border border-gray-300 rounded-xl" placeholder="Message" rows={4}></textarea>
            <button className="bg-[#e8dcd0] hover:bg-[#e2cfc1] text-[#4a4a4a] font-semibold py-2 px-6 rounded-2xl shadow-md transition-all">Send Message</button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>123 Glowlune Blvd, Serenity City</p>
            <p>📞 (123) 456-7890</p>
          </div>
        </div>
      </div>
    );
  }

export default Contact;