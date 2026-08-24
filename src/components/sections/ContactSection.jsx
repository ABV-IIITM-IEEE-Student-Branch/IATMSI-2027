import { useState } from 'react';
import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { contactData } from '../../data/contactData';
import { contactLabels } from '../../data/contactData';

export default function ContactSection() {
    const { title, subtitle, queryHeader, email, phoneNumbers, socialLinks, venueSection } = contactData;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <SectionContainer dataSource="contactData" id="contact-section">
            <SectionHeader title={title} subtitle={subtitle} centered={true} />

            {/* Main Light Porcelain / Ivory Container Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm space-y-8">
                
                {/* Contact Info & Social Header Box */}
                <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-6 rounded-2xl border border-[#C59B27]/40 space-y-5">
                    <h3 className="text-lg md:text-xl font-black text-[#4A121A] font-heading uppercase flex items-center gap-3 border-b border-[#C59B27]/30 pb-3">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                        {queryHeader}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm text-neutral-800 font-semibold">
                        <div className="bg-white p-4 rounded-xl border border-[#C59B27]/30 flex items-center gap-3 shadow-2xs">
                            <div className="w-10 h-10 rounded-full bg-[#722332]/10 text-[#722332] flex items-center justify-center font-bold flex-shrink-0">
                                ✉
                            </div>
                            <div>
                                <span className="text-[11px] font-black uppercase text-[#722332] block">
                                    {contactLabels.emailAddress}
                                </span>
                                <a href={`mailto:${email}`} className="text-[#4A121A] font-bold underline hover:text-[#722332] transition-colors">
                                    {email}
                                </a>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-[#C59B27]/30 flex items-center gap-3 shadow-2xs">
                            <div className="w-10 h-10 rounded-full bg-[#722332]/10 text-[#722332] flex items-center justify-center font-bold flex-shrink-0">
                                📞
                            </div>
                            <div>
                                <span className="text-[11px] font-black uppercase text-[#722332] block">
                                    {contactLabels.phoneNumbers}
                                </span>
                                <span className="text-[#4A121A] font-bold">
                                    {phoneNumbers}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Social Media Links Bar */}
                    <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#C59B27]/20">
                        <span className="text-xs font-black uppercase tracking-wider text-[#722332]">
                            {socialLinks.header}
                        </span>

                        <div className="flex items-center gap-3">
                            {/* Email */}
                            <a
                                href={socialLinks.email}
                                className="w-9 h-9 rounded-full bg-[#722332] hover:bg-[#5B1824] text-[#FAF5EB] flex items-center justify-center transition-colors shadow-2xs border border-[#C59B27]/30"
                                title="Email Us"
                            >
                                <svg className="w-4 h-4 !text-[#FAF5EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </a>

                            {/* WhatsApp */}
                            <a
                                href={socialLinks.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center transition-colors shadow-2xs"
                                title="WhatsApp"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.031 0C5.402 0 0 5.385 0 12.014c0 2.119.553 4.187 1.606 6.007L0 24l6.155-1.606A11.968 11.968 0 0012.031 24c6.626 0 12.029-5.386 12.029-12.014C24.06 5.385 18.657 0 12.031 0zm6.985 17.065c-.292.825-1.442 1.516-2.38 1.717-.642.137-1.48.25-4.298-.916-3.606-1.492-5.933-5.161-6.113-5.402-.18-.24-1.463-1.947-1.463-3.712 0-1.765.922-2.632 1.251-2.991.328-.359.714-.449.953-.449.239 0 .478.002.687.012.221.01.518-.084.81.617.3.702 1.022 2.49 1.112 2.673.09.183.15.397.03.636-.12.239-.18.389-.358.599-.18.21-.378.468-.54.628-.18.18-.368.375-.158.735.21.36.932 1.536 2.003 2.49 1.378 1.229 2.539 1.611 2.899 1.79.36.18.57.15.78-.09.21-.24.9-1.048 1.14-1.408.24-.36.48-.3.81-.18.33.12 2.097.989 2.457 1.169.36.18.6.27.69.42.09.15.09.87-.202 1.695z" />
                                </svg>
                            </a>

                            {/* Facebook */}
                            <a
                                href={socialLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white flex items-center justify-center transition-colors shadow-2xs"
                                title="Facebook"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>

                            {/* LinkedIn */}
                            <a
                                href={socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-[#0A66C2] hover:bg-[#0958a8] text-white flex items-center justify-center transition-colors shadow-2xs"
                                title="LinkedIn"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* 2-Column Grid: Form & Map */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Left Column: Form */}
                    <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-6 rounded-2xl border border-[#C59B27]/40 space-y-4">
                        <h4 className="text-base font-black text-[#4A121A] uppercase tracking-wide border-b border-[#C59B27]/30 pb-3 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#722332]" />
                            {contactLabels.sendUsAMessage}
                        </h4>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {submitted && (
                                <div className="bg-emerald-700 text-white p-3 rounded-xl text-xs md:text-sm font-bold shadow-xs">
                                    ✓ Thank you! Your message has been sent successfully.
                                </div>
                            )}

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-[#4A121A] block">{contactLabels.yourName}</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white text-neutral-800 p-3 rounded-xl border border-[#C59B27]/40 focus:border-[#722332] focus:ring-2 focus:ring-[#722332]/20 focus:outline-none text-xs md:text-sm font-medium transition-all shadow-2xs"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-[#4A121A] block">{contactLabels.yourEmail}</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white text-neutral-800 p-3 rounded-xl border border-[#C59B27]/40 focus:border-[#722332] focus:ring-2 focus:ring-[#722332]/20 focus:outline-none text-xs md:text-sm font-medium transition-all shadow-2xs"
                                    placeholder="Enter your email address"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-[#4A121A] block">{contactLabels.subject}</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full bg-white text-neutral-800 p-3 rounded-xl border border-[#C59B27]/40 focus:border-[#722332] focus:ring-2 focus:ring-[#722332]/20 focus:outline-none text-xs md:text-sm font-medium transition-all shadow-2xs"
                                    placeholder="Enter message subject"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-[#4A121A] block">{contactLabels.yourMessageOptional}</label>
                                <textarea
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-white text-neutral-800 p-3 rounded-xl border border-[#C59B27]/40 focus:border-[#722332] focus:ring-2 focus:ring-[#722332]/20 focus:outline-none text-xs md:text-sm font-medium transition-all resize-y shadow-2xs"
                                    placeholder="Type your message here..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] px-6 py-3 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider border border-[#C59B27] shadow-sm transition-all cursor-pointer"
                            >
                                {contactLabels.submitMessage}
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Venue Address & Map */}
                    <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-6 rounded-2xl border border-[#C59B27]/40 space-y-4 flex flex-col justify-between">
                        <div>
                            <h4 className="text-base md:text-lg font-black text-[#4A121A] uppercase tracking-wide border-b border-[#C59B27]/30 pb-3 flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#722332]" />
                                {venueSection.title}
                            </h4>
                            <p className="text-xs md:text-sm font-black text-[#722332] mt-3">
                                {venueSection.addressText}
                            </p>
                        </div>

                        {/* Google Map Frame */}
                        <div className="w-full h-80 md:h-[350px] rounded-xl overflow-hidden border border-[#C59B27]/40 shadow-sm bg-white">
                            <iframe
                                title="Kathmandu Venue Map"
                                src={venueSection.mapEmbedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </SectionContainer>
    );
}
