import { useState, type ChangeEvent, type FormEvent } from "react";
import Swal from "sweetalert2";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaTelegram,
} from "react-icons/fa";
import { BASE_URL } from "./JounalIntegration";

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
      {required ? <span className="text-[#5c8a84]">*</span> : null}
    </p>
    <input
      className="w-full text-sm h-10 rounded-lg border border-[#d5dddc] bg-[#f0f7f6] p-3.75 text-[#334d49] placeholder:text-[#334d49]/60 focus:outline-none focus:ring-2 focus:ring-[#5c8a84]/50 transition-all"
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
      className="w-full min-h-32 rounded-lg border border-[#d5dddc] bg-[#f0f7f6] p-3.75 text-sm text-[#334d49] placeholder:text-[#334d49]/60 focus:outline-none focus:ring-2 focus:ring-[#5c8a84]/50 transition-all resize-none"
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
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject?.trim() || "Portfolio Contact Message",
      message: formData.message.trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Name, email, and message are required.",
      });
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to send message.");
      }

      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Your message has been sent successfully.",
        timer: 1200,
        showConfirmButton: false,
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: (error as Error).message || "Something went wrong.",
        });
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  };

  return (
    <div
      id="contact"
      className="min-h-screen w-full bg-[#f0f7f6] font-display text-[#334d49] flex flex-col"
    >
      <main className="flex-1 flex justify-center px-6 sm:px-10 md:px-20 lg:px-40 py-10">
        <div className="w-full max-w-240 bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Connect with Eyob Simachew
            </h1>
            <p className="text-[#334d49]/70 text-base sm:text-lg">
              Professional Solutions for Your Business Needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

              <TextareaField
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                required
              />

              <button
                className="w-full sm:w-auto h-12 px-6 rounded-lg bg-[#5c8a84] text-white font-bold hover:bg-[#496e69] transition-colors disabled:opacity-70"
                type="submit"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

            <div className="flex flex-col gap-8 p-6 bg-[#f0f7f6] rounded-lg">
              <div>
                <h3 className="text-xl font-bold mb-3">Contact Information</h3>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-center gap-3">
                    <MdEmail className="text-[#5c8a84] w-6 h-6" />
                    <a
                      href="mailto:eyobsmax@gmail.com"
                      className="text-[#334d49]/80 hover:text-[#5c8a84] transition-colors"
                    >
                      eyobsmax@gmail.com
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <MdPhone className="text-[#5c8a84] w-6 h-6" />
                    <a
                      href="tel:+251980263141"
                      className="text-[#334d49]/80 hover:text-[#5c8a84] transition-colors"
                    >
                      +2519 80 26 31 41
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <MdLocationOn className="text-[#5c8a84] w-6 h-6" />
                    <p className="text-[#334d49]/80">Addis Ababa, Ethiopia</p>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Connect with Me</h3>
                <div className="flex gap-6">
                  {[
                    {
                      href: "https://github.com/Eyob-smax",
                      icon: FaGithub,
                    },
                    {
                      href: "https://t.me/alnova19",
                      icon: FaTelegram,
                    },
                    {
                      href: "https://www.linkedin.com/in/eyob-simachew",
                      icon: FaLinkedinIn,
                    },
                    { href: "https://x.com/eyoba_smax", icon: FaTwitter },
                    {
                      href: "https://www.instagram.com/eyoba_smax",
                      icon: FaInstagram,
                    },
                  ].map(({ href, icon: Icon }, idx) => (
                    <a
                      key={idx}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
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
          © 2024 Eyob Simachew. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ContactPage;
