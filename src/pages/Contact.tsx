import { useState, type ChangeEvent, type FormEvent } from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}) => (
  <label className="flex text-sm flex-col flex-1">
    <p className="text-[#334d49] text-base font-medium leading-normal pb-2">
      {label}
      {required && <span className="text-[#5c8a84]">*</span>}
    </p>
    <input
      className="w-full text-sm h-10 rounded-lg border border-[#d5dddc] bg-[#f0f7f6] p-[15px] text-[#334d49] placeholder:text-[#334d49]/60 focus:outline-none focus:ring-2 focus:ring-[#5c8a84]/50 transition-all"
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  </label>
);

const TextareaField = ({
  label,
  name,
  value,
  onChange,
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder?: string;
}) => (
  <label className="flex text-sm flex-col flex-1">
    <p className="text-[#334d49] text-base font-medium leading-normal pb-2">
      {label}
      {required && <span className="text-[#5c8a84]">*</span>}
    </p>
    <textarea
      className="w-full min-h-32 rounded-lg border border-[#d5dddc] bg-[#f0f7f6] p-[15px] text-sm text-[#334d49] placeholder:text-[#334d49]/60 focus:outline-none focus:ring-2 focus:ring-[#5c8a84]/50 transition-all resize-none"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  </label>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen w-full bg-[#f0f7f6] font-display text-[#334d49] flex flex-col">
      <main className="flex-1 flex justify-center px-6 sm:px-10 md:px-20 lg:px-40 py-10">
        <div className="w-full max-w-[960px] bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Connect with John Doe
            </h1>
            <p className="text-[#334d49]/70 text-base sm:text-lg">
              Professional Solutions for Your Business Needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* ✅ Contact form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <InputField
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject (Optional)"
              />

              <TextareaField
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                required
              />

              <button
                className="w-full sm:w-auto h-12 px-6 rounded-lg bg-[#5c8a84] text-white font-bold hover:bg-[#496e69] transition-colors"
                type="submit"
              >
                Send Message
              </button>
            </form>

            {/* ✅ Contact info section */}
            <div className="flex flex-col gap-8 p-6 bg-[#f0f7f6] rounded-lg">
              <div>
                <h3 className="text-xl font-bold mb-3">Contact Information</h3>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-center gap-3">
                    <MdEmail className="text-[#5c8a84] w-6 h-6" />
                    <a
                      href="mailto:contact@johndoe.com"
                      className="text-[#334d49]/80 hover:text-[#5c8a84] transition-colors"
                    >
                      contact@johndoe.com
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <MdPhone className="text-[#5c8a84] w-6 h-6" />
                    <a
                      href="tel:+1234567890"
                      className="text-[#334d49]/80 hover:text-[#5c8a84] transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <MdLocationOn className="text-[#5c8a84] w-6 h-6" />
                    <p className="text-[#334d49]/80">
                      123 Business Rd, Suite 456, City, State 12345
                    </p>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Connect with Me</h3>
                <div className="flex gap-6">
                  {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="text-[#334d49]/80 hover:text-[#5c8a84] transition-colors"
                    >
                      <Icon className="w-7 h-7" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full border-t border-[#d5dddc] py-6 bg-white">
        <p className="text-center text-[#334d49]/60 text-sm">
          © 2024 John Doe. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ContactPage;
